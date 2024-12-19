import * as React from "react";
import { Collapsible as BaseCollapsible } from "@base-ui-components/react/collapsible";
import { cx, cva } from "@/lib/cva";
import type { VariantProps } from "cva";

export const collapsibleRoot = cva({
  base: "flex min-h-36 flex-col justify-center text-neutral-900 dark:text-neutral-100",
  variants: {
    size: {
      sm: "w-48",
      md: "w-56",
      lg: "w-64",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const collapsibleTrigger = cva({
  base: [
    "group flex items-center gap-2 rounded-sm",
    "bg-neutral-100 dark:bg-neutral-800",
    "hover:bg-neutral-200 dark:hover:bg-neutral-700",
    "active:bg-neutral-200 dark:active:bg-neutral-700",
    "focus-visible:outline-2 focus-visible:outline-blue-800 dark:focus-visible:outline-blue-400",
  ],
  variants: {
    size: {
      sm: "px-1.5 py-0.5 text-xs",
      md: "px-2 py-1 text-sm",
      lg: "px-3 py-1.5 text-base",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const collapsiblePanel = cva({
  base: [
    "flex h-[var(--collapsible-panel-height)] flex-col justify-end overflow-hidden",
    "transition-all ease-out",
    "[[data-starting-style],[data-ending-style]]:h-0",
  ],
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const collapsibleContent = cva({
  base: [
    "mt-1 flex cursor-text flex-col rounded-sm",
    "bg-neutral-100 dark:bg-neutral-800",
  ],
  variants: {
    size: {
      sm: "gap-1.5 py-1.5 pl-6",
      md: "gap-2 py-2 pl-7",
      lg: "gap-2.5 py-2.5 pl-8",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const collapsibleIcon = cva({
  base: "transition-all ease-out group-data-[panel-open]:rotate-90",
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
type CollapsibleRootProps = React.ComponentProps<typeof BaseCollapsible.Root> &
  VariantProps<typeof collapsibleRoot>;

type CollapsibleTriggerProps = React.ComponentProps<
  typeof BaseCollapsible.Trigger
> &
  VariantProps<typeof collapsibleTrigger> & {
    children: React.ReactNode;
  };

type CollapsibleContentProps = React.ComponentProps<
  typeof BaseCollapsible.Panel
> &
  VariantProps<typeof collapsiblePanel> & {
    children: React.ReactNode;
  };

// Icon component
function ChevronIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" {...props}>
      <path d="M3.5 9L7.5 5L3.5 1" stroke="currentcolor" />
    </svg>
  );
}

// Component implementation
export function CollapsibleRoot({
  className,
  size = "md",
  ...props
}: CollapsibleRootProps) {
  return (
    <BaseCollapsible.Root
      className={cx(collapsibleRoot({ size }), className)}
      {...props}
    />
  );
}

export function CollapsibleTrigger({
  className,
  size = "md",
  children,
  ...props
}: CollapsibleTriggerProps) {
  return (
    <BaseCollapsible.Trigger
      className={cx(collapsibleTrigger({ size }), className)}
      {...props}
    >
      <ChevronIcon className={collapsibleIcon({ size })} />
      {children}
    </BaseCollapsible.Trigger>
  );
}

export function CollapsibleContent({
  className,
  size = "md",
  children,
  ...props
}: CollapsibleContentProps) {
  return (
    <BaseCollapsible.Panel
      className={cx(collapsiblePanel({ size }), className)}
      {...props}
    >
      <div className={collapsibleContent({ size })}>{children}</div>
    </BaseCollapsible.Panel>
  );
}

// Export the compound component
export const Collapsible = {
  Root: CollapsibleRoot,
  Trigger: CollapsibleTrigger,
  Content: CollapsibleContent,
};
