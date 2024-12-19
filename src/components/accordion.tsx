import * as React from "react";
import { Accordion as BaseAccordion } from "@base-ui-components/react/accordion";
import type { VariantProps } from "cva";
import { cx, cva } from "@/lib/cva";

export const accordionRoot = cva({
  base: "flex w-96 max-w-[calc(100vw-8rem)] flex-col justify-center text-neutral-900 dark:text-neutral-100",
  variants: {
    size: {
      sm: "w-72",
      md: "w-96",
      lg: "w-[32rem]",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const accordionItem = cva({
  base: "border-b border-neutral-200 dark:border-neutral-800",
});

export const accordionTrigger = cva({
  base: [
    "group flex w-full cursor-pointer items-baseline justify-between gap-4 py-2",
    "text-left font-medium",
    "focus-visible:outline-2 focus-visible:outline-blue-800 dark:focus-visible:outline-blue-400",
  ],
  variants: {
    size: {
      sm: "text-sm py-1.5",
      md: "text-base py-2",
      lg: "text-lg py-2.5",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const accordionPanel = cva({
  base: [
    "h-[var(--accordion-panel-height)] overflow-hidden transition-[height] ease-out",
    "[[data-starting-style],[data-ending-style]]:h-0",
  ],
});

export const accordionPanelContent = cva({
  base: "pb-3 text-neutral-600 dark:text-neutral-400",
  variants: {
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const accordionIcon = cva({
  base: [
    "mr-2 shrink-0 transition-all ease-out",
    "group-data-[panel-open]:scale-110 group-data-[panel-open]:rotate-45",
  ],
  variants: {
    size: {
      sm: "size-2.5",
      md: "size-3",
      lg: "size-3.5",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

// Types for our component props
type AccordionRootProps = React.ComponentProps<typeof BaseAccordion.Root> &
  VariantProps<typeof accordionRoot>;

type AccordionItemProps = React.ComponentProps<typeof BaseAccordion.Item> & {
  title: React.ReactNode;
  children: React.ReactNode;
  size?: VariantProps<typeof accordionTrigger>["size"];
};

// Icon component
function PlusIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 12 12" fill="currentcolor" {...props}>
      <path d="M6.75 0H5.25V5.25H0V6.75L5.25 6.75V12H6.75V6.75L12 6.75V5.25H6.75V0Z" />
    </svg>
  );
}

// Compound components
export function AccordionRoot({
  className,
  size = "md",
  ...props
}: AccordionRootProps) {
  return (
    <BaseAccordion.Root
      className={cx(accordionRoot({ size }), className)}
      {...props}
    />
  );
}

export function AccordionItem({
  title,
  children,
  className,
  size = "md",
  ...props
}: AccordionItemProps) {
  return (
    <BaseAccordion.Item className={cx(accordionItem(), className)} {...props}>
      <BaseAccordion.Header>
        <BaseAccordion.Trigger className={accordionTrigger({ size })}>
          {title}
          <PlusIcon className={accordionIcon({ size })} />
        </BaseAccordion.Trigger>
      </BaseAccordion.Header>
      <BaseAccordion.Panel className={accordionPanel()}>
        <div className={accordionPanelContent({ size })}>{children}</div>
      </BaseAccordion.Panel>
    </BaseAccordion.Item>
  );
}

// Export the compound component
export const Accordion = {
  Root: AccordionRoot,
  Item: AccordionItem,
};
