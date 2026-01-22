import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import JsonFormatter from "../JsonFormatter.vue";

describe("JsonFormatter.vue", () => {
  it("formats json correctly", async () => {
    const wrapper = mount(JsonFormatter);
    const vm = wrapper.vm as any;
    vm.input = '{"a":1,"b":2}';

    // Find format button
    const buttons = wrapper.findAll(".actions .el-button");
    await buttons[0].trigger("click"); // First button is Format

    expect(vm.output).toContain('{\n  "a": 1,\n  "b": 2\n}');
    expect(vm.hasError).toBe(false);
  });

  it("compresses json correctly", async () => {
    const wrapper = mount(JsonFormatter);
    const vm = wrapper.vm as any;
    vm.input = '{\n  "a": 1,\n  "b": 2\n}';

    const buttons = wrapper.findAll(".actions .el-button");
    await buttons[1].trigger("click"); // Second button is Compress

    expect(vm.output).toBe('{"a":1,"b":2}');
  });

  it("shows error on invalid json", async () => {
    const wrapper = mount(JsonFormatter);
    const vm = wrapper.vm as any;
    vm.input = "{invalid}";

    const buttons = wrapper.findAll(".actions .el-button");
    await buttons[0].trigger("click");

    expect(vm.hasError).toBe(true);
    // Checking element ui Message might be hard as it renders outside, but we can check state
  });
});
