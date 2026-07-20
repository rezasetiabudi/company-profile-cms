/**
 * Color utility: converts a hex color to an OKLCH color scale (50-950)
 * for use as CSS custom properties.
 *
 * This allows the entire color palette to be derived from a single
 * hex value set in .env, making the template truly themeable per-deployment.
 */

// Parse hex to RGB
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  hex = hex.replace(/^#/, '')
  if (hex.length === 3) {
    hex = hex.split('').map((c) => c + c).join('')
  }
  const num = parseInt(hex, 16)
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  }
}

// Convert RGB to OKLCH (simplified perceptual scale)
// Returns lightness values for the color scale
function rgbToLightness(r: number, g: number, b: number): number {
  // Approximate perceptual lightness
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255
}

// Generate an OKLCH color scale from a base hex color
export function generateColorScale(hex: string): Record<string, string> {
  const { r, g, b } = hexToRgb(hex)
  const baseLightness = rgbToLightness(r, g, b)

  // Calculate chroma approximation
  const max = Math.max(r, g, b) / 255
  const min = Math.min(r, g, b) / 255
  const chroma = (max - min) * 0.5

  // Generate lightness stops (50 = very light, 950 = very dark)
  const lightnessStops = {
    50: Math.min(0.97, baseLightness + 0.85),
    100: Math.min(0.93, baseLightness + 0.65),
    200: Math.min(0.86, baseLightness + 0.45),
    300: Math.min(0.75, baseLightness + 0.25),
    400: Math.min(0.62, baseLightness + 0.08),
    500: Math.min(0.50, baseLightness + 0.0),
    600: Math.max(0.42, baseLightness - 0.08),
    700: Math.max(0.34, baseLightness - 0.18),
    800: Math.max(0.26, baseLightness - 0.32),
    900: Math.max(0.18, baseLightness - 0.48),
    950: Math.max(0.12, baseLightness - 0.62),
  }

  const chromaStops = {
    50: chroma * 0.1,
    100: chroma * 0.2,
    200: chroma * 0.4,
    300: chroma * 0.6,
    400: chroma * 0.8,
    500: chroma,
    600: chroma * 0.9,
    700: chroma * 0.8,
    800: chroma * 0.6,
    900: chroma * 0.4,
    950: chroma * 0.2,
  }

  // Calculate hue from RGB
  const rf = r / 255, gf = g / 255, bf = b / 255
  const cmax = Math.max(rf, gf, bf), cmin = Math.min(rf, gf, bf)
  let hue = 0
  if (cmax !== cmin) {
    const delta = cmax - cmin
    if (cmax === rf) hue = (((gf - bf) / delta) % 6) * 60
    else if (cmax === gf) hue = (((bf - rf) / delta) + 2) * 60
    else hue = (((rf - gf) / delta) + 4) * 60
    if (hue < 0) hue += 360
  }

  // Map 0-360 hue to OKLCH hue (0-360, same range)
  // OKLCH hue is similar to HSL hue
  const oklchHue = hue > 180 ? 360 - (360 - hue) / 2 : hue / 2

  const scale: Record<string, string> = {}
  for (const [stop, lightness] of Object.entries(lightnessStops)) {
    const c = Math.min(0.15, chromaStops[stop as unknown as keyof typeof chromaStops])
    const l = Math.max(0.1, Math.min(0.98, lightness))
    scale[stop] = `oklch(${l.toFixed(2)} ${c.toFixed(3)} ${oklchHue.toFixed(0)})`
  }

  return scale
}

// Generate CSS custom property declarations for a color scale
export function generateColorCSS(customPropBase: string, scale: Record<string, string>): string {
  return Object.entries(scale)
    .map(([stop, value]) => `  --${customPropBase}-${stop}: ${value};`)
    .join('\n')
}
