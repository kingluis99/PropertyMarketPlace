/**
 * Feature flag helper for Anthony & Co.
 * Evaluates whether the Soundtrack feature is enabled or disabled
 * via the 'SOUNDTRACK_ON' (or 'VITE_SOUNDTRACK_ON') environment variable.
 */

export const isSoundtrackEnabled = (): boolean => {
  // Check client-side Vite environment variable first
  let envVal: any;
  
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    if (import.meta.env.SOUNDTRACK_ON !== undefined) {
      envVal = import.meta.env.SOUNDTRACK_ON;
    } else if (import.meta.env.VITE_SOUNDTRACK_ON !== undefined) {
      envVal = import.meta.env.VITE_SOUNDTRACK_ON;
    }
  }

  // Fallback to process.env if available
  if (envVal === undefined && typeof process !== 'undefined' && process.env) {
    envVal = process.env.SOUNDTRACK_ON ?? process.env.VITE_SOUNDTRACK_ON;
  }

  // Default to enabled if not explicitly specified
  if (envVal === undefined || envVal === null) {
    return true;
  }

  const str = String(envVal).trim().toLowerCase();
  return str !== 'false' && str !== '0' && str !== 'off' && str !== 'disabled';
};
