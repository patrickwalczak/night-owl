export const BREAKPOINTS = [480, 768, 1024, 1280, 1536, 1920] as const;

export type Breakpoint = (typeof BREAKPOINTS)[number];

export const WIDE_BREAKPOINT: Breakpoint = 1024;
