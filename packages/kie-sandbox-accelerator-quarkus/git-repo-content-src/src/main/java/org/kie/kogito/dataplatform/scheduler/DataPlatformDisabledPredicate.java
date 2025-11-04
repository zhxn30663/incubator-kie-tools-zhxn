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
import io.quarkus.scheduler.SkipPredicate;
import jakarta.inject.Inject;

/**
 * 用于控制调度器是否执行的断言
 * 当 data-platform.enabled=false 时，跳过调度执行
 */
public class DataPlatformDisabledPredicate implements SkipPredicate {

    @Inject
    DataPlatformConfig config;

    @Override
    public boolean test(Scheduled.Execution execution) {
        // 返回 true 表示跳过执行
        return !config.enabled();
    }
}
