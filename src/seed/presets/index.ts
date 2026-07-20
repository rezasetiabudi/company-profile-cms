/**
 * Seed preset registry.
 *
 * Each preset provides a complete set of example content for one type of business.
 * To add a new preset, create a file in this directory and add it to the `presets` map below.
 */

import type { SeedPreset } from './types'
import { genericPreset } from './generic'
import { hospitalPreset } from './hospital'
import { constructionPreset } from './construction'

export const presets: Record<string, SeedPreset> = {
  generic: genericPreset,
  hospital: hospitalPreset,
  construction: constructionPreset,
}

export function getPreset(name: string): SeedPreset {
  const preset = presets[name]
  if (!preset) {
    throw new Error(
      `Unknown preset "${name}". Available presets: ${Object.keys(presets).join(', ')}`
    )
  }
  return preset
}

export function listPresets(): Array<{ name: string; label: string; description: string }> {
  return Object.values(presets).map((p) => ({
    name: p.name,
    label: p.label,
    description: p.description,
  }))
}
