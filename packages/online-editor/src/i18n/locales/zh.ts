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

import { OnlineI18n } from "..";
import { zh as zh_common } from "@kie-tools/i18n-common-dictionary";
import { en as en_unitables } from "@kie-tools/unitables/dist/i18n/locales/en";
import { wrapped } from "@kie-tools-core/i18n/dist/core";

export const zh: OnlineI18n = {
  ...zh_common,
  editorPage: {
    textEditorModal: {
      title: (fileName: string) => `正在编辑 ${fileName}`,
    },
    alerts: {
      setContentError: {
        title: "打开文件时出错。您可以将其作为文本编辑，修复后重新打开图表。",
        action: "以文本方式打开",
      },
      copy: "内容已复制到剪贴板",
      updateGist: "Gist 成功更新。",
      createGist: "Gist 成功创建。",
      errorPushingGist: "推送当前 Gist 更新失败。是否强制推送？",
      updateSnippet: "代码片段成功更新。",
      createSnippet: "代码片段成功创建。",
      errorPushingSnippet: "推送当前代码片段更新失败。是否强制推送？",
      forcePushWarning: "警告：这将用本地更改覆盖您的 Gist！",
      invalidCurrentGist: `您当前的 gist ${zh_common.names.url} 无效。如果您已更新其文件名，也需要更新 ${zh_common.names.url}。`,
      invalidGistFilename: "无效的文件名。此 gist 已经有一个同名文件。",
      error: `执行上次操作时出错。请检查您的身份验证令牌是否仍然有效，稍后重试。`,
      unsaved: {
        titleLocal: "自上次下载以来，您有新的更改。",
        titleGit: "自上次推送以来，您有新的更改。",
        proceedAnyway: "仍然继续",
        message: "您的文件暂时保存在浏览器中，但可能在您返回之前被清除。",
      },
    },
    error: {
      title: `${zh_common.terms.oops}！`,
      explanation: `由于错误，${zh_common.names.dmnRunner} 无法渲染。`,
      message: [
        `此 ${zh_common.names.dmn} 包含不支持的构造。请参考 `,
        wrapped("jira"),
        " 并报告问题。别忘了上传当前文件和使用的输入",
      ],
    },
  },
  editorToolbar: {
    closeAndReturnHome: "关闭并返回主页",
    saveAndDownload: "保存并下载",
    sendChangesToGitHub: `发送更改到 ${zh_common.names.github}`,
    copySource: "复制源码",
    downloadSVG: `${zh_common.terms.download} ${zh_common.names.svg}`,
    setGitHubToken: `设置`,
    createGist: "创建 Gist",
    cantCreateGistTooltip: `您无法创建 Gist，因为您未登录，或者您的模型位于嵌套目录中。`,
    cantUpdateGistTooltip: `您无法更新 Gist，因为您未登录、不是所有者，或者您的模型位于嵌套目录中。`,
    createSnippet: "创建代码片段",
    cantCreateSnippetTooltip: `您无法创建代码片段，因为您未登录，或者您的模型位于嵌套目录中。`,
    cantUpdateSnippetTooltip: `您无法更新代码片段，因为您未登录、不是所有者，或者您的模型位于嵌套目录中。`,
    share: "分享",
    embed: "嵌入",
  },
  accelerators: {
    commitMessage: (appName: string, acceleratorName: string) => `${appName}：应用 ${acceleratorName} 加速器`,
    loadingAlert: (acceleratorName: string) => `正在应用 ${acceleratorName} 加速器...`,
    successAlert: (acceleratorName: string) => `成功应用 ${acceleratorName} 加速器`,
    failAlert: (acceleratorName: string) => `应用 ${acceleratorName} 加速器失败`,
    acceleratorDescription:
      "加速器是一个模板。应用它将根据加速器规范移动您当前的文件，并为其创建新的提交。",
    acceleratorDetails: "此加速器托管于",
    dmnFilesMove: "决策文件（.dmn）将移动到：",
    dmnFilesLocation: "决策文件（.dmn）已移动到：",
    pmmlFilesMove: "评分卡（.pmml）将移动到：",
    pmmlFilesLocation: "评分卡（.pmml）已移动到：",
    bpmnFilesMove: "工作流（.bpmn、.bpmn2）将移动到：",
    bpmnFilesLocation: "工作流（.bpmn、.bpmn2）已移动到：",
    otherFilesMove: "其他文件将移动到：",
    otherFilesLocation: "其他文件已移动到：",
    applyAccelerator: "应用加速器",
    appliedAt: "此加速器已应用于：",
    applyDisclaimer:
      "此操作是永久性的。应用加速器后所做的任何更改可能会导致您的文件位于不同的目录中。",
  },
  devDeployments: {
    common: {
      deployYourModel: "部署",
      deployInstanceInfo: "部署实例信息",
      disclaimer:
        "设置所需信息后，您可以在配置的实例上创建开发部署。您提供的所有信息都在本地存储在浏览器中，不会与任何人共享。",
      learnMore: "了解更多",
      requiredField: "此字段不能为空。",
      deploying: "正在部署...",
      deleting: "正在删除...",
      saving: "正在保存...",
      setupFirst: `设置您的 ${zh_common.names.devDeployments} 以便能够部署您的模型`,
    },
    dropdown: {
      noDeployments: "您的部署将显示在这里",
      connectedTo: (username: string) => `已连接到 '${username}'`,
      connectedToAction: "更改...",
      deleteDeployments: "全部删除",
      item: {
        upTooltip: "此部署正在运行。",
        downTooltip: "此部署未运行。",
        inProgressTooltip: "此部署正在进行中，很快就会可用。",
        errorTooltip:
          "在部署过程中发生了意外错误。请查看实例中的日志以获取更多信息。",
        createdAt: (date: string) => `创建于 ${date}`,
      },
    },
    configModal: {
      hostInfo: `与您的实例关联的主机名。`,
      namespaceInfo: `您希望开发部署所在的命名空间（项目）。`,
      tokenInfo: `与您的实例关联的令牌。`,
      insecurelyDisableTlsCertificateValidation: "不安全地禁用 TLS 证书验证",
      insecurelyDisableTlsCertificateValidationInfo:
        "选中此选项将不安全地禁用此帐户的 TLS 证书验证。这是一个替代方案，可以避免在您的集群位于具有自签名证书的 HTTPS 端点后面时处理浏览器的限制。请注意，使用自签名证书是一种较弱的安全形式，因此请考虑联系您的集群管理员使用受信任的证书。有关更多信息，请参阅 <a href='https://cwe.mitre.org/data/definitions/295.html' target='_blank'>https://cwe.mitre.org/data/definitions/295.html</a>。",
      validationError: "您必须填写所有必填字段才能继续。",
      connectionError: "连接被拒绝。请检查提供的信息。",
      missingPermissions:
        "缺少开发部署所需的权限（deployments、services、ingresses）。请检查您的用户权限并重试。",
      namespaceNotFound: (namespace: string) => `在您的集群中找不到命名空间 ${namespace}。`,
      configExpiredWarning: "令牌或帐户已过期。请更新您的配置。",
      useOpenShiftWizard: "通过向导配置新的 Red Hat OpenShift 开发者沙箱",
      useKubernetesWizard: "通过向导配置新的本地 Kubernetes 集群",
    },
    deployConfirmModal: {
      title: "部署",
      body: "此操作可能需要几分钟才能完成，如果您更新了模型，则需要创建新的部署，因为开发部署是不可变的。",
    },
    deleteConfirmModal: {
      title: "删除开发部署",
      body: "您确定要删除开发部署吗？",
    },
    alerts: {
      deployStartedError:
        "创建开发部署时出错。请检查您的配置并重试。",
      deployStartedSuccess: "您的开发部署已成功启动，很快就会可用。",
      deleteError: "删除开发部署失败。请通过 OpenShift 控制台或 CLI 重试。",
      deleteSuccess: "开发部署成功删除。",
    },
    introduction: {
      explanation: `在云端创建开发部署并与他人分享。`,
      disclaimer: `${
        zh_common.names.devDeployments
      } 用于${"开发".bold()}，不应用于业务关键型工作负载。`,
      getStarted: "首先，配置您的实例信息。",
    },
    openShiftConfigWizard: {
      header: {
        provider: "提供商",
      },
      steps: {
        first: {
          name: "创建您的实例",
          introduction: `为了创建您的 ${zh_common.names.shortDevSandbox} 实例：`,
          goToGetStartedPage: "转到入门页面",
          followSteps: `按照步骤启动您的实例。您将被要求使用 ${zh_common.names.redHat} 帐户登录。`,
          informNamespace: `实例启动并运行后，告知您希望在其中创建开发部署的命名空间（项目）。`,
          inputReason:
            "此信息对于在正确的命名空间（项目）中创建您的开发部署是必需的。",
          namespacePlaceholder: `您希望创建开发部署的命名空间（项目）。`,
        },
        second: {
          name: "设置凭据",
          introduction: `在您的 ${zh_common.names.shortDevSandbox} 实例中：`,
          accessLoginCommand: `单击右上角的用户名，然后单击${"'复制登录命令'".bold()}。`,
          accessDisplayToken: `如果需要，使用 ${"'DevSandbox'".bold()} 登录，然后访问 ${"'显示令牌'".bold()} 链接。`,
          copyInformation: `在 ${"'使用此令牌登录'".bold()} 部分，复制您的 ${"'--server'".bold()} 和 ${"'--token'".bold()} 值，并将它们粘贴在下面。`,
          inputReason: "此信息对于与您的实例建立连接是必需的。",
          hostPlaceholder: "在此处粘贴 --server 值",
          tokenPlaceholder: "在此处粘贴 --token 值",
        },
        final: {
          name: "连接",
          connectionSuccess: "连接成功建立。",
          connectionError: "连接被拒绝。",
          introduction: "现在您可以在此 OpenShift 实例上创建开发部署。",
          configNote: "您提供的令牌在本地存储在此浏览器中，不会与任何人共享。",
          connectionErrorLong: `无法与您的 ${zh_common.names.shortDevSandbox} 实例建立连接。`,
          checkInfo: "请检查提供的信息并重试。",
          possibleErrorReasons: {
            introduction: "以下是一些可能的原因：",
            emptyField: "一个或多个必需信息未填写。",
            instanceExpired:
              "实例在 30 天后过期。在此期间之后，您需要重新创建它，从而获得新的主机。",
            tokenExpired: "令牌每天过期。",
          },
        },
      },
    },
    kubernetesConfigWizard: {
      header: {
        provider: "提供商",
      },
      fields: {
        namespace: "命名空间",
        namespaceInfo: "将在其中创建开发部署的集群中的命名空间。",
        kubernetesApiServerUrl: "Kubernetes API 服务器 URL",
        kubernetesApiServerUrlInfo: "与集群中的 Kubernetes API 服务器关联的主机名。",
        tokenInfo: "与您的服务帐户关联的令牌。",
      },
      steps: {
        first: {
          name: "创建您的 Kubernetes 集群",
          introduction:
            "为了创建您的本地 Kubernetes 集群，首先选择您想要的版本并按照以下步骤操作：",
          installFlavor: (flavor: string) => `下载并安装 ${flavor}。`,
          installKubectl: "如果您还没有 Kubectl，请安装它。",
          runCommandsTerminal: "对于此步骤，请在终端中运行命令。",
          createCluster: "创建您的集群：",
          installIngress: "安装 Ingress 控制器并等待它准备就绪：",
          installKieSandboxYaml:
            "为 Kubernetes API 服务器安装代理并创建所需的服务帐户：",
        },
        second: {
          name: "设置连接信息",
          introduction:
            "集群启动并运行后，它应该在下面预填充的主机中可用，并且应该已创建命名空间。",
          disclaimer:
            "仅在您有自定义 Kubernetes 安装时才更改下面的值，但请注意，情况可能不会如预期的那样。",
          hostInputReason: "此信息对于与您的 Kubernetes 集群建立连接是必需的。",
          namespaceInputReason:
            "此信息对于在正确的命名空间中创建您的开发部署是必需的。",
          namespacePlaceholder: "您希望创建开发部署的命名空间。",
          hostPlaceholder: "Kubernetes API 服务器 URL",
        },
        third: {
          name: "身份验证",
          introduction:
            "Kubernetes API 需要所有请求的身份验证令牌。在此步骤中，我们将获取我们之前创建的服务帐户的身份验证令牌。",
          getToken: "在终端中运行以下命令以获取身份验证令牌，然后复制它：",
          tokenPlaceholder: "在此处粘贴令牌值",
          tokenInputReason: "令牌对于对 Kubernetes API 服务器的请求进行身份验证是必需的",
        },
        final: {
          name: "连接",
          connectionSuccess: "连接成功建立。",
          connectionError: "连接被拒绝。",
          introduction: "现在您可以在此 Kubernetes 实例上创建开发部署。",
          configNote: "您提供的令牌在本地存储在此浏览器中，不会与任何人共享。",
          connectionErrorLong: `无法与您的 Kubernetes 集群建立连接。`,
          checkInfo: "请检查提供的信息并重试。",
          possibleErrorReasons: {
            introduction: "以下是一些可能的原因：",
            emptyField: "一个或多个必需信息未填写。",
            clusterNotCreatedCorrectly: "您的 Kubernetes 集群可能未正确创建。",
            tokenExpired: "令牌可能已过期，请尝试创建新的。",
          },
        },
      },
    },
  },
  embedModal: {
    title: "嵌入",
    description:
      "在您的页面中嵌入编辑器和内容。选择下面的选项并将嵌入代码复制到剪贴板：",
    copy: "复制",
    source: {
      current: {
        label: "当前内容",
        description: "嵌入的编辑器将包含当前内容，因此无法从外部更改。",
      },
      gist: {
        alert: `您有新的更改要推送。嵌入为 ${zh_common.names.github} gist 将不会显示您的最新更改。`,
        tooltip: `仅在从 ${zh_common.names.github} gist 编辑文件时可用。`,
        label: `${zh_common.names.github} gist`,
        description:
          "嵌入的编辑器将从打开的 gist 获取内容。对此 gist 所做的更改将反映在编辑器中。",
      },
    },
    embedCode: "嵌入代码",
    copiedToClipboard: "已复制到剪贴板",
  },
  connectToGitModal: {
    github: {
      header: {
        title: `${zh_common.names.github} ${zh_common.names.oauth} ${zh_common.terms.token}`,
        subtitle: `设置您的 ${zh_common.names.github} 令牌，以便您可以与 GitHub 交互。`,
      },
      footer: {
        createNewToken: "生成新令牌",
        placeHolder: "在此处粘贴您的令牌",
      },
      body: {
        learnMore: `了解有关 ${zh_common.names.github} 令牌的更多信息`,
        note: `您应该提供具有 ${"'gist'".bold()} 权限的令牌。`,
      },
      validation: {
        scopes: {
          helper: "您的令牌必须包含 'repo' 和 'gist' 范围。",
        },
      },
      form: {
        username: {
          label: "",
          placeHolder: "",
        },
        token: {
          label: "个人访问令牌（经典）",
          placeHolder: "在此处粘贴您的 GitHub 令牌",
        },
      },
    },
    bitbucket: {
      header: {
        title: `${zh_common.names.bitbucket} ${zh_common.names.oauth} ${zh_common.terms.token}`,
        subtitle: `设置您的 ${zh_common.names.bitbucket} 应用密码，以便您可以与 Bitbucket 交互。`,
      },
      footer: {
        createNewToken: "生成新的应用密码",
        placeHolder: "在此处粘贴您的应用密码",
      },
      body: {
        learnMore: `了解有关 ${zh_common.names.bitbucket} 应用密码的更多信息`,
        note: `您应该提供具有 ${"'snippet'".bold()} 权限的令牌。`,
      },
      validation: {
        scopes: {
          helper: "您的令牌必须包含 'account'、'repository' 和 'snippet' 范围。",
        },
      },
      form: {
        username: {
          label: "Bitbucket 用户名",
          placeHolder: "在此处粘贴您的 Bitbucket 用户名",
        },
        token: {
          label: "Bitbucket 应用密码",
          placeHolder: "在此处粘贴您的 Bitbucket 应用密码",
        },
      },
    },
    gitlab: {
      header: {
        title: `${zh_common.names.gitlab} ${zh_common.names.oauth} ${zh_common.terms.token}`,
        subtitle: `设置您的 ${zh_common.names.gitlab} 令牌，以便您可以与 ${zh_common.names.gitlab} 交互。`,
      },
      footer: {
        createNewToken: "生成新令牌",
        placeHolder: "在此处粘贴您的令牌",
      },
      body: {
        learnMore: `了解有关 ${zh_common.names.gitlab} 令牌的更多信息`,
        note: `您应该提供具有 ${"'api' 'read_user' 'read_repository' 'write_repository'"} 权限的令牌。`,
      },
      validation: {
        scopes: {
          helper: `您的令牌必须包含 ${"'api' 'read_user' 'read_repository' 'write_repository'"} 范围。`,
        },
      },
      form: {
        username: {
          label: "",
          placeHolder: "",
        },
        token: {
          label: "个人访问令牌",
          placeHolder: `在此处粘贴您的 ${zh_common.names.gitlab} 令牌`,
        },
      },
    },
    auth: {
      disclaimer: `您提供的令牌在本地存储在此浏览器中，不会与任何人共享。`,
      error: {
        alreadyLoggedIn: "您已使用此令牌登录。",
        oauthScopes: (requiredScopes: string) =>
          `请确保您的令牌包含必要的 OAuth2 范围：${requiredScopes}`,
      },
    },
    navigation: {
      continue: "继续",
      seeConnectedAccounts: "查看已连接的帐户",
    },
    status: {
      loading: "加载中...",
    },
    insecurelyDisableTlsCertificateValidation: "不安全地禁用 TLS 证书验证",
    insecurelyDisableTlsCertificateValidationInfo:
      "选中此选项将不安全地禁用此帐户的 TLS 证书验证。仅在您信任 Git 提供商且它位于具有自签名证书的 HTTPS 端点后面时才选中此选项。请注意，使用自签名证书是一种较弱的安全形式，因此请考虑联系您的 Git 提供商使用受信任的证书。有关更多信息，请参阅 <a href='https://cwe.mitre.org/data/definitions/295.html' target='_blank'>https://cwe.mitre.org/data/definitions/295.html</a>。",
  },
  commitModal: {
    title: "输入自定义提交消息",
    description: "写一个对工作区所做更改的简短摘要，最好不超过 72 个字符。",
    commit: "提交",
    emptyMessageValidation: "提交消息不能为空",
    placeholder: "提交消息",
  },
  homePage: {
    uploadFile: {
      header: "编辑现有文件",
      body: `在此处上传您的 ${zh_common.names.bpmn}、${zh_common.names.dmn} 或 ${zh_common.names.pmml} 文件以开始进行新的编辑！`,
      helperText: `上传 .${zh_common.names.bpmn}、.${zh_common.names.bpmn}2、.${zh_common.names.dmn} 或 .${zh_common.names.pmml} 文件`,
      helperInvalidText: "不支持此文件扩展名",
      placeholder: "拖动文件或浏览文件。",
    },
    openUrl: {
      validating: `正在验证 ${zh_common.names.url}`,
      invalidGistExtension: "提供的 gist 上的文件类型不受支持。",
      invalidExtension: `提供的 ${zh_common.names.url} 上的文件类型不受支持。`,
      invalidGist: `输入有效的 gist ${zh_common.names.url}。如果您使用特定的 gist ${zh_common.names.url}，请记住其名称不能有空格和大写字母。`,
      invalidUrl: `此 ${zh_common.names.url} 无效（不要忘记"https://"！）。`,
      notFoundUrl: `此 ${zh_common.names.url} 不存在。`,
      corsNotAvailable: `此 ${zh_common.names.url} 无法打开，因为它不允许其他网站访问它。`,
      openFromSource: "从源打开",
      description: `粘贴源代码链接的 ${zh_common.names.url}（${zh_common.names.github}、${zh_common.names.dropbox} 等）`,
    },
    dropdown: {
      onlineForum: "在线论坛",
    },
    bpmnCard: {
      title: `工作流（.${zh_common.names.bpmn}）`,
      explanation: `${zh_common.names.bpmn} 文件用于生成工作流。`,
      createNew: "创建新工作流",
    },
    dmnCard: {
      title: `决策模型（.${zh_common.names.dmn}）`,
      explanation: `${zh_common.names.dmn} 文件用于生成决策模型`,
      createNew: "创建新决策模型",
    },
    pmmlCard: {
      title: `评分卡模型（.${zh_common.names.pmml}）`,
      explanation: `${zh_common.names.pmml} 文件用于生成评分卡`,
      createNew: "创建新评分卡",
    },
    trySample: "尝试示例",
    chooseLocalFile: "选择本地文件",
  },
  alerts: {
    gistError: `无法打开此 Gist。如果您已更新 Gist 文件名，可能需要几秒钟才能使用 URL。`,
    goToHomePage: "转到主页",
    errorDetails: "错误详情：",
    responseError: {
      title: "获取文件时发生错误",
    },
    fetchError: {
      title: "尝试获取文件时发生意外错误",
      possibleCauses: "可能的原因：",
      missingGitHubToken: `如果您尝试打开私有文件，请确保事先设置您的 GitHub 令牌。要执行此操作，请使用其中一个编辑器页面，并在"分享"下拉菜单下打开"设置您的 GitHub 令牌"模态框。`,
      cors: "文件的 URL 必须在其响应中允许 CORS，其中应包含以下标头：",
    },
  },
  dmnRunner: {
    error: {
      title: `${zh_common.terms.oops}！`,
      explanation: `由于错误，${zh_common.names.dmnRunner} 无法渲染。`,
      message: [
        `此 ${zh_common.names.dmn} 包含不支持的构造。请参考 `,
        wrapped("jira"),
        " 并报告问题。别忘了上传当前文件和使用的输入",
      ],
    },
    table: {
      ...en_unitables,
    },
    modal: {
      initial: {
        runDmnModels: "运行您的模型并在编辑时查看实时表单和结果。",
        explanation:
          "输入节点成为自动生成表单上的交互式字段，结果显示为易于阅读的卡片。",
        notificationPanelExplanation: [
          `问题面板 `,
          wrapped("icon"),
          `，位于编辑器右下角，显示实时评估消息以协助对您的决策进行建模。`,
        ],
      },
      wizard: {
        title: `${zh_common.names.extendedServices} ${zh_common.terms.setup}`,
        description: `选择您的 ${zh_common.terms.os.full} 并按照说明安装和启动 ${zh_common.names.extendedServices}。`,
        outdatedAlert: {
          title: `${zh_common.names.extendedServices} 已过时！`,
          message: `看起来您使用的是不兼容版本的 ${zh_common.names.extendedServices}。按照以下说明进行更新。`,
        },
        stoppedAlert: {
          title: `${zh_common.names.extendedServices} 已停止！`,
          message: `看起来 ${zh_common.names.extendedServices} 突然停止了，请按照这些说明重新启动它。`,
        },
        disabled: {
          title: `${zh_common.names.extendedServices}`,
          alert: `您未连接到 ${zh_common.names.extendedServices}。`,
          message: `请注意，如果没有 ${zh_common.names.extendedServices}，某些功能（如 ${zh_common.names.dmnRunner}）将不可用。`,
          helper: `确保 ${zh_common.names.extendedServices} 正在运行，然后查看主机和端口设置。`,
        },
        macos: {
          install: {
            download: ` ${zh_common.names.extendedServices}。`,
            openFile: ["打开 ", wrapped("file"), " 文件。"],
            dragFileToApplicationsFolder: ["将 ", wrapped("file"), " 拖到 ", wrapped("folder"), " 文件夹。"],
          },
          start: {
            stopped: {
              startInstruction: `如果您在系统栏上看到 ${zh_common.names.extendedServices} 图标，只需单击它并选择"${zh_common.terms.start}"。`,
              launchExtendedServices: [
                `如果没有，通过启动 `,
                wrapped("file"),
                " 来启动 ${zh_common.names.extendedServices} 应用。",
              ],
            },
            firstTime: {
              title: `如果您刚刚安装了 ${zh_common.names.extendedServices}：`,
              openApplicationsFolder: ["打开 ", wrapped("folder"), " 文件夹。"],
              again: "再次",
              openAndCancel: [
                "右键单击 ",
                wrapped("file"),
                ` 选择"${zh_common.terms.open}"，然后选择"${zh_common.terms.cancel}"。`,
              ],
              openInstruction: [
                "右键单击 ",
                wrapped("file"),
                " ",
                wrapped("again"),
                ` 然后选择"${zh_common.terms.open}"。`,
              ],
            },
            alreadyRanBefore: `如果您之前已经安装并运行过 ${zh_common.names.extendedServices}：`,
            launchExtendedServices: ["启动 ", wrapped("file")],
            advanced: {
              title: "高级设置",
              runFollowingCommand: `在终端标签中运行以下命令以在不同端口上启动 ${zh_common.names.extendedServices}：`,
            },
          },
        },
        windows: {
          install: {
            keepDownload: ` ${zh_common.names.extendedServices}。请注意，您可能需要右键单击下载并选择"保留"`,
            moveTheFile: ["将 ", wrapped("file"), " 文件移动到您的首选文件夹。"],
          },
          start: {
            stopped: {
              startInstruction: `如果您在系统栏上看到 ${zh_common.names.extendedServices} 图标，只需单击它并选择"${zh_common.terms.start}"。`,
              launchExtendedServices: [
                `如果没有，通过打开 `,
                wrapped("file"),
                " 文件来启动 ${zh_common.names.extendedServices}。",
              ],
            },
            firstTime: {
              title: `如果您刚刚安装了 ${zh_common.names.extendedServices}：`,
              openFolder: ["打开您放置 ", wrapped("file"), " 文件的文件夹。"],
              runAnyway: `双击它并选择"更多信息"，然后单击"仍然运行"按钮。`,
            },
            alreadyRanBefore: `如果您之前已经安装并运行过 ${zh_common.names.extendedServices}：`,
            launchExtendedServices: ["打开 ", wrapped("file"), " 文件。"],
            advanced: {
              title: "高级设置",
              runFollowingCommand: `在命令提示符下运行以下命令以在不同端口上启动 ${zh_common.names.extendedServices}：`,
            },
          },
        },
        linux: {
          install: {
            download: ` ${zh_common.names.extendedServices}。`,
            installAppIndicator: "为您的系统安装 AppIndicator 库：",
            ubuntuDependency: [`${zh_common.names.ubuntu}：`, wrapped("package")],
            fedoraDependency: [`${zh_common.names.fedora}：`, wrapped("package")],
            extractContent: ["将 ", wrapped("file"), " 的内容提取到您选择的位置。"],
            binaryExplanation: [
              `${zh_common.names.extendedServices} 二进制文件 `,
              wrapped("file"),
              " 是一个单一的二进制文件，这意味着您可以将其添加到 PATH 或甚至配置它在计算机启动时执行。",
            ],
          },
          start: {
            openTerminal: "打开终端窗口。",
            goToFolder: ["转到您放置 ", wrapped("file"), " 二进制文件的文件夹。"],
            runCommand: "运行 ",
            advanced: {
              title: "高级设置",
              runFollowingCommand: [
                "打开终端窗口并在您放置 ",
                wrapped("file"),
                " 二进制文件的目录中运行以下命令：",
              ],
            },
          },
        },
        footerWaitingToConnect: `等待连接到 ${zh_common.names.extendedServices}`,
        advancedSettings: {
          title: [
            `默认的 ${zh_common.names.extendedServices} 端口是 `,
            wrapped("port"),
            `。如果您已经在另一个应用程序中使用此端口，则可以更改用于连接 ${zh_common.names.extendedServices} 的端口。`,
          ],
          label: "端口",
          helperTextInvalid: "无效的端口。有效端口：0 <= 端口 <= 65353",
        },
      },
    },
    dropdown: {
      label: `${zh_common.names.extendedServices}`,
      setup: `${zh_common.terms.setup} ${zh_common.names.extendedServices}`,
      open: `${zh_common.terms.open} ${zh_common.names.extendedServices} 面板`,
      close: `${zh_common.terms.close} ${zh_common.names.extendedServices} 面板`,
    },
    button: {
      available: `目前仅在 ${zh_common.names.chrome} 中可用`,
    },
  },
  notificationsPanel: {
    name: "问题面板",
    tooltip: {
      retractAll: "全部折叠",
      expandAll: "全部展开",
    },
  },
  extendedServices: {
    dropdown: {
      shortConnected: (port: string) => `已连接到端口 ${port}`,
      tooltip: {
        connected: `${zh_common.names.extendedServices} 已连接。`,
        install: `设置 ${zh_common.names.extendedServices} 以使用此功能。单击以安装。`,
        outdated: `${zh_common.names.extendedServices} 已过时。单击以更新。`,
        disconnected: `${zh_common.names.extendedServices} 已断开连接。`,
      },
    },
    modal: {
      initial: {
        subHeader: `增强 ${zh_common.names.dmn} 编辑器`,
      },
    },
  },
  createGitRepositoryModal: {
    form: {
      buttonCreate: "创建",
      nameField: {
        label: "名称",
        hint: "无效的名称。只允许字母、数字、破折号（-）、点（.）和下划线（_）。",
      },
      visibility: {
        public: {
          label: "公开",
          description: "互联网上的任何人都可以看到此仓库。您选择谁可以提交。",
        },
        private: {
          label: "私有",
          description: "您选择谁可以查看和提交到此仓库。",
        },
      },
    },
    bitbucket: {
      repository: `${zh_common.names.bitbucket} 仓库`,
      createRepository: `创建 ${zh_common.names.bitbucket} 仓库`,
      description: (workspace: string) =>
        `'${workspace}' 的内容将全部在新的 ${zh_common.names.bitbucket} 仓库中。`,
      error: {
        formAlert: (error: string) => `创建 ${zh_common.names.bitbucket} 仓库时出错。${error}`,
      },
      form: {
        select: {
          label: "选择将在其下创建新仓库的工作区。",
          description: "选择个人或共享工作区。",
        },
      },
    },
    github: {
      repository: `${zh_common.names.github} 仓库`,
      createRepository: `创建 ${zh_common.names.github} 仓库`,
      description: (workspace: string) =>
        `'${workspace}' 的内容将全部在新的 ${zh_common.names.github} 仓库中。`,
      error: {
        formAlert: (error: string) => `创建 ${zh_common.names.github} 仓库时出错。${error}`,
      },
      form: {
        select: {
          label: "新仓库将在以下范围下创建",
          description: "选择您的用户帐户或 GitHub 组织。",
        },
      },
    },
    gitlab: {
      repository: `${zh_common.names.gitlab} 仓库`,
      createRepository: `创建 ${zh_common.names.gitlab} 仓库`,
      description: (workspace: string) =>
        `'${workspace}' 的内容将全部在新的 ${zh_common.names.gitlab} 仓库中。`,
      error: {
        formAlert: (error: string) => `创建 ${zh_common.names.gitlab} 仓库时出错。${error}`,
      },
      form: {
        select: {
          label: "新仓库将在以下范围下创建",
          description: `选择您的用户帐户或 ${zh_common.names.gitlab} 组。`,
        },
      },
    },
  },
  createGistOrSnippetModal: {
    form: {
      buttonCreate: "创建",
      visibility: {
        public: {
          label: "公开",
          description: "互联网上的任何人都可以看到此仓库。您选择谁可以提交。",
        },
        private: {
          label: "私有",
          description: "您选择谁可以查看和提交到此仓库。",
        },
      },
    },
    bitbucket: {
      gistOrSnippet: `${zh_common.names.bitbucket} 代码片段`,
      create: `创建 ${zh_common.names.bitbucket} 代码片段`,
      description: (workspace: string) =>
        `'${workspace}' 的内容将全部在新的 ${zh_common.names.bitbucket} 代码片段中。`,
      error: {
        formAlert: (error: string) => `创建 ${zh_common.names.bitbucket} 代码片段时出错。${error}`,
      },
      form: {
        select: {
          label: "选择将在其下创建新代码片段的工作区。",
          description: "选择个人或共享工作区。",
        },
      },
    },
    github: {
      gistOrSnippet: `${zh_common.names.github} Gist`,
      create: `创建 ${zh_common.names.github} Gist`,
      description: (workspace: string) =>
        `'${workspace}' 的内容将全部在新的 ${zh_common.names.github} Gist 中。`,
      error: {
        formAlert: (error: string) => `创建 ${zh_common.names.github} Gist 时出错。${error}`,
      },
      form: {
        select: {
          label: "Gist 将在以下用户下创建。",
          description: "目前 GitHub 不允许在 GitHub 组织中创建 Gist。",
        },
      },
    },
    gitlab: {
      gistOrSnippet: `${zh_common.names.gitlab} 代码片段`,
      create: `创建 ${zh_common.names.gitlab} 代码片段`,
      description: (workspace: string) =>
        `'${workspace}' 的内容将全部在新的 ${zh_common.names.gitlab} 代码片段中。`,
      error: {
        formAlert: (error: string) => `创建 ${zh_common.names.gitlab} 代码片段时出错。${error}`,
      },
      form: {
        select: {
          label: "选择将在其下创建新代码片段的项目。",
          description: "选择个人或共享项目。",
        },
      },
    },
  },
  loadOrganizationsSelect: {
    bitbucket: {
      user: "Bitbucket 用户",
      organizations: "Bitbucket 工作区",
    },
    github: {
      user: "GitHub 用户",
      organizations: "GitHub 组织",
    },
    gitlab: {
      user: `${zh_common.names.gitlab} 用户`,
      organizations: `${zh_common.names.gitlab} 组`,
    },
  },
  gitStatusIndicatorActions: {
    revert: {
      title: "还原",
      warning: "此操作是永久性的",
      description: "您确定要还原本地更改吗：",
      confirmButtonText: "是的，永久还原",
    },
    revertAll: {
      title: "还原所有更改",
      warning: "此操作是永久性的",
      description: "您确定吗？以下文件将还原到最后一次提交：",
      confirmButtonText: "是的，永久还原",
    },
  },
};
