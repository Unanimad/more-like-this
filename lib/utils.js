import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


export function hitsToSelectItems(hits) {
  return hits.map((hit) => ({
    label: hit._source.nome_completo,
    value: hit._id
  }));
}