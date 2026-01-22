import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import HashCalculator from "../HashCalculator.vue";

describe("HashCalculator.vue", () => {
  it("renders correctly", () => {
    const wrapper = mount(HashCalculator);
    expect(wrapper.text()).toContain("Hash 哈希计算");
  });

  it("calculates hash", async () => {
    const wrapper = mount(HashCalculator);
    const input = wrapper.find(".io-area textarea");
    await input.setValue("test");

    // Wait for async calculateHash (it's watched)
    // The watch trigger calls calculateHash which is async.
    // We need to wait a small tick or check if output updates.
    await new Promise((r) => setTimeout(r, 100));
    await wrapper.vm.$nextTick();

    const output = wrapper.findAll("textarea")[1];

    // Our mock returns 'mock-hash-result-buffer' encoded
    // TextEncoder().encode('mock-hash-result-buffer') bytes converted to hex

    // We expect some hex output.
    expect((output.element as HTMLTextAreaElement).value).toMatch(
      /^[0-9a-f]+$/,
    );

    // Verify our mock was called potentially?
    // Since we mocked globally, verifying exactly might be tricky unless we spy on window.crypto.subtle.digest
  });
});
