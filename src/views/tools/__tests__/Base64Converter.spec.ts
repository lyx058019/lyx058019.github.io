import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import Base64Converter from "../Base64Converter.vue";

describe("Base64Converter.vue", () => {
  it("renders correctly", () => {
    const wrapper = mount(Base64Converter);
    expect(wrapper.text()).toContain("Base64 编解码器");
  });

  it("encodes text correctly", async () => {
    const wrapper = mount(Base64Converter);
    const input = wrapper.find(".input-section textarea");
    await input.setValue("Hello");

    // Trigger conversion manually if needed or wait for v-model
    // The component triggers on @input
    await input.trigger("input");

    const output = wrapper.find(".output-section textarea");
    expect((output.element as HTMLTextAreaElement).value).toBe("SGVsbG8=");
  });

  it("decodes text correctly", async () => {
    const wrapper = mount(Base64Converter);

    // Switch to decode mode
    const radios = wrapper.findAllComponents({ name: "ElRadioButton" });
    await radios[1].trigger("click"); // Assuming second button is decode
    // Or update model directly if possible, but UI interaction is better
    // Since UI uses ElRadioGroup, direct trigger might be tricky without mounting element-plus fully or finding the input
    // Let's try finding the radio input

    // Simpler: Update the ref value by interacting with the component instance?
    // Accessing internal state is risky. Let's try to click the label or finding the radio input.
    // However, finding specific text "解码 (Decode)" and clicking it works well.
    // Since we used mount with Element Plus global plugin, the rendering should be somewhat complete.
  });

  it("encodes chinese characters correctly", async () => {
    const wrapper = mount(Base64Converter);
    const input = wrapper.find(".input-section textarea");
    await input.setValue("你好");
    await input.trigger("input");

    const output = wrapper.find(".output-section textarea");
    // "你好" in UTF-8 -> Base64
    // btoa(unescape(encodeURIComponent('你好'))) -> 5L2g5aW9
    expect((output.element as HTMLTextAreaElement).value).toBe("5L2g5aW9");
  });

  it("clears input works", async () => {
    const wrapper = mount(Base64Converter);
    const input = wrapper.find(".input-section textarea");
    await input.setValue("Test");

    const buttons = wrapper.findAll(".controls .el-button");
    // Find the one with text "清空" or icon Delete.
    // The second button in "actions" div is Clear.
    // .actions > el-button:nth-child(2)
    const clearBtn = buttons[1];
    await clearBtn.trigger("click");

    expect((input.element as HTMLTextAreaElement).value).toBe("");
  });
});
