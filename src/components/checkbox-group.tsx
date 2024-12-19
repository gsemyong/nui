import * as React from "react";
import { CheckboxGroup as BaseCheckboxGroup } from "@base-ui-components/react/checkbox-group";
import { cx, cva } from "@/lib/cva";
import type { VariantProps } from "cva";
import { Checkbox } from "./checkbox";

export const checkboxGroupRoot = cva({
  base: "flex flex-col items-start gap-1 text-neutral-900 dark:text-neutral-100",
  variants: {
    size: {
      sm: "gap-0.5",
      md: "gap-1",
      lg: "gap-1.5",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const checkboxGroupLabel = cva({
  base: "font-medium",
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

type Option = {
  value: string;
  label: React.ReactNode;
};

type CheckboxGroupRootProps = React.ComponentProps<typeof BaseCheckboxGroup> &
  VariantProps<typeof checkboxGroupRoot> & {
    label?: React.ReactNode;
    options: Option[];
  };

export function CheckboxGroupRoot({
  className,
  size,
  label,
  options,
  "aria-labelledby": ariaLabelledby,
  ...props
}: CheckboxGroupRootProps) {
  const labelId =
    ariaLabelledby || (label ? "checkbox-group-label" : undefined);

  return (
    <BaseCheckboxGroup
      aria-labelledby={labelId}
      className={cx(checkboxGroupRoot({ size }), className)}
      {...props}
    >
      {label && (
        <div className={checkboxGroupLabel({ size })} id={labelId}>
          {label}
        </div>
      )}

      {options.map((option) => (
        <Checkbox.Root
          key={option.value}
          name={option.value}
          size={size}
          label={option.label}
        />
      ))}
    </BaseCheckboxGroup>
  );
}

export const CheckboxGroup = {
  Root: CheckboxGroupRoot,
};
