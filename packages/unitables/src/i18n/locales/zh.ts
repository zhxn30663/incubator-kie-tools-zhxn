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

import { UnitablesI18n } from "../UnitablesI18n";
import { zh as zh_common } from "@kie-tools/i18n-common-dictionary";
import { zh as zh_boxed_expression } from "@kie-tools/boxed-expression-component/dist/i18n/locales/zh";
import { TranslatedDictionary } from "@kie-tools-core/i18n/dist/core";

export const zh: TranslatedDictionary<UnitablesI18n> = {
  ...zh_common,
  ...zh_boxed_expression,
  schema: {
    selectPlaceholder: "选择...",
  },
  recursiveNotSupported: "尚不支持递归结构",
  openRowFormView: (rowIndex: number): string => `在表单视图中打开第 ${rowIndex + 1} 行`,
  noInputNodes: "尚无输入节点...",
  addInputNode: "添加输入节点并在此处查看自定义表格。",
  error: "错误",
  errorMessage: "尝试显示您的输入时发生错误",
  noDecisionResults: "尚无决策结果...",
  addInputDecisionNodes: "添加输入和决策节点，在左侧为输入提供值，然后在此处查看决策结果。",
};
