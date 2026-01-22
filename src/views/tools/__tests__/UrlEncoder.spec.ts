import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import UrlEncoder from "../UrlEncoder.vue";

describe("UrlEncoder.vue", () => {
  it("renders correctly", () => {
    const wrapper = mount(UrlEncoder);
    expect(wrapper.text()).toContain("URL 编码/解码");
  });

  it("encodes URL component", async () => {
    const wrapper = mount(UrlEncoder);
    const input = wrapper.find(".input-section textarea");
    await input.setValue("https://example.com?q=hello world");
    await input.trigger("input");

    const output = wrapper.find(".output-section textarea");
    // Standard validation: encodeURIComponent('https://example.com?q=hello world')
    // -> https%3A%2F%2Fexample.com%3Fq%3Dhello%20world
    expect((output.element as HTMLTextAreaElement).value).toBe(
      "https%3A%2F%2Fexample.com%3Fq%3Dhello%20world",
    );
  });

  it("decodes URL component", async () => {
    const wrapper = mount(UrlEncoder);
    const vm = wrapper.vm as any;

    // Switch to decode directly to ensure state change
    vm.mode = "decode";
    await wrapper.vm.$nextTick();

    const input = wrapper.find(".input-section textarea");
    await input.setValue("https%3A%2F%2Fexample.com");
    // Trigger input to run handleConvert
    await input.trigger("input");

    const output = wrapper.find(".output-section textarea");
    expect((output.element as HTMLTextAreaElement).value).toBe(
      "https://example.com",
    );
  });

  it("handles encode all mode", async () => {
    const wrapper = mount(UrlEncoder);
    const vm = wrapper.vm as any;
    // Activate encode all
    vm.encodeAll = true;

    const input = wrapper.find(".input-section textarea");
    await input.setValue("abc");
    await input.trigger("input");

    const output = wrapper.find(".output-section textarea");
    // 'a' -> 97 -> 0x61 -> %61
    // abc -> %61%62%63
    expect((output.element as HTMLTextAreaElement).value.toUpperCase()).toBe(
      "%61%62%63",
    );
  });
});
