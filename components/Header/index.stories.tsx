import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Header from "./index";

const meta = {
  title: "Components/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    activeHref: {
      control: "select",
      options: [undefined, "/#work", "/#services", "/#process"],
    },
  },
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithActiveLink: Story = {
  args: {
    activeHref: "/#services",
  },
};

export const WithLogo: Story = {
  args: {
    // Placeholder mark — swap for the real asset once it lands in /public.
    logoSrc:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Crect width='20' height='20' fill='%23ff4044'/%3E%3C/svg%3E",
  },
};
