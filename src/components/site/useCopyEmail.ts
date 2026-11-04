"use client";

import { useCallback } from "react";
import { EMAIL } from "@/data/contact";
import { confetti } from "@/lib/browser";
import { useSite } from "./SiteProvider";

export function useCopyEmail() {
  const { toast } = useSite();
  return useCallback(() => {
    confetti();
    try {
      navigator.clipboard.writeText(EMAIL).then(() => toast("Copied " + EMAIL), () => toast(EMAIL));
    } catch {
      toast(EMAIL);
    }
  }, [toast]);
}
