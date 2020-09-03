export function parseVariation(variation: string) {
  if (variation === 'NA' || !variation.includes('_')) {
    return ''.padStart(8, '0')
  }
  if (variation.includes('_')) {
    const [v1, v2] = variation.split('_')
    const parsedV2 = parseInt(v2, 10)
    return `${parsedV2*2}${v1}`.padStart(8, '0')
  }
  return "XXXXXXXX"
}