"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";

import { cn } from "@/lib/utils";

function Label({ className, type, ...props }) {
  const style =
    type === "radio"
      ? {
          color: "black",
          fontSize: "16px",
          lineHeight: "26px",
        }
      : {};
  return (
    <LabelPrimitive.Root
      data-slot="label"
      style={style}
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        type === "radio" && "font-normal text-base/[26px] text-black/[87]",
        className
      )}
      {...props}
    />
  );
}

export { Label };
