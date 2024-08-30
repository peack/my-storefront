import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const debounce = <T extends (...args: any[]) => any>(fn: T, delay: number) => {
  let timeoutID: NodeJS.Timeout

  const debouncedFn = (...args: Parameters<T>) => {
    clearTimeout(timeoutID)
    timeoutID = setTimeout(() => fn(...args), delay)
  }

  const cancel = () => {
    clearTimeout(timeoutID)
  }

  return { debouncedFn, cancel }
}
