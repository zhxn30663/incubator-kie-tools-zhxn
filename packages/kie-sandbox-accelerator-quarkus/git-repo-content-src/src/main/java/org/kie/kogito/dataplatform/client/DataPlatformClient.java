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
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.core.MediaType;

import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;
import org.kie.kogito.dataplatform.model.PutSnapshotRequest;
import org.kie.kogito.dataplatform.model.SnapshotRequest;
import org.kie.kogito.dataplatform.model.SnapshotResponse;

/**
 * 数据中台REST客户端
 *
 * 配置方法：
 * 在 application.properties 中添加:
 * quarkus.rest-client."org.kie.kogito.dataplatform.client.DataPlatformClient".url=http://172.101.1.172:7000/DataAdapter
 */
@ApplicationScoped
@RegisterRestClient(configKey = "data-platform")
@Path("/DataAdapter")
public interface DataPlatformClient {

    /**
     * 从数据中台获取快照数据
     *
     * @param request 包含需要获取的标签列表
     * @return 快照响应，包含数据点列表
     */
    @POST
    @Path("/Snapshot.GetSnapshots")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    SnapshotResponse getSnapshots(SnapshotRequest request);

    /**
     * 向数据中台推送快照数据
     *
     * @param request 包含需要推送的数据点列表
     */
    @POST
    @Path("/Snapshot.PutSnapshots")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    void putSnapshots(PutSnapshotRequest request);
}
