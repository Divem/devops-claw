const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
        AlignmentType, HeadingLevel, BorderStyle, WidthType, ShadingType,
        LevelFormat, Header, Footer, PageNumber } = require('docx');
const fs = require('fs');

const border = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const borders = { top: border, bottom: border, left: border, right: border };

function cell(text, width, fill) {
  return new TableCell({
    borders,
    width: { size: width, type: WidthType.DXA },
    shading: fill ? { fill, type: ShadingType.CLEAR } : undefined,
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    verticalAlign: "center",
    children: [new Paragraph({ children: [new TextRun({ text, font: "Microsoft YaHei", size: 21 })] })]
  });
}

function h1(text) {
  return new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text, font: "Microsoft YaHei", size: 32, bold: true })] });
}
function h2(text) {
  return new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text, font: "Microsoft YaHei", size: 28, bold: true })] });
}
function h3(text) {
  return new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun({ text, font: "Microsoft YaHei", size: 26, bold: true })] });
}
function p(text, opts = {}) {
  return new Paragraph({
    spacing: { before: opts.before || 120, after: opts.after || 120 },
    children: [new TextRun({ text, font: "Microsoft YaHei", size: 21 })]
  });
}
function bold(text) {
  return new TextRun({ text, font: "Microsoft YaHei", size: 21, bold: true });
}
function bullet(text, numbering) {
  return new Paragraph({
    numbering: { reference: "bullets", level: 0 },
    spacing: { before: 60, after: 60 },
    children: [new TextRun({ text, font: "Microsoft YaHei", size: 21 })]
  });
}

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Microsoft YaHei", size: 21 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 32, bold: true, font: "Microsoft YaHei" },
        paragraph: { spacing: { before: 240, after: 240 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 28, bold: true, font: "Microsoft YaHei" },
        paragraph: { spacing: { before: 180, after: 180 }, outlineLevel: 1 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 26, bold: true, font: "Microsoft YaHei" },
        paragraph: { spacing: { before: 160, after: 160 }, outlineLevel: 2 } },
    ]
  },
  numbering: {
    config: [
      { reference: "bullets",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "numbers",
        levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
    ]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 11906, height: 16838 },
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
      }
    },
    headers: {
      default: new Header({ children: [new Paragraph({ children: [new TextRun({ text: "AI 辅助开发平台 · 管理分析需求文档", font: "Microsoft YaHei", size: 18, color: "666666" })] })] })
    },
    footers: {
      default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "第 ", font: "Microsoft YaHei", size: 18 }), new TextRun({ children: [PageNumber.CURRENT], font: "Microsoft YaHei", size: 18 }), new TextRun({ text: " 页", font: "Microsoft YaHei", size: 18 })] })] })
    },
    children: [
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 480, after: 240 }, children: [new TextRun({ text: "AI 辅助开发平台 · 管理者工作分析需求文档", font: "Microsoft YaHei", size: 44, bold: true })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 480 }, children: [new TextRun({ text: "基于 Token 消耗、使用深度与行为日志的团队效能分析", font: "Microsoft YaHei", size: 24, color: "333333" })] }),

      h1("一、文档信息"),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [2340, 7020],
        rows: [
          new TableRow({ children: [cell("文档名称", 2340, "E8F4FD"), cell("AI 辅助开发平台 · 管理者工作分析需求文档", 7020)] }),
          new TableRow({ children: [cell("版本号", 2340, "E8F4FD"), cell("V1.0", 7020)] }),
          new TableRow({ children: [cell("编写日期", 2340, "E8F4FD"), cell("2025-04-17", 7020)] }),
          new TableRow({ children: [cell("目标读者", 2340, "E8F4FD"), cell("技术管理者、部门负责人、平台产品团队、数据分析师", 7020)] }),
          new TableRow({ children: [cell("文档状态", 2340, "E8F4FD"), cell("正式版", 7020)] }),
        ]
      }),

      h1("二、背景与目标"),
      h2("2.1 背景"),
      p("随着 AI 辅助编程工具（如 OpenClaw、Claude Code、Copilot 等）在企业内部的普及，管理者面临新的管理盲区：无法量化团队的 AI 使用投入产出比，难以识别高价值使用者和需要辅导的成员，也无法将 AI 效能与业务结果关联。因此，亟需建立一套覆盖『用量—行为—效能—协作』四维度的分析体系，支撑管理决策。"),
      h2("2.2 目标"),
      bullet("构建统一的数据看板，让管理者实时掌握团队 AI 使用情况。"),
      bullet("定义可量化的健康度指标，识别低效消耗与深度使用标杆。"),
      bullet("通过习惯分析优化培训策略与资源配置，降低单位产出成本。"),
      bullet("在安全合规前提下，将 AI 数据与研发效能体系打通。"),

      h1("三、指标定义与价值说明"),
      p("本章节对所有分析指标给出明确定义，并分别从『业务价值』（对企业/管理者意义）和『用户价值』（对员工/使用者意义）两个视角阐述其价值。", { before: 240 }),

      h2("3.1 用量维度"),
      h3("指标 1：Token 消耗量"),
      p("定义：统计周期内，个人/项目/部门产生的输入 token、输出 token 及折算费用。"),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [1560, 3900, 3900],
        rows: [
          new TableRow({ children: [cell("维度", 1560, "F2F2F2"), cell("业务价值", 3900, "D5E8F0"), cell("用户价值", 3900, "D5E8F0")] }),
          new TableRow({ children: [cell("说明", 1560, "F2F2F2"), cell("为管理者提供清晰的 AI 成本核算依据，支持按项目/部门做预算配额与成本分摊；识别异常高消耗用户，及时介入优化 Prompt 技巧或调整模型选型。", 3900), cell("员工可了解自身使用成本，培养『成本意识』；在预算透明的前提下，获得公平的资源分配，避免『不敢用』或『滥用』的两极分化。", 3900)] }),
        ]
      }),

      h3("指标 2：调用次数"),
      p("定义：统计周期内发起 AI 请求的总次数，按日/周/月汇总。"),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [1560, 3900, 3900],
        rows: [
          new TableRow({ children: [cell("维度", 1560, "F2F2F2"), cell("业务价值", 3900, "D5E8F0"), cell("用户价值", 3900, "D5E8F0")] }),
          new TableRow({ children: [cell("说明", 1560, "F2F2F2"), cell("反映团队对 AI 工具的依赖度和活跃程度；辅助判断工具推广是否到位，以及是否需要扩容或降配。", 3900), cell("高频调用意味着工具已融入工作流；员工可通过活跃数据获得正向反馈，感受到组织对 AI 辅助的认可和投入。", 3900)] }),
        ]
      }),

      h3("指标 3：会话数量与平均会话长度"),
      p("定义：新建会话数（Threads）以及每个会话的平均交互轮次。"),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [1560, 3900, 3900],
        rows: [
          new TableRow({ children: [cell("维度", 1560, "F2F2F2"), cell("业务价值", 3900, "D5E8F0"), cell("用户价值", 3900, "D5E8F0")] }),
          new TableRow({ children: [cell("说明", 1560, "F2F2F2"), cell("会话数反映任务拆分粒度；平均长度反映问题复杂度与上下文维持能力。过短可能意味着浅层使用，过长可能意味着需求描述不清或 AI 理解偏差。", 3900), cell("合理的会话长度帮助员工养成『任务拆解』和『精准描述』的习惯，提升与 AI 协作的效率，减少重复劳动。", 3900)] }),
        ]
      }),

      h3("指标 4：代码生成量"),
      p("定义：AI 生成、用户接受、后续修改的代码行数（LOC）。"),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [1560, 3900, 3900],
        rows: [
          new TableRow({ children: [cell("维度", 1560, "F2F2F2"), cell("业务价值", 3900, "D5E8F0"), cell("用户价值", 3900, "D5E8F0")] }),
          new TableRow({ children: [cell("说明", 1560, "F2F2F2"), cell("量化 AI 对代码产出的直接贡献；结合后续修改量评估代码质量，为『AI 辅助开发效率』提供核心输入。", 3900), cell("员工可直观看到 AI 帮助自己减少了多少重复编码工作，将精力集中在架构设计和业务逻辑上，提升工作成就感。", 3900)] }),
        ]
      }),

      h2("3.2 行为维度"),
      h3("指标 5：使用时段分布"),
      p("定义：AI 工具在工作时间（如 09:00-18:00）与非工作时间的使用占比。"),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [1560, 3900, 3900],
        rows: [
          new TableRow({ children: [cell("维度", 1560, "F2F2F2"), cell("业务价值", 3900, "D5E8F0"), cell("用户价值", 3900, "D5E8F0")] }),
          new TableRow({ children: [cell("说明", 1560, "F2F2F2"), cell("判断 AI 是否真正嵌入日常工作流，还是仅作为偶尔尝鲜的工具；非工作时间使用过高可能提示工作负荷过重或工具学习曲线陡峭。", 3900), cell("帮助员工自我管理工作节奏，避免过度加班；同时证明其在工作时间内的投入被客观记录，减少『摸鱼』误解。", 3900)] }),
        ]
      }),

      h3("指标 6：功能使用偏好"),
      p("定义：用户在代码补全、代码审查、Bug 修复、文档生成、问答咨询等场景上的使用分布。"),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [1560, 3900, 3900],
        rows: [
          new TableRow({ children: [cell("维度", 1560, "F2F2F2"), cell("业务价值", 3900, "D5E8F0"), cell("用户价值", 3900, "D5E8F0")] }),
          new TableRow({ children: [cell("说明", 1560, "F2F2F2"), cell("识别团队能力短板：如果大量用于基础问答而少用于代码审查，说明团队尚未将 AI 用于高价值环节；可针对性组织培训。", 3900), cell("让员工发现自身使用盲区，获得个性化学习建议；例如，引导多使用代码审查功能，可提升自己的代码质量意识。", 3900)] }),
        ]
      }),

      h3("指标 7：工具链结合度"),
      p("定义：AI 交互后，用户是否继续执行测试、Lint、Git 提交、部署等配套操作的占比。"),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [1560, 3900, 3900],
        rows: [
          new TableRow({ children: [cell("维度", 1560, "F2F2F2"), cell("业务价值", 3900, "D5E8F0"), cell("用户价值", 3900, "D5E8F0")] }),
          new TableRow({ children: [cell("说明", 1560, "F2F2F2"), cell("衡量 AI 使用是否形成『端到端』闭环，而非停留在生成阶段；结合度高意味着团队工程化意识强，产出更可靠。", 3900), cell("帮助员工养成『生成即验证』的好习惯，减少后期返工；通过数据反馈强化工程规范的内驱力。", 3900)] }),
        ]
      }),

      h3("指标 8：交互深度"),
      p("定义：单轮即走的比例、多轮追问比例、是否使用 / 命令和自定义 Skills。"),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [1560, 3900, 3900],
        rows: [
          new TableRow({ children: [cell("维度", 1560, "F2F2F2"), cell("业务价值", 3900, "D5E8F0"), cell("用户价值", 3900, "D5E8F0")] }),
          new TableRow({ children: [cell("说明", 1560, "F2F2F2"), cell("区分『浅尝辄止』与『深度驾驭』用户；高深度用户通常是团队的标杆，其方法论可复制推广，提升整体人效。", 3900), cell("深度使用带来更高的问题解决率和更少的人工返工；员工掌握高级技巧后，工作自信心和职业竞争力同步提升。", 3900)] }),
        ]
      }),

      h2("3.3 效能维度"),
      h3("指标 9：代码采纳率"),
      p("定义：AI 生成代码被用户直接接受或仅做微调后保留到代码库的比例。"),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [1560, 3900, 3900],
        rows: [
          new TableRow({ children: [cell("维度", 1560, "F2F2F2"), cell("业务价值", 3900, "D5E8F0"), cell("用户价值", 3900, "D5E8F0")] }),
          new TableRow({ children: [cell("说明", 1560, "F2F2F2"), cell("最直接的『投入产出比』指标；采纳率低意味着大量 Token 和时间的浪费，需排查 Prompt 质量、模型选型或任务匹配度。", 3900), cell("高采纳率减少无效加班和重复修改；员工可将节省的时间投入到更有创造性的工作中，提升工作满意度。", 3900)] }),
        ]
      }),

      h3("指标 10：迭代效率"),
      p("定义：从需求描述到获得可运行代码所需的平均会话轮次或时间。"),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [1560, 3900, 3900],
        rows: [
          new TableRow({ children: [cell("维度", 1560, "F2F2F2"), cell("业务价值", 3900, "D5E8F0"), cell("用户价值", 3900, "D5E8F0")] }),
          new TableRow({ children: [cell("说明", 1560, "F2F2F2"), cell("反映团队『AI 沟通能力』和任务拆解水平；迭代效率高的团队能更快交付需求，缩短项目周期。", 3900), cell("帮助员工建立『精准表达』的工作习惯，减少与 AI 的无效拉扯；长期提升其结构化思维和沟通能力。", 3900)] }),
        ]
      }),

      h3("指标 11：问题解决率"),
      p("定义：首次会话即解决问题的比例（无需重新开启新会话或寻求人工帮助）。"),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [1560, 3900, 3900],
        rows: [
          new TableRow({ children: [cell("维度", 1560, "F2F2F2"), cell("业务价值", 3900, "D5E8F0"), cell("用户价值", 3900, "D5E8F0")] }),
          new TableRow({ children: [cell("说明", 1560, "F2F2F2"), cell("衡量 AI 工具对团队日常问题拦截的能力；高解决率意味着更少的中断和上下文切换，降低高级工程师被基础问题打扰的频率。", 3900), cell("员工能快速获得答案，减少等待和焦虑；尤其对 junior 员工，提升自主解决问题的能力和学习速度。", 3900)] }),
        ]
      }),

      h3("指标 12：返工率"),
      p("定义：AI 生成代码在后续 7 天内被大量修改或删除的比例。"),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [1560, 3900, 3900],
        rows: [
          new TableRow({ children: [cell("维度", 1560, "F2F2F2"), cell("业务价值", 3900, "D5E8F0"), cell("用户价值", 3900, "D5E8F0")] }),
          new TableRow({ children: [cell("说明", 1560, "F2F2F2"), cell("暴露 AI 生成代码的质量风险；返工率高可能意味着员工过度依赖 AI 而未做充分审查，或 AI 对业务上下文理解不足。", 3900), cell("提醒员工在采纳 AI 建议时保持审慎，培养『生成即 Review』的职业习惯，长期提升代码 Ownership 意识。", 3900)] }),
        ]
      }),

      h2("3.4 协作维度"),
      h3("指标 13：知识共享度"),
      p("定义：使用公共 Prompt、分享有效会话、复用他人 Skills 的频率。"),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [1560, 3900, 3900],
        rows: [
          new TableRow({ children: [cell("维度", 1560, "F2F2F2"), cell("业务价值", 3900, "D5E8F0"), cell("用户价值", 3900, "D5E8F0")] }),
          new TableRow({ children: [cell("说明", 1560, "F2F2F2"), cell("避免团队内重复造轮子；共享度高的团队能形成集体智慧沉淀，降低新成员上手成本。", 3900), cell("员工可快速复用经过验证的 Prompt 和最佳实践，减少摸索时间；分享者获得认可，增强团队归属感。", 3900)] }),
        ]
      }),

      h3("指标 14：规范遵循度"),
      p("定义：按团队要求使用指定 Skills、命名规范、安全审查流程的合规比例。"),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [1560, 3900, 3900],
        rows: [
          new TableRow({ children: [cell("维度", 1560, "F2F2F2"), cell("业务价值", 3900, "D5E8F0"), cell("用户价值", 3900, "D5E8F0")] }),
          new TableRow({ children: [cell("说明", 1560, "F2F2F2"), cell("保证 AI 产出与组织标准一致，降低技术债务和安全风险；为绩效考核和晋升提供客观依据。", 3900), cell("明确的规范让员工知道『如何正确使用』，减少因误用导致的批评；遵循规范的行为被记录，有利于绩效自证。", 3900)] }),
        ]
      }),

      h3("指标 15：安全合规评分"),
      p("定义：敏感信息上传次数、违规操作触发数、安全审计告警数。"),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [1560, 3900, 3900],
        rows: [
          new TableRow({ children: [cell("维度", 1560, "F2F2F2"), cell("业务价值", 3900, "D5E8F0"), cell("用户价值", 3900, "D5E8F0")] }),
          new TableRow({ children: [cell("说明", 1560, "F2F2F2"), cell("守住企业数据安全底线；通过量化评分将安全责任落实到个人和团队，避免『意识松懈』导致的数据泄露。", 3900), cell("实时反馈帮助员工建立安全意识，减少无意的违规操作；良好的合规记录保护个人职业声誉。", 3900)] }),
        ]
      }),

      h1("四、数据采集方案"),
      h2("4.1 数据来源"),
      bullet("客户端日志：IDE 插件或本地客户端的操作日志（会话开始/结束、功能调用、代码接受/拒绝）。"),
      bullet("服务端日志：API Gateway 或模型服务侧的调用日志（Token 数、响应时间、模型版本、用户 ID）。"),
      bullet("代码仓库：Git 提交记录与代码 Diff，用于计算采纳率和返工率。"),
      bullet("CI/CD 流水线：构建、测试、Lint 结果，用于评估工具链结合度。"),
      h2("4.2 采集原则"),
      bullet("最小必要：仅采集与分析目标直接相关的字段，避免记录原始代码内容或业务敏感信息。"),
      bullet("匿名化处理：分析看板默认展示脱敏后的聚合数据，个人明细仅限直属管理者查看。"),
      bullet("实时与离线结合：用量类指标实时计算，效能类指标基于 Git 数据 T+1 更新。"),

      h1("五、功能模块设计"),
      h2("5.1 管理看板"),
      p("面向技术管理者和部门负责人，提供宏观视图。"),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [2340, 7020],
        rows: [
          new TableRow({ children: [cell("看板页", 2340, "E8F4FD"), cell("核心内容", 7020)] }),
          new TableRow({ children: [cell("总览页", 2340, "F2F2F2"), cell("团队 Token 消耗趋势、活跃度、采纳率、AI 效能指数走势。", 7020)] }),
          new TableRow({ children: [cell("个人页", 2340, "F2F2F2"), cell("成员使用排名、深度评分、成长曲线、待辅导建议。", 7020)] }),
          new TableRow({ children: [cell("项目页", 2340, "F2F2F2"), cell("各项目 AI 辅助投入产出比、成本分摊、效能对比。", 7020)] }),
          new TableRow({ children: [cell("合规页", 2340, "F2F2F2"), cell("安全事件统计、规范遵循度、风险人员名单。", 7020)] }),
        ]
      }),
      h2("5.2 智能诊断"),
      bullet("低效消耗识别：自动标记高 Token 低采纳、重复提问、空转会话等异常行为。"),
      bullet("分群管理策略：基于使用深度和产出效率，将成员分为标杆型、成长型、待激活型、风险型，推送差异化管理建议。"),
      bullet("最佳实践推荐：向低深度用户推送高价值 Skills 和 Prompt 模板，向高深度用户推送自定义自动化工作流教程。"),
      h2("5.3 报告与通知"),
      bullet("周报/月报：自动生成团队 AI 使用周报，包含关键指标变化、Top 进步成员、待关注事项。"),
      bullet("告警通知：Token 消耗超预算、安全合规事件、连续多日零使用等场景触发飞书/钉钉消息。"),

      h1("六、AI 效能指数"),
      p("为便于管理者快速评估团队或个人健康状况，定义综合指数如下："),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 160, after: 160 }, children: [new TextRun({ text: "AI 效能指数 = 代码采纳率×0.35 + 问题解决率×0.25 + 交互深度×0.20 + 规范遵循度×0.15 + 工具链结合度×0.05", font: "Microsoft YaHei", size: 22, bold: true })] }),
      p("指数范围为 0-100，建议分层标准：", { before: 120 }),
      bullet("优秀（80-100）：深度使用，产出稳定，可作为内部专家培养。"),
      bullet("良好（60-79）：已入门，偶尔有低效操作，适合针对性培训。"),
      bullet("待提升（40-59）：使用频率或深度不足，需要管理者关注和引导。"),
      bullet("风险（0-39）：几乎不使用或存在严重低效/违规行为，需一对一沟通。"),

      h1("七、权限与合规"),
      bullet("数据访问权限：个人明细仅直属 Leader 和平台管理员可见；跨部门数据需审批。"),
      bullet("隐私保护：禁止记录用户与 AI 的完整对话内容，仅保留结构化行为标签和统计指标。"),
      bullet("审计留痕：所有管理看板的导出和明细查询操作记录审计日志。"),
      bullet("申诉机制：员工可对个人评分或标签提出申诉，由 HR 与技术委员会复核。"),

      h1("八、实施计划"),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [1560, 2340, 2340, 1560, 1560],
        rows: [
          new TableRow({ children: [cell("阶段", 1560, "E8F4FD"), cell("任务", 2340, "E8F4FD"), cell("交付物", 2340, "E8F4FD"), cell("周期", 1560, "E8F4FD"), cell("负责人", 1560, "E8F4FD")] }),
          new TableRow({ children: [cell("第一阶段", 1560, "F2F2F2"), cell("埋点与数据采集", 2340), cell("数据采集规范、埋点 SDK", 2340), cell("2 周", 1560), cell("平台组", 1560)] }),
          new TableRow({ children: [cell("第二阶段", 1560, "F2F2F2"), cell("指标计算与看板搭建", 2340), cell("管理看板 V1.0", 2340), cell("3 周", 1560), cell("数据组", 1560)] }),
          new TableRow({ children: [cell("第三阶段", 1560, "F2F2F2"), cell("诊断模型与分群策略", 2340), cell("智能诊断报告、管理建议引擎", 2340), cell("2 周", 1560), cell("产品组", 1560)] }),
          new TableRow({ children: [cell("第四阶段", 1560, "F2F2F2"), cell("试点运行与迭代优化", 2340), cell("试点反馈、指标调优", 2340), cell("4 周", 1560), cell("运营组", 1560)] }),
        ]
      }),

      h1("九、附录"),
      h2("9.1 术语表"),
      bullet("Token：大模型处理文本的基本单位，通常 1 个中文词约 1-2 个 token。"),
      bullet("Skill：平台提供的自定义能力封装，如代码审查、生成测试用例等。"),
      bullet("采纳率：AI 生成内容被用户保留到最终产出的比例。"),
      h2("9.2 参考文档"),
      bullet("《AI 辅助开发平台使用规范》"),
      bullet("《研发团队效能度量白皮书》"),
      bullet("《数据安全与隐私保护管理办法》"),
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("/Users/dawinyuan/Documents/coder/devops-claw/AI_辅助开发平台_管理者工作分析需求文档.docx", buffer);
  console.log("文档已生成: /Users/dawinyuan/Documents/coder/devops-claw/AI_辅助开发平台_管理者工作分析需求文档.docx");
});
