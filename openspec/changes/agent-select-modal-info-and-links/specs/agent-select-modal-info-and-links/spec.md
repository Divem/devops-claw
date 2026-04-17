## ADDED Requirements

### Requirement: Agent type card displays positioning description
The system SHALL display a positioning description for each agent type within the selection card that clarifies its core difference and recommended use case.

#### Scenario: OpenClaw card shows positioning text
- **WHEN** the `AgentTypeSelectModal` is visible
- **THEN** the OpenClaw card SHALL display the description: "轻量敏捷的开源 AI 助手框架，强调模型选择自由与数据自主。适合追求极简部署、灵活自定义和快速上手的团队。"

#### Scenario: Hermes Agent card shows positioning text
- **WHEN** the `AgentTypeSelectModal` is visible
- **THEN** the Hermes Agent card SHALL display the description: "具备持续进化能力的 24/7 自主代理，自动从经验中创建和优化技能。适合需要代理长期自主学习并处理复杂任务的企业场景。"

### Requirement: Agent type card provides official website link
The system SHALL provide a clickable link on each agent type card that navigates to the corresponding official website in a new browser tab.

#### Scenario: OpenClaw link navigates to official site
- **WHEN** the user clicks the "了解更多" link on the OpenClaw card
- **THEN** the system SHALL open `https://openclaw.ai/` in a new tab

#### Scenario: Hermes Agent link navigates to official site
- **WHEN** the user clicks the "了解更多" link on the Hermes Agent card
- **THEN** the system SHALL open `https://hermes-agent.nousresearch.com/` in a new tab

### Requirement: Website link uses safe external navigation
The system SHALL ensure all official website links include `rel="noopener noreferrer"` and `target="_blank"`.

#### Scenario: Link attributes are secure
- **WHEN** inspecting any "了解更多" link in the modal
- **THEN** the link element SHALL have `target="_blank"` and `rel="noopener noreferrer"` attributes
