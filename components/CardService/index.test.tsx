/** @vitest-environment jsdom */

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("./index.module.css", () => ({
  default: {
    card: "card",
    index: "index",
  },
}));

import CardService from "./index";

afterEach(cleanup);

const props = {
  index: "01",
  title: "Custom Site Builds",
  description: "Marketing sites, web apps, and storefronts.",
};

describe("CardService", () => {
  it("renders the index, title, and description", () => {
    render(<CardService {...props} />);

    expect(screen.getByText("[01]")).toBeTruthy();
    expect(
      screen.getByRole("heading", { name: "Custom Site Builds" }),
    ).toBeTruthy();
    expect(
      screen.getByText("Marketing sites, web apps, and storefronts."),
    ).toBeTruthy();
  });

  it("applies the card class to the root element", () => {
    const { container } = render(<CardService {...props} />);

    expect(container.firstElementChild?.className).toContain("card");
  });

  it("merges an optional className onto the root element", () => {
    const { container } = render(<CardService {...props} className="extra" />);

    expect(container.firstElementChild?.className).toContain("extra");
  });
});
