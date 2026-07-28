import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Divider from "./index";

const meta = {
  title: "Layout/Divider",
  component: Divider,
  args: {
    orientation: "horizontal",
    spacing: "none",
  },
  argTypes: {
    orientation: {
      control: "inline-radio",
      options: ["horizontal", "vertical"],
    },
    spacing: {
      control: "select",
      options: ["none", "sm", "md", "lg", "xl", "xxl", "xxxl"],
    },
  },
} satisfies Meta<typeof Divider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  args: { spacing: "lg" },
  render: (args) => (
    <div style={{ color: "var(--theme-text)" }}>
      <p>Above the rule</p>
      <Divider {...args} />
      <p>Below the rule</p>
    </div>
  ),
};

/** Vertical separators between inline items — the client logo bar. */
export const InlineSeparators: Story = {
  args: { orientation: "vertical", spacing: "lg" },
  render: (args) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        color: "var(--theme-text-muted)",
        fontFamily: "var(--font-mono)",
        textTransform: "uppercase",
        letterSpacing: "var(--tracking-wide)",
        fontSize: "var(--text-sm)",
      }}
    >
      <span>Northwind Logistics</span>
      <Divider {...args} />
      <span>Atlas Dental Group</span>
      <Divider {...args} />
      <span>Cedar &amp; Co</span>
    </div>
  ),
};

export const SpacingScale: Story = {
  render: () => (
    <div style={{ color: "var(--theme-text)" }}>
      {(["none", "md", "xl", "xxl"] as const).map((spacing) => (
        <div key={spacing}>
          <small>{`spacing="${spacing}"`}</small>
          <Divider spacing={spacing} />
        </div>
      ))}
    </div>
  ),
};
