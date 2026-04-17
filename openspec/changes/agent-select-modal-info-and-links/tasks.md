## 1. Component Update

- [x] 1.1 In `src/components/AgentTypeSelectModal.vue`, add `agentDetails` constant mapping each agent type to its positioning description and official website URL.
- [x] 1.2 Replace static `type-desc` text in the template with the descriptions from `agentDetails`.
- [x] 1.3 Add a footer link ("了解更多") to each type card that opens the official website in a new tab using `<a target="_blank" rel="noopener noreferrer">`.
- [x] 1.4 Add scoped Less styles for the new footer link, keeping it visually distinct from the "选择" button.

## 2. Verification

- [x] 2.1 Run `npm run build` to ensure the component compiles without type or lint errors.
- [x] 2.2 Manually verify in the browser that both links navigate to the correct URLs (`https://openclaw.ai/` and `https://hermes-agent.nousresearch.com/`) and open in new tabs.
- [x] 2.3 Confirm the modal layout remains balanced and card heights do not cause overflow on standard desktop viewports.
