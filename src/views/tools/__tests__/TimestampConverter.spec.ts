import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import TimestampConverter from "../TimestampConverter.vue";

describe("TimestampConverter.vue", () => {
  it("renders correctly", () => {
    const wrapper = mount(TimestampConverter);
    expect(wrapper.text()).toContain("Unix 时间戳转换");
  });

  it("converts timestamp to date", async () => {
    const wrapper = mount(TimestampConverter);
    const vm = wrapper.vm as any;

    // Set a known timestamp: 1609459200 (2021-01-01 00:00:00 UTC) -> Beijing 08:00
    // But local timezone of tester (me/CI) matters.
    // The component uses `new Date(ts * 1000).toLocaleString()` which uses system locale.
    // Let's set inputTs
    vm.inputTs = "1609459200";
    await wrapper.vm.$nextTick();

    expect(vm.resultDate).not.toBe("");
    // Check if it contains 2021
    expect(vm.resultDate).toContain("2021");
  });

  it("converts date string to timestamp", async () => {
    const wrapper = mount(TimestampConverter);
    const vm = wrapper.vm as any;

    // Set a date string
    vm.inputDate = "2023-01-01 00:00:00";
    await wrapper.vm.$nextTick();

    expect(vm.resultTs).not.toBe("");
    // Approximate timestamp check
    const ts = parseInt(vm.resultTs);
    expect(ts).toBeGreaterThan(1672400000);
    expect(ts).toBeLessThan(1672600000);
  });
});
