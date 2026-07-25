import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Button from "./index";

const meta = {
  title: "Components/Button",
  component: Button,
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    disabled: {
      control: "boolean",
    },
    href: {
      control: "text",
    },
  },
  args: {
    children: "Start a project",
    variant: "primary",
    size: "md",
    disabled: false,
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "View work",
  },
};

export const PrimaryDisabled: Story = {
  args: {
    variant: "primary",
    disabled: true,
  },
};

export const SecondaryDisabled: Story = {
  args: {
    variant: "secondary",
    children: "View work",
    disabled: true,
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
    children: "hello@redline.dev",
  },
};

export const AsLink: Story = {
  args: {
    href: "#contact",
    children: "Start a project",
  },
};

export const DisabledLink: Story = {
  args: {
    href: "#contact",
    children: "Start a project",
    disabled: true,
  },
};
