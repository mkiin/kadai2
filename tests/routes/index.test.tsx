// tests/routes/index.test.tsx
import { beforeEach, describe, expect, it, vi } from "vitest";
import { render } from "vitest-browser-react";
import { Route } from "@/routes/index";

describe("学習記録アプリ", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("タイトルが正しく表示される", async () => {
    const AppComponent = Route.options?.component!;

    const screen = render(<AppComponent />);

    await expect.element(screen.getByText("学習記録一覧")).toBeInTheDocument();
  });
});
