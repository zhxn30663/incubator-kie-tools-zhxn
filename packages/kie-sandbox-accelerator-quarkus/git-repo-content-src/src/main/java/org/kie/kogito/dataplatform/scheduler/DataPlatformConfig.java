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

import io.smallrye.config.ConfigMapping;
import io.smallrye.config.WithDefault;
import io.smallrye.config.WithName;

import java.util.Map;
import java.util.Optional;

/**
 * 数据中台集成配置
 *
 * 配置示例（application.properties）:
 * <pre>
 * # 启用数据中台集成
 * data-platform.enabled=true
 *
 * # DMN决策名称
 * data-platform.dmn-decision=TrafficLightDecision
 *
 * # DMN命名空间（可选）
 * data-platform.dmn-namespace=https://kie.org/dmn/_52CEF9FD-9943-4A89-96D5-6F66810CA4C1
 *
 * # 输入参数映射：DMN输入名 -> 数据中台标签名
 * data-platform.input-mappings.weather=T_TODCS.Weather
 * data-platform.input-mappings.timeOfDay=T_TODCS.TimeOfDay
 *
 * # 输出参数映射：DMN输出名 -> 数据中台标签名
 * data-platform.output-mappings.lightColor=T_TODCS.LightColor
 * data-platform.output-mappings.duration=T_TODCS.Duration
 * </pre>
 */
@ConfigMapping(prefix = "data-platform")
public interface DataPlatformConfig {

    /**
     * 是否启用数据中台集成
     */
    @WithName("enabled")
    @WithDefault("false")
    boolean enabled();

    /**
     * DMN决策名称（必需）
     */
    @WithName("dmn-decision")
    Optional<String> dmnDecision();

    /**
     * DMN命名空间（可选，如果有多个同名决策需要指定）
     */
    @WithName("dmn-namespace")
    Optional<String> dmnNamespace();

    /**
     * 输入参数映射：DMN输入参数名 -> 数据中台标签名
     */
    @WithName("input-mappings")
    Map<String, String> inputMappings();

    /**
     * 输出参数映射：DMN输出参数名 -> 数据中台标签名
     */
    @WithName("output-mappings")
    Map<String, String> outputMappings();

    /**
     * 调度间隔（秒），默认1秒
     */
    @WithName("schedule-interval-seconds")
    @WithDefault("1")
    int scheduleIntervalSeconds();
}
