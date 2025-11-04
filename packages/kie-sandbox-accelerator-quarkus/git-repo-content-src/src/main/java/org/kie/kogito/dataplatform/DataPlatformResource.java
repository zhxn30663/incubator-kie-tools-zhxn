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
package org.kie.kogito.dataplatform;

import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import org.kie.kogito.dataplatform.client.DataPlatformService;
import org.kie.kogito.dataplatform.scheduler.DataPlatformConfig;
import org.kie.kogito.dataplatform.scheduler.DmnDataPlatformScheduler;

import java.util.HashMap;
import java.util.Map;

/**
 * 数据中台集成REST API
 *
 * 提供以下功能:
 * - 查询调度器状态和统计信息
 * - 查询当前配置
 * - 手动推送数据到数据中台（用于测试）
 */
@Path("/data-platform")
public class DataPlatformResource {

    @Inject
    DataPlatformConfig config;

    @Inject
    DataPlatformService dataPlatformService;

    @Inject
    DmnDataPlatformScheduler scheduler;

    /**
     * 获取数据中台集成状态
     *
     * GET /data-platform/status
     *
     * @return 状态信息，包括是否启用、执行统计等
     */
    @GET
    @Path("/status")
    @Produces(MediaType.APPLICATION_JSON)
    public Map<String, Object> getStatus() {
        Map<String, Object> status = new HashMap<>();
        status.put("enabled", config.enabled());
        status.put("dmnDecision", config.dmnDecision().orElse("未配置"));
        status.put("scheduleInterval", config.scheduleIntervalSeconds() + "秒");
        status.put("statistics", scheduler.getStatistics());
        return status;
    }

    /**
     * 获取当前配置
     *
     * GET /data-platform/config
     *
     * @return 配置信息
     */
    @GET
    @Path("/config")
    @Produces(MediaType.APPLICATION_JSON)
    public Map<String, Object> getConfig() {
        Map<String, Object> configMap = new HashMap<>();
        configMap.put("enabled", config.enabled());
        configMap.put("dmnDecision", config.dmnDecision().orElse(null));
        configMap.put("dmnNamespace", config.dmnNamespace().orElse(null));
        configMap.put("scheduleIntervalSeconds", config.scheduleIntervalSeconds());
        configMap.put("inputMappings", config.inputMappings());
        configMap.put("outputMappings", config.outputMappings());
        return configMap;
    }

    /**
     * 手动推送单个值到数据中台（用于测试）
     *
     * POST /data-platform/push?tag=T_TODCS.Test&value=123
     *
     * @param tagName 标签名
     * @param value 值
     * @return 结果信息
     */
    @POST
    @Path("/push")
    @Produces(MediaType.APPLICATION_JSON)
    public Map<String, Object> pushValue(
            @QueryParam("tag") String tagName,
            @QueryParam("value") String value) {

        Map<String, Object> result = new HashMap<>();

        if (tagName == null || tagName.isEmpty()) {
            result.put("success", false);
            result.put("message", "标签名不能为空");
            return result;
        }

        try {
            // 尝试解析为数字，如果失败则作为字符串
            Object parsedValue;
            try {
                parsedValue = Double.parseDouble(value);
            } catch (NumberFormatException e) {
                parsedValue = value;
            }

            dataPlatformService.pushSingleValue(tagName, parsedValue);

            result.put("success", true);
            result.put("message", "数据推送成功");
            result.put("tag", tagName);
            result.put("value", parsedValue);
        } catch (Exception e) {
            result.put("success", false);
            result.put("message", "推送失败: " + e.getMessage());
        }

        return result;
    }

    /**
     * 手动触发一次DMN执行（用于测试）
     *
     * POST /data-platform/trigger
     *
     * @return 执行结果
     */
    @POST
    @Path("/trigger")
    @Produces(MediaType.APPLICATION_JSON)
    public Map<String, Object> triggerExecution() {
        Map<String, Object> result = new HashMap<>();

        if (!config.enabled()) {
            result.put("success", false);
            result.put("message", "数据中台集成未启用");
            return result;
        }

        try {
            scheduler.executeDmnDecision();
            result.put("success", true);
            result.put("message", "DMN决策已执行");
            result.put("statistics", scheduler.getStatistics());
        } catch (Exception e) {
            result.put("success", false);
            result.put("message", "执行失败: " + e.getMessage());
        }

        return result;
    }
}
