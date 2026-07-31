import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Stack from "./index";

const meta = {
  title: "Layout/Stack",
  component: Stack,
  args: {
    direction: "column",
    gap: "lg",
  },
  argTypes: {
    direction: { control: "inline-radio", options: ["row", "column"] },
    gap: {
      control: "select",
      options: ["none", "sm", "md", "lg", "xl", "xxl", "xxxl"],
    },
  },
} satisfies Meta<typeof Stack>;

export default meta;

type Story = StoryObj<typeof meta>;

const Box = ({ children }: { children: string }) => (
  <div
    style={{
      background: "var(--theme-surface)",
      border: "var(--border-width) solid var(--theme-border)",
      borderRadius: "var(--border-radius)",
      padding: "var(--space-lg)",
      color: "var(--theme-text)",
    }}
  >
    {children}
  </div>
);

export const Column: Story = {
  render: (args) => (
    <Stack {...args}>
      <Box>One</Box>
      <Box>Two</Box>
      <Box>Three</Box>
    </Stack>
  ),
};

export const Row: Story = {
  args: { direction: "row", gap: "md" },
  render: (args) => (
    <Stack {...args}>
      <Box>Start a project</Box>
      <Box>View work</Box>
    </Stack>
  ),
};

/** Column on mobile, row from the `md` breakpoint (768px) up — resize to see. */
export const ResponsiveDirection: Story = {
  args: {
    direction: { base: "column", md: "row" },
    gap: { base: "md", lg: "xl" },
  },
  render: (args) => (
    <Stack {...args}>
      <Box>Adapts</Box>
      <Box>With</Box>
      <Box>Viewport</Box>
    </Stack>
  ),
};

export const Centered: Story = {
  args: { align: "center", justify: "center", gap: "md" },
  render: (args) => (
    <Stack {...args} style={{ minHeight: 200 }}>
      <Box>Centered</Box>
      <Box>Content</Box>
    </Stack>
  ),
};
