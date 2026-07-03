/** @vitest-environment jsdom */

import type { ReactNode } from "react";
import { render } from "@testing-library/react";
import { describe, it, vi, expect } from "vitest";

vi.mock("./index.module.css", () => ({
  default: {
    headerContainer: "headerContainer",
  },
}));

vi.mock("next/link", () => ({
  default: ({ href, children }: { href: string; children: ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

import Header from "./index";

describe("Header", () => {
  it("renders", () => {
    const { container } = render(<Header />);

    const header = container.querySelector("header");

    expect(header).toBeTruthy();
  });
});
