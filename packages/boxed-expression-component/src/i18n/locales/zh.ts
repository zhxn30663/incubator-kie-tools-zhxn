/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { BoxedExpressionEditorI18n } from "..";
import { zh_CN as zh_common } from "@kie-tools/i18n-common-dictionary";
import { TranslatedDictionary } from "@kie-tools-core/i18n/dist/core";

export const zh: TranslatedDictionary<BoxedExpressionEditorI18n> = {
  ...zh_common,
  addParameter: "添加参数",
  builtInAggregator: "内置聚合器",
  builtInAggregatorHelp: {
    sum: "输出所有收集值的总和。值必须是数字。",
    count: "输出匹配规则的数量。",
    min: "输出匹配项中的最小值。结果值必须是可比较的，例如数字、日期或文本（字典顺序）。",
    max: "输出匹配项中的最大值。结果值必须是可比较的，例如数字、日期或文本（字典顺序）。",
    none: "将值聚合到任意列表中。",
  },
  choose: "选择...",
  class: "类",
  columnOperations: {
    delete: "删除",
    insertLeft: "向左插入",
    insertRight: "向右插入",
  },
  columns: "列",
  context: "上下文",
  contextEntry: "上下文条目",
  dataType: "数据类型",
  dataTypeDropDown: {
    builtIn: "内置",
    custom: "自定义",
  },
  decisionRule: "决策规则",
  decisionTable: "决策表",
  delete: "删除",
  document: "文档",
  editClause: {
    input: "编辑输入子句",
    output: "编辑输出子句",
  },
  editContextEntry: "编辑上下文条目",
  editExpression: "编辑表达式",
  editHitPolicy: "编辑命中策略",
  editParameter: "编辑参数",
  editParameters: "编辑参数",
  editRelation: "编辑关系",
  enterFunction: "函数名称",
  enterText: "输入文本",
  expression: "表达式",
  function: "函数",
  hitPolicy: "命中策略",
  hitPolicyHelp: {
    unique: "仅允许一个规则匹配。任何重叠都会引发错误。",
    first: "按规则顺序使用第一个匹配项。",
    priority: "允许多个规则匹配，具有不同的输出。选择输出值列表中排在首位的输出。",
    any: "允许多个规则匹配，但它们必须全部具有相同的输出。如果多个匹配规则没有相同的输出，则会引发错误。",
    collect: "根据聚合函数从多个规则聚合输出。",
    ruleOrder: "将多个规则的输出收集到按规则顺序排序的列表中。这与没有任何聚合函数的\"Collect\"非常相似，但在最终列表中具有明确一致的顺序，如表中所定义的。",
    outputOrder: "将多个规则的输出收集到列表中，使用与\"Priority\"命中策略相同的排序机制进行排序。",
  },
  inputClause: "输入子句",
  invocation: "调用",
  insert: "插入",
  insertDirections: {
    above: "上方",
    below: "下方",
    toTheLeft: "左侧",
    toTheRight: "右侧",
  },
  list: "列表",
  literal: "字面量",
  manage: "管理",
  methodSignature: "方法签名",
  model: "模型",
  name: "名称",
  noParametersDefined: "尚未定义参数。",
  outputClause: "输出子句",
  parameters: "参数",
  pmml: {
    firstSelection: "首先选择 PMML 文档",
    secondSelection: "其次选择 PMML 模型",
  },
  relation: "关系",
  rowOperations: {
    reset: "重置",
    delete: "删除",
    duplicate: "复制",
    insertAbove: "向上插入",
    insertBelow: "向下插入",
  },
  rows: "行",
  ruleAnnotation: "规则注释",
  selectExpression: "选择表达式",
  selectFunctionKind: "选择函数类型",
  selectLogicType: "选择逻辑类型",
  contextExpression: {
    variable: "变量",
    expression: "表达式",
  },
  yourAnnotationsHere: "// 您的注释在此处",
  hitPolicyLabel: "命中策略",
  aggregatorFunction: "聚合函数",
  logicTypeHelp: {
    literal: "DMN 中的框式文字表达式是表格单元格中的文字 FEEL 表达式文本，通常具有标记的列和分配的数据类型。",
    context: "DMN 中的框式上下文表达式是一组变量名称和值及其结果值。每个名称-值对都是一个上下文条目。",
    decisionTable: "DMN 中的决策表是以表格格式对一个或多个业务规则的可视化表示。",
    relation: "DMN 中的框式关系表达式是一个传统的数据表，其中包含有关给定实体的信息，以行的形式列出。您可以使用框式关系表来为特定节点的决策中的相关实体定义决策数据。",
    functionDefinition: "DMN 中的框式函数表达式是一个参数化的框式表达式，包含文字 FEEL 表达式、外部 JAVA 或 PMML 函数的嵌套上下文表达式，或任何类型的嵌套框式表达式。",
    invocation: "DMN 中的框式调用表达式是调用业务知识模型的框式表达式。框式调用表达式包含要调用的业务知识模型的名称和参数绑定列表。",
    list: "DMN 中的框式列表表达式表示项目的 FEEL 列表。您可以使用框式列表为决策中特定节点定义相关项目的列表。",
    conditional: '框式条件语句使用三行提供 if 语句的可视化表示。"if"部分中的表达式必须解析为布尔值。',
    for: `框式迭代器提供迭代器语句的可视化表示。对于"for"循环，"for"的右侧部分显示迭代器变量名称。第二行包含表示将被迭代的集合的表达式。"in"行中的表达式必须解析为集合。最后一行包含将处理集合每个元素的表达式。`,
    every: `框式迭代器提供迭代器语句的可视化表示。对于"every"循环，"every"的右侧部分显示迭代器变量名称。第二行包含表示将被迭代的集合的表达式。"in"行中的表达式必须解析为集合。最后一行是将在每个项目上进行评估的表达式。"satisfies"中定义的表达式必须解析为布尔值。`,
    some: `框式迭代器提供迭代器语句的可视化表示。对于"some"循环，"some"的右侧部分显示迭代器变量名称。第二行包含表示将被迭代的集合的表达式。"in"行中的表达式必须解析为集合。最后一行是将在每个项目上进行评估的表达式。"satisfies"中定义的表达式必须解析为布尔值。`,
    filter: "框式过滤器提供集合过滤的可视化表示。顶部是作为要过滤的集合的表达式。底部在方括号之间包含过滤器表达式。",
  },
  pasteOperationNotSuccessful: "粘贴操作未成功",
  functionKindHelp: {
    feel: "将函数定义为\"友好的足够表达语言（FEEL）\"表达式。这是默认设置。",
    pmml: "定义要调用的\"预测模型标记语言（PMML）\"模型。\n编辑器解析并为您提供工作区中的所有 PMML 模型。",
    java: "定义完全限定的 Java 类名和要调用的公共静态方法签名。\n方法签名由方法名称组成，后跟参数类型的参数列表。",
    notSupported: "不支持",
  },
  label: "标签",
  value: "值",
  classNameLabel: "类名",
  methodSignatureLabel: "方法签名",
  getLabelexample: (label: string) => `${label} 示例`,
  parameterNamePlaceholder: "参数名称",
  noneSelected: "-- 未选择 --",
  selectDocument: "首先选择一个文档",
  parameter: "参数",
  functionName: "函数名称",
  child: "子项",
  iterableRowLabel: {
    for: "for",
    some: "some",
    every: "every",
    return: "return",
    in: "in",
    satisfies: "satisfies",
  },
};
