/** Shared handle to the Lenis instance so UI (menus, anchors) can control scrolling. */
import type Lenis from "lenis";

export const scrollApi: { lenis: Lenis | null } = { lenis: null };

export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
export const DESKTOP_MOTION = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";
