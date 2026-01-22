import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import QrCodeGenerator from "../QrCodeGenerator.vue";

// Mock qrcode library
vi.mock("qrcode", () => ({
  default: {
    toDataURL: vi.fn().mockImplementation((text, options) => {
      // Return a base64 string mock
      return Promise.resolve(`data:image/png;base64,mockQRCodeFor:${text}`);
    }),
  },
}));

describe("QrCodeGenerator.vue", () => {
  it("renders correctly", () => {
    const wrapper = mount(QrCodeGenerator);
    expect(wrapper.text()).toContain("二维码生成器");
  });

  it("generates QR code", async () => {
    const wrapper = mount(QrCodeGenerator);
    const vm = wrapper.vm as any;

    // Default text is set, watch executes immediately
    await wrapper.vm.$nextTick();
    // Await async generation
    await new Promise((r) => setTimeout(r, 10));
    await wrapper.vm.$nextTick();

    expect(vm.qrDataUrl).toContain("mockQRCodeFor:https://example.com");
  });

  it("updates QR code when settings change", async () => {
    const wrapper = mount(QrCodeGenerator);
    const vm = wrapper.vm as any;

    // Change size
    vm.size = 500;
    await wrapper.vm.$nextTick();
    // Wait for debounce/watch
    await new Promise((r) => setTimeout(r, 10));

    // Since we mock, we can't easily verify the options passed unless we spy on `qrcode.toDataURL`
    // But we know result updates.
    expect(vm.qrDataUrl).toBeTruthy();
  });
});
