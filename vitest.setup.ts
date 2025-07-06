// vitest.setup.ts

// Polyfill para structuredClone
if (typeof globalThis.structuredClone !== 'function') {
  globalThis.structuredClone = (val: any) => JSON.parse(JSON.stringify(val));
}
