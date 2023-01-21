function extractAlphaChannel(color: string): [string, number] {
  const hasAlpha = color.length === 9
  const colorWithoutAlpha = hasAlpha ? color.substring(0, 7) : color
  const existingAlpha = hasAlpha ? parseInt(color.substr(-2), 16) : 0xff
  return [colorWithoutAlpha, existingAlpha]
}

export function opacify(color: string, opacity: number) {
  if (color.length !== 7 && color.length !== 9) {
    throw new Error(`${color} is not a valid hex color string. It should be in one of these formats: #RRGGBB or #RRGGBBAA`)
  }

  const [colorWithoutAlpha, existingAlpha] = extractAlphaChannel(color)
  const boundedOpacity = Math.max(0, Math.min(opacity, 1))
  const newOpacity = Math.round(existingAlpha * boundedOpacity).toString(16)
  return `${colorWithoutAlpha}${String(newOpacity).padStart(2, '0')}`
}
