import * as React from "react";
import { Checkbox as BaseCheckbox } from "@base-ui-components/react/checkbox";
import { cx, cva } from "@/lib/cva";
import type { VariantProps } from "cva";

export const checkboxRoot = cva({
  base: [
    "flex items-center justify-center rounded-sm outline-0",
    "focus-visible:outline-2 focus-visible:outline-offset-2",
    "focus-visible:outline-blue-800 dark:focus-visible:outline-blue-400",
    "data-[checked]:bg-neutral-900 dark:data-[checked]:bg-neutral-100",
    "data-[unchecked]:border data-[unchecked]:border-neutral-300",
    "dark:data-[unchecked]:border-neutral-700",
  ],
  variants: {
    size: {
      sm: "size-4",
      md: "size-5",
      lg: "size-6",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const checkboxIndicator = cva({
  base: [
    "flex data-[unchecked]:hidden",
    "text-neutral-50 dark:text-neutral-900",
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

export const checkboxLabel = cva({
  base: "flex items-center gap-2 text-neutral-900 dark:text-neutral-100 select-none",
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

// Types for our component props
type CheckboxRootProps = React.ComponentProps<typeof BaseCheckbox.Root> &
  VariantProps<typeof checkboxRoot> & {
    label?: React.ReactNode;
  };

// Icon component
function CheckIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      fill="currentcolor"
      width="10"
      height="10"
      viewBox="0 0 10 10"
      {...props}
    >
      <path d="M9.1603 1.12218C9.50684 1.34873 9.60427 1.81354 9.37792 2.16038L5.13603 8.66012C5.01614 8.8438 4.82192 8.96576 4.60451 8.99384C4.3871 9.02194 4.1683 8.95335 4.00574 8.80615L1.24664 6.30769C0.939709 6.02975 0.916013 5.55541 1.19372 5.24822C1.47142 4.94102 1.94536 4.91731 2.2523 5.19524L4.36085 7.10461L8.12299 1.33999C8.34934 0.993152 8.81376 0.895638 9.1603 1.12218Z" />
    </svg>
  );
}

// Component implementation
export function CheckboxRoot({
  className,
  size,
  label,
  ...props
}: CheckboxRootProps) {
  const checkbox = (
    <BaseCheckbox.Root
      className={cx(checkboxRoot({ size }), className)}
      {...props}
    >
      <BaseCheckbox.Indicator className={checkboxIndicator({ size })}>
        <CheckIcon />
      </BaseCheckbox.Indicator>
    </BaseCheckbox.Root>
  );

  if (label) {
    return (
      <label className={checkboxLabel({ size })}>
        {checkbox}
        {label}
      </label>
    );
  }

  return checkbox;
}

// Export the component
export const Checkbox = {
  Root: CheckboxRoot,
};
