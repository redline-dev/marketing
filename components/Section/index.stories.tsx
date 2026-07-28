import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Section from "./index";
import Container from "../Container";

const meta = {
  title: "Layout/Section",
  component: Section,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    spacing: "default",
  },
  argTypes: {
    spacing: {
      control: "inline-radio",
      options: ["default", "compact", "spacious", "none"],
    },
  },
} satisfies Meta<typeof Section>;

export default meta;

type Story = StoryObj<typeof meta>;

const Band = ({ children }: { children: string }) => (
  <div
    style={{
      background: "var(--theme-surface)",
      color: "var(--theme-text)",
      textAlign: "center",
    }}
  >
    {children}
  </div>
);

export const Default: Story = {
  render: (args) => (
    <Section {...args}>
      <Band>Section — padding-block: var(--section-spacing)</Band>
    </Section>
  ),
};

/** Composed with Container for the content column, as used on the page. */
export const WithContainer: Story = {
  render: (args) => (
    <Section {...args} style={{ background: "var(--theme-surface-alt)" }}>
      <Container>
        <p>Full-bleed background on Section, content column via Container.</p>
      </Container>
    </Section>
  ),
};

export const SpacingScale: Story = {
  render: () => (
    <>
      {(["compact", "default", "spacious", "none"] as const).map((spacing) => (
        <Section
          key={spacing}
          spacing={spacing}
          style={{
            borderBottom: "var(--border-width) solid var(--theme-border)",
          }}
        >
          <Band>{`spacing="${spacing}"`}</Band>
        </Section>
      ))}
    </>
  ),
};
