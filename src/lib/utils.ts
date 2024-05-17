import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function randstr(prefix: string) {
  return Math.random()
    .toString(36)
    .replace('0.', prefix || '')
}
