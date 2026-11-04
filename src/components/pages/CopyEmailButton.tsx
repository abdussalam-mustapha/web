"use client";

import { Icon } from "@/components/ui/Icon";
import { useCopyEmail } from "@/components/site/useCopyEmail";

export function CopyEmailButton() {
  const copy = useCopyEmail();
  return (
    <button className="btn" type="button" onClick={copy}>
      <Icon name="mail" />
      Copy my email
    </button>
  );
}
