import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


export function hitsToSelectItems(hits, labelField) {
  return hits.map((hit) => ({
    value: hit._id,
    label: hit._source[labelField]
  }));
}