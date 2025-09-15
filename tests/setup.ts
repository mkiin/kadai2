// tests/setup.ts
import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

// 各テスト後のクリーンアップ
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});
