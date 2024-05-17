export function randstr(prefix: string) {
  return Math.random()
    .toString(36)
    .replace('0.', prefix || '')
}
