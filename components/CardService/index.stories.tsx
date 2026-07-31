import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import CardService from "./index";

const meta = {
  title: "Components/CardService",
  component: CardService,
  argTypes: {
    index: {
      control: "text",
    },
    title: {
      control: "text",
    },
    description: {
      control: "text",
    },
  },
  args: {
    index: "01",
    title: "Custom Site Builds",
    description:
      "Marketing sites, web apps, and storefronts — designed and engineered to be fast, accessible, and built right.",
  },
} satisfies Meta<typeof CardService>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Alternate: Story = {
  args: {
    index: "02",
    title: "Ongoing Support",
    description:
      "Maintenance, monitoring, and iteration after launch — so the site keeps pace with the business.",
  },
};
