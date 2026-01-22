import { config } from "@vue/test-utils";
import ElementPlus from "element-plus";
import { vi } from "vitest";

// Mock matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock crypto.randomUUID if not present (JSDOM might lack it)
if (!window.crypto.randomUUID) {
  Object.defineProperty(window.crypto, "randomUUID", {
    value: vi.fn(() => "00000000-0000-0000-0000-000000000000"),
  });
} // Mock crypto.subtle.digest
if (!window.crypto.subtle) {
  Object.defineProperty(window.crypto, "subtle", {
    value: {
      digest: vi.fn().mockImplementation(async (algo, data) => {
        // Return a mock buffer based on input, strictly deterministic for tests
        // algo: 'SHA-256' etc.
        // data: Uint8Array
        return new TextEncoder().encode("mock-hash-result-buffer").buffer;
      }),
    },
  });
}
config.global.plugins = [ElementPlus];
