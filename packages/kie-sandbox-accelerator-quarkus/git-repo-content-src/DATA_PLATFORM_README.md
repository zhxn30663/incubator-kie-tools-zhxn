# 数据中台集成快速开始 (Data Platform Integration Quick Start)

## 简介

此 Quarkus Accelerator 现已支持与数据中台自动集成。只需简单配置，即可实现：
- 自动从数据中台拉取 DMN 输入数据
- 每秒执行 DMN 决策规则
- 自动将决策结果写回数据中台

## 5 分钟快速开始

### 1. 配置文件

编辑 `src/main/resources/application.properties`，添加以下配置：

```properties
# 启用数据中台集成
data-platform.enabled=true

# DMN 决策名称（替换为您的 DMN 文件中的决策名称）
data-platform.dmn-decision=YourDecisionName

# 输入参数映射（根据您的 DMN 修改）
data-platform.input-mappings.input1=T_TODCS.INPUT_TAG_1
data-platform.input-mappings.input2=T_TODCS.INPUT_TAG_2

# 输出参数映射（根据您的 DMN 修改）
data-platform.output-mappings.output1=T_TODCS.OUTPUT_TAG_1
```

参考 `application.properties.example` 查看更多配置示例。

### 2. 启动应用

```bash
mvn quarkus:dev
```

### 3. 验证运行

```bash
# 查看状态
curl http://localhost:8080/data-platform/status

# 查看日志
# 应该看到类似以下内容:
# [DmnDataPlatformScheduler] DMN决策执行成功 (成功: 1, 失败: 0, 总计: 1)
```

## 配置说明

### 必需配置

| 配置项 | 说明 | 示例 |
|--------|------|------|
| `data-platform.enabled` | 启用集成 | `true` |
| `data-platform.dmn-decision` | DMN 决策名称 | `AGCDecision` |
| `data-platform.input-mappings.*` | 输入参数映射 | `data-platform.input-mappings.power=T_TODCS.P1` |
| `data-platform.output-mappings.*` | 输出参数映射 | `data-platform.output-mappings.result=T_TODCS.R1` |

### 可选配置

| 配置项 | 默认值 | 说明 |
|--------|--------|------|
| `data-platform.schedule-interval-seconds` | 1 | 执行间隔（秒） |
| `quarkus.rest-client.data-platform.url` | 已预配置 | 数据中台地址 |

## 如何找到 DMN 决策名称？

在您的 `.dmn` 文件中，查找 `<decision>` 标签的 `name` 属性：

```xml
<decision id="..." name="YourDecisionName">
  ...
</decision>
```

## 如何配置输入输出映射？

### 1. 确定 DMN 参数名称

在 DMN 文件中查看 InputData 和 Decision 的名称：

```xml
<inputData id="..." name="temperature"/>
<decision id="..." name="recommendation">
  <variable name="recommendation" typeRef="string"/>
</decision>
```

### 2. 配置映射

```properties
# 格式: data-platform.input-mappings.{DMN参数名}={数据中台标签}
data-platform.input-mappings.temperature=T_TODCS.Sensor_Temp

# 格式: data-platform.output-mappings.{DMN参数名}={数据中台标签}
data-platform.output-mappings.recommendation=T_TODCS.Recommendation
```

## REST API

### 查看状态
```bash
GET http://localhost:8080/data-platform/status
```

### 手动触发执行
```bash
POST http://localhost:8080/data-platform/trigger
```

### 手动推送数据（测试用）
```bash
POST http://localhost:8080/data-platform/push?tag=T_TODCS.Test&value=123
```

## 常见问题

### Q: 调度器不运行？
A: 检查 `data-platform.enabled=true` 是否已设置，以及所有必需配置是否完整。

### Q: 无法连接数据中台？
A: 检查网络连接和数据中台地址配置。

### Q: DMN 执行失败？
A: 确保 DMN 文件已部署，决策名称正确，输入数据类型匹配。

## 更多信息

详细文档请参阅: [DATA_PLATFORM_INTEGRATION.md](../DATA_PLATFORM_INTEGRATION.md)

## 示例

完整配置示例请参考: [application.properties.example](src/main/resources/application.properties.example)
