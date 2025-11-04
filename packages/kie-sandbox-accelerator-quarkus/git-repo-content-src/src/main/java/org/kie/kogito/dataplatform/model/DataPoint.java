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
package org.kie.kogito.dataplatform.model;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * 数据中台数据点模型
 */
public class DataPoint {

    @JsonProperty("Type")
    private Integer type = 10;

    @JsonProperty("Time")
    private String time;

    @JsonProperty("Value")
    private Object value;

    @JsonProperty("Qualitie")
    private Integer qualitie = 0;

    @JsonProperty("TagFullName")
    private String tagFullName;

    public DataPoint() {
    }

    public DataPoint(String tagFullName, Object value, String time) {
        this.tagFullName = tagFullName;
        this.value = value;
        this.time = time;
    }

    // Getters and Setters
    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public Object getValue() {
        return value;
    }

    public void setValue(Object value) {
        this.value = value;
    }

    public Integer getQualitie() {
        return qualitie;
    }

    public void setQualitie(Integer qualitie) {
        this.qualitie = qualitie;
    }

    public String getTagFullName() {
        return tagFullName;
    }

    public void setTagFullName(String tagFullName) {
        this.tagFullName = tagFullName;
    }

    @Override
    public String toString() {
        return "DataPoint{" +
                "type=" + type +
                ", time='" + time + '\'' +
                ", value=" + value +
                ", qualitie=" + qualitie +
                ", tagFullName='" + tagFullName + '\'' +
                '}';
    }
}
