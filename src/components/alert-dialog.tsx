import * as React from "react";
import { AlertDialog as BaseAlertDialog } from "@base-ui-components/react/alert-dialog";
import { cx, cva } from "@/lib/cva";
import type { VariantProps } from "cva";

export const alertDialogTrigger = cva({
  base: [
    "flex h-10 items-center justify-center rounded-md",
    "border border-neutral-200 dark:border-neutral-800",
    "bg-neutral-50 dark:bg-neutral-900",
    "px-3.5 text-base font-medium select-none",
    "hover:bg-neutral-100 dark:hover:bg-neutral-800",
    "active:bg-neutral-100 dark:active:bg-neutral-800",
    "focus-visible:outline-2 focus-visible:-outline-offset-1",
    "focus-visible:outline-blue-800 dark:focus-visible:outline-blue-400",
  ],
  variants: {
    intent: {
      default: "text-neutral-900 dark:text-neutral-100",
      danger: "text-red-800 dark:text-red-400",
    },
  },
  defaultVariants: {
    intent: "default",
  },
});

export const alertDialogBackdrop = cva({
  base: [
    "fixed inset-0 bg-black/20 dark:bg-black/40",
    "transition-all duration-150",
    "[[data-starting-style],[data-ending-style]]:opacity-0",
  ],
});

export const alertDialogPopup = cva({
  base: [
    "fixed top-1/2 left-1/2 -mt-8 -translate-1/2",
    "w-96 max-w-[calc(100vw-3rem)] rounded-lg",
    "bg-neutral-50 dark:bg-neutral-900",
    "p-6 text-neutral-900 dark:text-neutral-100",
    "outline outline-neutral-200 dark:outline-neutral-800",
    "transition-all duration-150",
    "[[data-starting-style],[data-ending-style]]:scale-90",
    "[[data-starting-style],[data-ending-style]]:opacity-0",
  ],
  variants: {
    size: {
      sm: "w-80",
      md: "w-96",
      lg: "w-[32rem]",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const alertDialogTitle = cva({
  base: "-mt-1.5 mb-1 text-lg font-medium text-neutral-900 dark:text-neutral-100",
});

export const alertDialogDescription = cva({
  base: "mb-6 text-base text-neutral-600 dark:text-neutral-400",
});

export const alertDialogFooter = cva({
  base: "flex justify-end gap-4",
});

type AlertDialogRootProps = React.ComponentProps<typeof BaseAlertDialog.Root>;

type AlertDialogTriggerProps = React.ComponentProps<
  typeof BaseAlertDialog.Trigger
> &
  VariantProps<typeof alertDialogTrigger>;

type AlertDialogContentProps = React.ComponentProps<
  typeof BaseAlertDialog.Popup
> &
  VariantProps<typeof alertDialogPopup> & {
    title: React.ReactNode;
    description: React.ReactNode;
    cancelText?: React.ReactNode;
    confirmText?: React.ReactNode;
    intent?: VariantProps<typeof alertDialogTrigger>["intent"];
  };

export function AlertDialogRoot(props: AlertDialogRootProps) {
  return <BaseAlertDialog.Root {...props} />;
}

export function AlertDialogTrigger({
  className,
  intent,
  ...props
}: AlertDialogTriggerProps) {
  return (
    <BaseAlertDialog.Trigger
      className={cx(alertDialogTrigger({ intent }), className)}
      {...props}
    />
  );
}

export function AlertDialogContent({
  className,
  size,
  title,
  description,
  cancelText = "Cancel",
  confirmText = "Confirm",
  intent = "danger",
  ...props
}: AlertDialogContentProps) {
  return (
    <BaseAlertDialog.Portal>
      <BaseAlertDialog.Backdrop className={alertDialogBackdrop()} />
      <BaseAlertDialog.Popup
        className={cx(alertDialogPopup({ size }), className)}
        {...props}
      >
        <BaseAlertDialog.Title className={alertDialogTitle()}>
          {title}
        </BaseAlertDialog.Title>
        <BaseAlertDialog.Description className={alertDialogDescription()}>
          {description}
        </BaseAlertDialog.Description>
        <div className={alertDialogFooter()}>
          <BaseAlertDialog.Close className={alertDialogTrigger()}>
            {cancelText}
          </BaseAlertDialog.Close>
          <BaseAlertDialog.Close className={alertDialogTrigger({ intent })}>
            {confirmText}
          </BaseAlertDialog.Close>
        </div>
      </BaseAlertDialog.Popup>
    </BaseAlertDialog.Portal>
  );
}

export const AlertDialog = {
  Root: AlertDialogRoot,
  Trigger: AlertDialogTrigger,
  Content: AlertDialogContent,
};
