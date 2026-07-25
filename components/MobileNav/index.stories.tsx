import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import MobileNav from "./index";

const NAV_ITEMS = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#process" },
];

const meta = {
  title: "Components/MobileNav",
  component: MobileNav,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    items: NAV_ITEMS,
    ctaHref: "/#contact",
    ctaLabel: "Start a project",
  },
} satisfies Meta<typeof MobileNav>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div style={{ padding: "16px", background: "var(--theme-bg)" }}>
      <MobileNav {...args} />
    </div>
  ),
};

export const WithActiveLink: Story = {
  args: {
    activeHref: "/#services",
  },
  render: (args) => (
    <div style={{ padding: "16px", background: "var(--theme-bg)" }}>
      <MobileNav {...args} />
    </div>
  ),
};
