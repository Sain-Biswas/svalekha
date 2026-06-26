import { clsx } from "clsx";
import type { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * A utility enabling merger of multiple classes and use tailwind classes conditionally in react components.
 *
 * Uses `tailwind-merge` and `clsx`
 */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
