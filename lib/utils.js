import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function hitsToSelectItems(hits, labelField) {
  return hits.map((hit) => ({
    value: hit._id,
    label: hit._source[labelField]
  }));
}

export function formatDate(isoDate) {
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() returns 0-11, so add 1
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}