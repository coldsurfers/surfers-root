export declare global {
  interface Window {
    __theme: string
    __setPreferredTheme: (theme: string) => void
  }
}
