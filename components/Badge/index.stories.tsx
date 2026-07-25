import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Badge from "./index";

const meta = {
  title: "Components/Badge",
  component: Badge,
  argTypes: {
    tone: {
      control: "select",
      options: ["accent", "neutral"],
    },
  },
  args: {
    children: "BACKEND",
    tone: "accent",
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Accent: Story = {
  args: {
    tone: "accent",
    children: "CUSTOM BUILD",
  },
};

export const Neutral: Story = {
  args: {
    tone: "neutral",
    children: "DRAFT",
  },
};

export const AllLabels: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem" }}>
      <Badge>BACKEND</Badge>
      <Badge>CUSTOM BUILD</Badge>
      <Badge>WEB APP</Badge>
    </div>
  ),
};
