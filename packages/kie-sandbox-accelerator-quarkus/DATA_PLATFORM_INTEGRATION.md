# 数据中台集成指南 (Data Platform Integration Guide)

## 概述 (Overview)

本文档介绍如何使用 DMN Accelerator 与数据中台进行集成。通过配置，您可以让 DMN 决策服务自动从数据中台拉取输入数据，执行决策规则，并将结果写回数据中台。

The DMN Accelerator now supports integration with Data Platform. The system can automatically:
- Fetch input data from Data Platform
- Execute DMN decision rules
- Push output results back to Data Platform

## 功能特性 (Features)

- ✅ **自动调度执行**: 支持定时执行（默认每秒一次）
- ✅ **灵活配置映射**: 通过配置文件映射 DMN 参数和数据中台标签
- ✅ **REST API 监控**: 提供状态查询和手动触发接口
- ✅ **错误处理**: 自动重试和日志记录
- ✅ **统计信息**: 跟踪执行次数、成功/失败统计

## 快速开始 (Quick Start)

### 1. 创建 DMN 决策文件

在 Online Editor 中创建您的 DMN 文件，例如 `TrafficLight.dmn`，定义输入和输出参数。

示例：
- 输入参数: `weather`, `timeOfDay`
- 输出参数: `lightColor`, `duration`

### 2. 应用 Quarkus Accelerator

在 Online Editor 中点击 Accelerator 按钮，选择 Quarkus accelerator 并应用。

### 3. 配置数据中台集成

编辑 `src/main/resources/application.properties`，添加以下配置：

```properties
# 启用数据中台集成
data-platform.enabled=true

# 配置数据中台地址（已预配置，可根据需要修改）
quarkus.rest-client.data-platform.url=http://172.101.1.172:7000/DataAdapter

# 配置 DMN 决策名称（必需）
data-platform.dmn-decision=TrafficLight

# 配置调度间隔（可选，默认1秒）
data-platform.schedule-interval-seconds=1

# 配置输入参数映射
data-platform.input-mappings.weather=T_TODCS.Weather
data-platform.input-mappings.timeOfDay=T_TODCS.TimeOfDay

# 配置输出参数映射
data-platform.output-mappings.lightColor=T_TODCS.LightColor
data-platform.output-mappings.duration=T_TODCS.Duration
```

### 4. 构建并运行

```bash
# 构建项目
mvn clean package

# 运行应用
java -jar target/quarkus-app/quarkus-run.jar

# 或者使用开发模式
mvn quarkus:dev
```

### 5. 验证运行

应用启动后，调度器会自动开始运行。您可以通过以下方式验证：

```bash
# 查看状态
curl http://localhost:8080/data-platform/status

# 查看配置
curl http://localhost:8080/data-platform/config

# 手动触发执行
curl -X POST http://localhost:8080/data-platform/trigger
```

## 配置详解 (Configuration Details)

### 基础配置

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `data-platform.enabled` | boolean | false | 是否启用数据中台集成 |
| `data-platform.dmn-decision` | string | 必需 | DMN 决策名称 |
| `data-platform.dmn-namespace` | string | 可选 | DMN 命名空间（有多个同名决策时需要） |
| `data-platform.schedule-interval-seconds` | int | 1 | 调度间隔（秒） |

### 数据中台服务配置

```properties
# 数据中台服务地址
quarkus.rest-client.data-platform.url=http://172.101.1.172:7000/DataAdapter

# 可选：配置超时时间（毫秒）
quarkus.rest-client.data-platform.connect-timeout=5000
quarkus.rest-client.data-platform.read-timeout=10000
```

### 参数映射配置

**输入参数映射格式**:
```properties
data-platform.input-mappings.{DMN输入参数名}={数据中台标签全名}
```

**输出参数映射格式**:
```properties
data-platform.output-mappings.{DMN输出参数名}={数据中台标签全名}
```

**示例**:
```properties
# 假设 DMN 有输入参数: temperature, pressure, humidity
data-platform.input-mappings.temperature=T_TODCS.P_AGC_MODIFY_1
data-platform.input-mappings.pressure=T_TODCS.P_AGC_MODIFY_2
data-platform.input-mappings.humidity=T_TODCS.P_AGC_MODIFY_3

# 假设 DMN 有输出参数: status, alert
data-platform.output-mappings.status=T_TODCS.STATUS_OUTPUT
data-platform.output-mappings.alert=T_TODCS.ALERT_OUTPUT
```

## REST API 参考 (REST API Reference)

### 1. 获取状态

获取数据中台集成的运行状态和统计信息。

**请求**:
```http
GET /data-platform/status
```

**响应示例**:
```json
{
  "enabled": true,
  "dmnDecision": "TrafficLight",
  "scheduleInterval": "1秒",
  "statistics": {
    "executionCount": 100,
    "successCount": 98,
    "failureCount": 2
  }
}
```

### 2. 获取配置

获取当前的数据中台集成配置。

**请求**:
```http
GET /data-platform/config
```

**响应示例**:
```json
{
  "enabled": true,
  "dmnDecision": "TrafficLight",
  "dmnNamespace": null,
  "scheduleIntervalSeconds": 1,
  "inputMappings": {
    "weather": "T_TODCS.Weather",
    "timeOfDay": "T_TODCS.TimeOfDay"
  },
  "outputMappings": {
    "lightColor": "T_TODCS.LightColor",
    "duration": "T_TODCS.Duration"
  }
}
```

### 3. 手动推送数据

手动推送单个数据点到数据中台（用于测试）。

**请求**:
```http
POST /data-platform/push?tag=T_TODCS.Test&value=123.45
```

**响应示例**:
```json
{
  "success": true,
  "message": "数据推送成功",
  "tag": "T_TODCS.Test",
  "value": 123.45
}
```

### 4. 手动触发执行

手动触发一次 DMN 决策执行（用于测试）。

**请求**:
```http
POST /data-platform/trigger
```

**响应示例**:
```json
{
  "success": true,
  "message": "DMN决策已执行",
  "statistics": {
    "executionCount": 1,
    "successCount": 1,
    "failureCount": 0
  }
}
```

## 工作流程 (Workflow)

```
┌─────────────────────────────────────────────────────────────┐
│                    数据中台 Data Platform                     │
│                  http://172.101.1.172:7000                   │
└────────────┬──────────────────────────────────┬─────────────┘
             │                                  │
             │ ① 拉取输入数据                     │ ④ 推送输出结果
             │    Fetch Inputs                  │    Push Outputs
             │                                  │
┌────────────▼──────────────────────────────────▼─────────────┐
│                  DMN Accelerator Service                     │
│                    (Quarkus Application)                     │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │   DmnDataPlatformScheduler (定时调度器)              │    │
│  │   - 每1秒执行一次                                     │    │
│  │   - 从数据中台拉取输入                                 │    │
│  └───────────┬────────────────────────────────────────┘    │
│              │                                              │
│              │ ② 映射输入参数                                │
│              │    Map Input Parameters                      │
│              ▼                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │   DMN Decision Service                             │    │
│  │   - 执行 DMN 规则                                    │    │
│  │   - 生成决策结果                                     │    │
│  └───────────┬────────────────────────────────────────┘    │
│              │                                              │
│              │ ③ 映射输出参数                                │
│              │    Map Output Parameters                     │
│              ▼                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │   DataPlatformService                              │    │
│  │   - 推送结果到数据中台                                │    │
│  └────────────────────────────────────────────────────┘    │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

## 完整示例 (Complete Example)

### DMN 文件示例

创建一个名为 `AGCDecision.dmn` 的文件，定义以下内容：

**输入参数**:
- `currentLoad` (number): 当前负载
- `frequency` (number): 频率

**输出参数**:
- `adjustment` (number): 调整值

### 配置示例

```properties
# 启用数据中台集成
data-platform.enabled=true

# DMN 决策名称
data-platform.dmn-decision=AGCDecision

# 每秒执行一次
data-platform.schedule-interval-seconds=1

# 输入参数映射
data-platform.input-mappings.currentLoad=T_TODCS.P_AGC_MODIFY_1
data-platform.input-mappings.frequency=T_TODCS.P_AGC_MODIFY_2

# 输出参数映射
data-platform.output-mappings.adjustment=T_TODCS.P_AGC_OUTPUT
```

### 运行和测试

```bash
# 1. 构建项目
mvn clean package

# 2. 运行应用
java -jar target/quarkus-app/quarkus-run.jar

# 3. 查看日志（应该看到类似以下内容）
# [DmnDataPlatformScheduler] 开始执行DMN决策: AGCDecision (执行次数: 1)
# [DataPlatformService] 从数据中台拉取数据，标签: [T_TODCS.P_AGC_MODIFY_1, T_TODCS.P_AGC_MODIFY_2]
# [DataPlatformService] 成功拉取 2 个数据点
# [DmnDataPlatformScheduler] DMN输入参数: {currentLoad=100.5, frequency=50.0}
# [DmnDataPlatformScheduler] DMN输出结果: {adjustment=5.2}
# [DataPlatformService] 向数据中台推送数据: T_TODCS.P_AGC_OUTPUT=5.2
# [DataPlatformService] 成功推送 1 个数据点
# [DmnDataPlatformScheduler] DMN决策执行成功 (成功: 1, 失败: 0, 总计: 1)

# 4. 检查状态
curl http://localhost:8080/data-platform/status
```

## 故障排查 (Troubleshooting)

### 问题1: 调度器未执行

**症状**: 应用启动后没有看到调度器执行的日志。

**解决方案**:
1. 检查 `data-platform.enabled=true` 是否已设置
2. 检查 DMN 决策名称是否正确配置
3. 检查输入输出映射是否配置

### 问题2: 无法连接数据中台

**症状**: 日志显示网络错误或连接超时。

**解决方案**:
1. 检查数据中台地址是否正确
2. 检查网络连接
3. 增加超时时间:
```properties
quarkus.rest-client.data-platform.connect-timeout=10000
quarkus.rest-client.data-platform.read-timeout=30000
```

### 问题3: DMN 决策调用失败

**症状**: 日志显示 DMN API 调用失败。

**解决方案**:
1. 确保 DMN 文件已正确部署
2. 检查决策名称是否与 DMN 文件中的名称匹配
3. 通过 Swagger UI 验证 DMN API: http://localhost:8080/q/swagger-ui

### 问题4: 数据类型不匹配

**症状**: DMN 执行失败，提示参数类型错误。

**解决方案**:
1. 检查 DMN 输入参数类型与数据中台返回的数据类型是否匹配
2. 确保数据中台返回的是数字类型（如果 DMN 期望数字）
3. 查看详细日志了解数据格式

## 日志配置 (Logging Configuration)

如需查看更详细的日志，可以添加以下配置：

```properties
# 启用详细日志
quarkus.log.category."org.kie.kogito.dataplatform".level=DEBUG
quarkus.log.category."org.kie.kogito.dataplatform.scheduler".level=DEBUG
quarkus.log.category."org.kie.kogito.dataplatform.client".level=DEBUG
```

## 性能优化 (Performance Optimization)

### 调整调度间隔

如果不需要每秒执行，可以调整间隔：

```properties
# 每5秒执行一次
data-platform.schedule-interval-seconds=5

# 每30秒执行一次
data-platform.schedule-interval-seconds=30
```

### 异步处理

当前实现是同步的。如需高性能场景，可以考虑：
1. 使用响应式编程 (Mutiny)
2. 批量处理数据点
3. 使用消息队列解耦

## 安全考虑 (Security Considerations)

### 生产环境配置

在生产环境中，建议：

1. 启用 HTTPS:
```properties
quarkus.rest-client.data-platform.url=https://your-data-platform-url
```

2. 配置认证（如果数据中台需要）:
```properties
quarkus.rest-client.data-platform.trust-store=/path/to/truststore
quarkus.rest-client.data-platform.trust-store-password=password
```

3. 限制 REST API 访问:
```properties
quarkus.http.auth.permission.data-platform.paths=/data-platform/*
quarkus.http.auth.permission.data-platform.policy=authenticated
```

## 支持和反馈 (Support and Feedback)

如有问题或建议，请通过以下方式联系：
- 提交 GitHub Issue
- 查阅项目文档
- 联系开发团队

---

**版本**: 1.0.0
**更新日期**: 2025-11-04
**作者**: KIE Tools Team
