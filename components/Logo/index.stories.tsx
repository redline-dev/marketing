import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Logo from "./index";

const meta = {
  title: "Components/Logo",
  component: Logo,
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    bold: {
      control: "boolean",
    },
  },
  args: {
    size: "md",
    bold: true,
  },
} satisfies Meta<typeof Logo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Bold: Story = {
  args: {
    bold: true,
  },
};

export const Regular: Story = {
  args: {
    bold: false,
  },
};

export const Small: Story = {
  args: {
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
  },
};
