import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import UuidGenerator from "../UuidGenerator.vue";

describe("UuidGenerator.vue", () => {
  it("renders correctly", () => {
    const wrapper = mount(UuidGenerator);
    expect(wrapper.text()).toContain("UUID & 密码生成器");
  });

  it("generates UUIDs on mount", () => {
    const wrapper = mount(UuidGenerator);
    // Should have initial value
    const uuidTextarea = wrapper.findAll("textarea")[0]; // First textarea serves UUID
    expect((uuidTextarea.element as HTMLTextAreaElement).value).not.toBe("");
  });

  it("respects uppercase option", async () => {
    const wrapper = mount(UuidGenerator);

    // Find switch/checkbox for uppercase
    // Look for "大写英文" label or switch
    // Note: The UI structure needs to be traversed.
    // Based on code: <el-switch v-model="uuidUppercase" ... />

    // Let's modify the component state directly for easier testing of logic
    // since finding Element Plus inner inputs can be brittle without stubs.
    // However, we want to test interaction if possible.

    // Let's toggle the switch.
    const switches = wrapper.findAll(".el-switch");
    // Assuming the order based on options. Need to be careful.
    // Let's rely on finding by text or label if possible?
    // Element Plus structure is complex.

    // Strategy: Access vm to set state, then trigger generation function.
    // But testing the black box is better.
    // Let's try to set the internal state via props if exposed (no), or use vm.
    const vm = wrapper.vm as any;
    vm.uuidUppercase = true;
    vm.generateUuid();
    await wrapper.vm.$nextTick();

    const uuidTextarea = wrapper.findAll("textarea")[0];
    const val = (uuidTextarea.element as HTMLTextAreaElement).value;
    expect(val).toMatch(/^[0-9A-F-]+$/); // Uppercase hex
  });

  it("generates password correctly", async () => {
    const wrapper = mount(UuidGenerator);

    // Switch to Password tab?
    // Tabs content might be lazy loaded? element-plus tabs are usually rendered but hidden.
    // The "generatePassword" function is called on mount so pwResult should be populated.

    const vm = wrapper.vm as any;
    expect(vm.pwResult).toBeTruthy();
    expect(vm.pwResult.length).toBe(16); // Default length
  });
});
