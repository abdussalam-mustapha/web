import type { Metadata } from "next";
import type { PageId } from "@/data/types";
import { TITLES } from "@/data/routes";

export const meta = (id: PageId, description?: string): Metadata => ({ title: TITLES[id], ...(description ? { description } : {}) });
