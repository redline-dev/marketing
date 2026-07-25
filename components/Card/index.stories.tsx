import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Card from "./index";

const meta = {
  title: "Components/Card",
  component: Card,
  argTypes: {
    padding: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    interactive: {
      control: "boolean",
    },
    accent: {
      control: "boolean",
    },
  },
  args: {
    padding: "md",
    interactive: false,
    accent: false,
    children: "Card content",
  },
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Interactive: Story = {
  args: {
    interactive: true,
    children: "Hover this card — border and elevation respond",
  },
};

export const Accent: Story = {
  args: {
    accent: true,
    children: "Accented card with a red glow border",
  },
};

export const SmallPadding: Story = {
  args: {
    padding: "sm",
  },
};

export const LargePadding: Story = {
  args: {
    padding: "lg",
  },
};

export const ServiceCardExample: Story = {
  name: "Composed: Service card",
  render: () => (
    <div
      style={{
        maxWidth: 320,
        fontFamily: "var(--font-sans)",
        color: "var(--theme-text)",
      }}
    >
      <Card interactive>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "13px",
            color: "var(--theme-primary)",
            marginBottom: "24px",
          }}
        >
          [01]
        </div>
        <h3 style={{ fontSize: "23px", margin: "0 0 12px" }}>
          Custom Site Builds
        </h3>
        <p
          style={{
            fontSize: "15px",
            lineHeight: 1.65,
            color: "var(--theme-text-muted)",
            margin: 0,
          }}
        >
          Marketing sites, web apps, and storefronts — designed and engineered
          to be fast, accessible, and built right.
        </p>
      </Card>
    </div>
  ),
};
