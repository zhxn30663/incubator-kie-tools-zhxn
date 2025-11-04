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
package org.kie.kogito.dataplatform.client;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.eclipse.microprofile.rest.client.inject.RestClient;
import org.jboss.logging.Logger;
import org.kie.kogito.dataplatform.model.DataPoint;
import org.kie.kogito.dataplatform.model.PutSnapshotRequest;
import org.kie.kogito.dataplatform.model.SnapshotRequest;
import org.kie.kogito.dataplatform.model.SnapshotResponse;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * 数据中台服务封装类
 * 提供便捷的方法来与数据中台交互
 */
@ApplicationScoped
public class DataPlatformService {

    private static final Logger LOG = Logger.getLogger(DataPlatformService.class);
    private static final SimpleDateFormat DATE_FORMAT = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");

    @Inject
    @RestClient
    DataPlatformClient client;

    /**
     * 从数据中台获取指定标签的数据
     *
     * @param tags 标签名称列表
     * @return 标签名到值的映射
     */
    public Map<String, Object> fetchData(List<String> tags) {
        try {
            LOG.infof("从数据中台拉取数据，标签: %s", tags);
            SnapshotRequest request = new SnapshotRequest(tags);
            SnapshotResponse response = client.getSnapshots(request);

            Map<String, Object> result = new HashMap<>();
            if (response != null && response.getDatas() != null) {
                for (DataPoint dp : response.getDatas()) {
                    result.put(dp.getTagFullName(), dp.getValue());
                    LOG.debugf("接收到数据: %s = %s", dp.getTagFullName(), dp.getValue());
                }
            }

            LOG.infof("成功拉取 %d 个数据点", result.size());
            return result;
        } catch (Exception e) {
            LOG.errorf(e, "从数据中台拉取数据失败");
            return new HashMap<>();
        }
    }

    /**
     * 向数据中台推送数据
     *
     * @param data 标签名到值的映射
     */
    public void pushData(Map<String, Object> data) {
        try {
            String currentTime = DATE_FORMAT.format(new Date());

            List<DataPoint> dataPoints = data.entrySet().stream()
                .map(entry -> new DataPoint(entry.getKey(), entry.getValue(), currentTime))
                .collect(Collectors.toList());

            LOG.infof("向数据中台推送数据: %s",
                dataPoints.stream()
                    .map(dp -> dp.getTagFullName() + "=" + dp.getValue())
                    .collect(Collectors.joining(", ")));

            PutSnapshotRequest request = new PutSnapshotRequest(dataPoints);
            client.putSnapshots(request);

            LOG.infof("成功推送 %d 个数据点", dataPoints.size());
        } catch (Exception e) {
            LOG.errorf(e, "向数据中台推送数据失败");
        }
    }

    /**
     * 推送单个数据点
     *
     * @param tagName 标签名
     * @param value 值
     */
    public void pushSingleValue(String tagName, Object value) {
        Map<String, Object> data = new HashMap<>();
        data.put(tagName, value);
        pushData(data);
    }
}
