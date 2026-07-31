import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Container from "./index";

const meta = {
  title: "Layout/Container",
  component: Container,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    size: "default",
  },
  argTypes: {
    size: {
      control: "inline-radio",
      options: ["default", "narrow", "full"],
    },
  },
} satisfies Meta<typeof Container>;

export default meta;

type Story = StoryObj<typeof meta>;

const Demo = ({ label }: { label: string }) => (
  <div
    style={{
      background: "var(--theme-surface)",
      border: "var(--border-width) solid var(--theme-border)",
      borderRadius: "var(--border-radius)",
      padding: "var(--space-xl)",
      color: "var(--theme-text)",
    }}
  >
    {label}
  </div>
);

export const Default: Story = {
  render: (args) => (
    <Container {...args}>
      <Demo label="Default — constrained to --container-width (1440px)" />
    </Container>
  ),
};

export const Narrow: Story = {
  args: { size: "narrow" },
  render: (args) => (
    <Container {...args}>
      <Demo label="Narrow — a reduced measure for centered content" />
    </Container>
  ),
};

export const Full: Story = {
  args: { size: "full" },
  render: (args) => (
    <Container {...args}>
      <Demo label="Full — gutter padding only, no max width" />
    </Container>
  ),
};
