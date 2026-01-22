import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import ColorConverter from "../ColorConverter.vue";

describe("ColorConverter.vue", () => {
  it("renders correctly", () => {
    const wrapper = mount(ColorConverter);
    expect(wrapper.text()).toContain("颜色格式转换");
  });

  it("converts hex to rgb and hsl", async () => {
    const wrapper = mount(ColorConverter);
    const vm = wrapper.vm as any;

    // Set hex
    vm.hex = "#ff0000";
    vm.handleHexInput("#ff0000"); // Trigger logic manually or via input
    await wrapper.vm.$nextTick();

    expect(vm.rgb).toBe("rgb(255, 0, 0)");
    // HSL for red: 0, 100%, 50%
    expect(vm.hsl).toBe("hsl(0, 100%, 50%)");
  });

  it("updates from color picker", async () => {
    const wrapper = mount(ColorConverter);
    const vm = wrapper.vm as any;

    vm.handlePickerChange("#00ff00");
    await wrapper.vm.$nextTick();

    expect(vm.hex).toBe("#00ff00");
    expect(vm.rgb).toBe("rgb(0, 255, 0)");
  });
});
