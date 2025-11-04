/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
package org.kie.kogito.dataplatform.scheduler;

import io.quarkus.scheduler.Scheduled;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.client.Client;
import jakarta.ws.rs.client.ClientBuilder;
import jakarta.ws.rs.client.Entity;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.jboss.logging.Logger;
import org.kie.kogito.dataplatform.client.DataPlatformService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * DMN数据中台调度器
 *
 * 该调度器会定期（默认每秒）执行以下操作：
 * 1. 从数据中台拉取DMN输入数据
 * 2. 调用DMN决策服务
 * 3. 将DMN输出结果写回数据中台
 *
 * 使用说明：
 * 1. 在 application.properties 中配置 data-platform.enabled=true 来启用
 * 2. 配置 DMN 决策名称、输入输出映射等参数
 * 3. 调度器会自动运行
 */
@ApplicationScoped
public class DmnDataPlatformScheduler {

    private static final Logger LOG = Logger.getLogger(DmnDataPlatformScheduler.class);

    @Inject
    DataPlatformConfig config;

    @Inject
    DataPlatformService dataPlatformService;

    private Client httpClient;
    private long executionCount = 0;
    private long successCount = 0;
    private long failureCount = 0;

    /**
     * 定时执行DMN决策并同步数据中台
     *
     * 调度频率由 data-platform.schedule-interval-seconds 配置控制
     */
    @Scheduled(every = "${data-platform.schedule-interval-seconds:1}s", skipExecutionIf = DataPlatformDisabledPredicate.class)
    public void executeDmnDecision() {
        executionCount++;

        try {
            // 验证配置
            if (!validateConfig()) {
                LOG.warn("数据中台配置不完整，跳过执行");
                return;
            }

            String decisionName = config.dmnDecision().get();
            LOG.debugf("开始执行DMN决策: %s (执行次数: %d)", decisionName, executionCount);

            // 1. 从数据中台拉取输入数据
            List<String> inputTags = config.inputMappings().values().stream().collect(Collectors.toList());
            Map<String, Object> inputData = dataPlatformService.fetchData(inputTags);

            if (inputData.isEmpty()) {
                LOG.warnf("未能从数据中台获取到输入数据，标签: %s", inputTags);
                failureCount++;
                return;
            }

            // 2. 将数据中台标签映射到DMN输入参数
            Map<String, Object> dmnInputs = mapInputsToDmn(inputData);
            LOG.debugf("DMN输入参数: %s", dmnInputs);

            // 3. 调用DMN决策
            Map<String, Object> dmnOutputs = invokeDmnDecision(decisionName, dmnInputs);

            if (dmnOutputs == null || dmnOutputs.isEmpty()) {
                LOG.warn("DMN决策未返回输出结果");
                failureCount++;
                return;
            }

            LOG.debugf("DMN输出结果: %s", dmnOutputs);

            // 4. 将DMN输出映射到数据中台标签
            Map<String, Object> outputData = mapOutputsToDataPlatform(dmnOutputs);

            // 5. 推送结果到数据中台
            dataPlatformService.pushData(outputData);

            successCount++;
            LOG.infof("DMN决策执行成功 (成功: %d, 失败: %d, 总计: %d)",
                    successCount, failureCount, executionCount);

        } catch (Exception e) {
            failureCount++;
            LOG.errorf(e, "执行DMN决策失败 (成功: %d, 失败: %d, 总计: %d)",
                    successCount, failureCount, executionCount);
        }
    }

    /**
     * 验证配置是否完整
     */
    private boolean validateConfig() {
        if (!config.enabled()) {
            return false;
        }

        if (config.dmnDecision().isEmpty()) {
            LOG.error("未配置DMN决策名称 (data-platform.dmn-decision)");
            return false;
        }

        if (config.inputMappings().isEmpty()) {
            LOG.error("未配置输入参数映射 (data-platform.input-mappings.*)");
            return false;
        }

        if (config.outputMappings().isEmpty()) {
            LOG.error("未配置输出参数映射 (data-platform.output-mappings.*)");
            return false;
        }

        return true;
    }

    /**
     * 将数据中台数据映射到DMN输入参数
     */
    private Map<String, Object> mapInputsToDmn(Map<String, Object> dataPlatformData) {
        Map<String, Object> dmnInputs = new HashMap<>();

        for (Map.Entry<String, String> mapping : config.inputMappings().entrySet()) {
            String dmnParamName = mapping.getKey();
            String dataplatformTag = mapping.getValue();

            Object value = dataPlatformData.get(dataplatformTag);
            if (value != null) {
                dmnInputs.put(dmnParamName, value);
            } else {
                LOG.warnf("数据中台未返回标签 %s 的值，DMN参数 %s 将为空", dataplatformTag, dmnParamName);
            }
        }

        return dmnInputs;
    }

    /**
     * 将DMN输出映射到数据中台标签
     */
    private Map<String, Object> mapOutputsToDataPlatform(Map<String, Object> dmnOutputs) {
        Map<String, Object> dataPlatformData = new HashMap<>();

        for (Map.Entry<String, String> mapping : config.outputMappings().entrySet()) {
            String dmnParamName = mapping.getKey();
            String dataplatformTag = mapping.getValue();

            Object value = dmnOutputs.get(dmnParamName);
            if (value != null) {
                dataPlatformData.put(dataplatformTag, value);
            } else {
                LOG.warnf("DMN未返回参数 %s 的值，数据中台标签 %s 将不会更新", dmnParamName, dataplatformTag);
            }
        }

        return dataPlatformData;
    }

    /**
     * 调用DMN决策服务
     *
     * Kogito会为每个DMN文件生成REST API endpoint:
     * POST /{decision-name}
     */
    private Map<String, Object> invokeDmnDecision(String decisionName, Map<String, Object> inputs) {
        try {
            if (httpClient == null) {
                httpClient = ClientBuilder.newClient();
            }

            // Kogito生成的DMN REST API endpoint
            String dmnEndpoint = String.format("http://localhost:8080/%s", decisionName);

            LOG.debugf("调用DMN决策API: %s", dmnEndpoint);

            Response response = httpClient
                    .target(dmnEndpoint)
                    .request(MediaType.APPLICATION_JSON)
                    .post(Entity.json(inputs));

            if (response.getStatus() == 200) {
                @SuppressWarnings("unchecked")
                Map<String, Object> result = response.readEntity(Map.class);
                return result;
            } else {
                LOG.errorf("DMN决策API调用失败: HTTP %d, 响应: %s",
                        response.getStatus(), response.readEntity(String.class));
                return null;
            }

        } catch (Exception e) {
            LOG.errorf(e, "调用DMN决策API时发生异常");
            return null;
        }
    }

    /**
     * 获取执行统计信息
     */
    public Map<String, Long> getStatistics() {
        Map<String, Long> stats = new HashMap<>();
        stats.put("executionCount", executionCount);
        stats.put("successCount", successCount);
        stats.put("failureCount", failureCount);
        return stats;
    }
}
