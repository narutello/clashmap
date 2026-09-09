import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";
import { cn } from "@/lib/utils";

export function Sheet({
  shouldScaleBackground = true,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) {
  return <DrawerPrimitive.Root shouldScaleBackground={shouldScaleBackground} {...props} />;
}

export const SheetTrigger = DrawerPrimitive.Trigger;
export const SheetClose = DrawerPrimitive.Close;
export const SheetPortal = DrawerPrimitive.Portal;

export function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Overlay>) {
  return (
    <DrawerPrimitive.Overlay
      className={cn("fixed inset-0 z-50 bg-background/60", className)}
      {...props}
    />
  );
}

export function SheetContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Content>) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <DrawerPrimitive.Content
        className={cn(
          "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-2xl bg-card p-4 pb-[max(1rem,env(safe-area-inset-bottom))]",
          className,
        )}
        style={{ boxShadow: "var(--shadow-border-hover)" }}
        {...props}
      >
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-border" />
        {children}
      </DrawerPrimitive.Content>
    </SheetPortal>
  );
}

export function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Title>) {
  return (
    <DrawerPrimitive.Title className={cn("text-base font-semibold", className)} {...props} />
  );
}
