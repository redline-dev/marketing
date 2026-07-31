import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Grid from "./index";

const meta = {
  title: "Layout/Grid",
  component: Grid,
  args: {
    gap: "xl",
  },
  argTypes: {
    gap: {
      control: "select",
      options: ["none", "sm", "md", "lg", "xl", "xxl", "xxxl"],
    },
  },
} satisfies Meta<typeof Grid>;

export default meta;

type Story = StoryObj<typeof meta>;

const Cell = ({ children }: { children: string }) => (
  <div
    style={{
      background: "var(--theme-surface)",
      border: "var(--border-width) solid var(--theme-border)",
      borderRadius: "var(--border-radius)",
      padding: "var(--space-xl)",
      color: "var(--theme-text)",
    }}
  >
    {children}
  </div>
);

const cells = (n: number) =>
  Array.from({ length: n }, (_, i) => <Cell key={i}>{`Item ${i + 1}`}</Cell>);

/** The services grid: 1 column on mobile, 3 from `md` up. Resize to see. */
export const Services: Story = {
  args: { columns: { base: 1, md: 3 } },
  render: (args) => <Grid {...args}>{cells(3)}</Grid>,
};

/** Selected work: 1 column on mobile, 2 from `md` up. */
export const Work: Story = {
  args: { columns: { base: 1, md: 2 } },
  render: (args) => <Grid {...args}>{cells(4)}</Grid>,
};

/** Process steps: 1 / 2 / 4 across the breakpoints. */
export const Process: Story = {
  args: { columns: { base: 1, md: 2, lg: 4 }, gap: "lg" },
  render: (args) => <Grid {...args}>{cells(4)}</Grid>,
};

/** Fluid: auto-fits as many >=16rem columns as fit, no breakpoints. */
export const AutoFit: Story = {
  args: { minChildWidth: "16rem" },
  render: (args) => <Grid {...args}>{cells(6)}</Grid>,
};
