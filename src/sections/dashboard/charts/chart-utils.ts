export interface ChartPoint {
  x: number
  y: number
}

/**
 * Maps a series of values onto SVG coordinates within `width`x`height`,
 * where `max` is the value that should land at `y = 0` (top).
 */
export function toPoints(
  values: number[],
  width: number,
  height: number,
  max: number
): ChartPoint[] {
  if (values.length === 1) {
    return [{ x: width / 2, y: height - (values[0] / max) * height }]
  }
  const step = width / (values.length - 1)
  return values.map((value, index) => ({
    x: index * step,
    y: height - (value / max) * height,
  }))
}

/**
 * Builds a smoothed SVG path (`d` attribute) through `points` using
 * quadratic Bezier segments through midpoints — cheap, dependency-free
 * curve smoothing that avoids the jagged look of straight `L` segments.
 */
export function buildSmoothPath(points: ChartPoint[]): string {
  if (points.length === 0) return ""
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`

  let path = `M ${points[0].x} ${points[0].y}`
  for (let i = 0; i < points.length - 1; i++) {
    const current = points[i]
    const next = points[i + 1]
    const midX = (current.x + next.x) / 2
    const midY = (current.y + next.y) / 2
    path += ` Q ${current.x} ${current.y} ${midX} ${midY}`
  }
  const last = points[points.length - 1]
  path += ` T ${last.x} ${last.y}`
  return path
}

/** Closes a line path into a filled area anchored to the chart's bottom edge. */
export function buildAreaPath(points: ChartPoint[], height: number): string {
  const line = buildSmoothPath(points)
  const first = points[0]
  const last = points[points.length - 1]
  return `${line} L ${last.x} ${height} L ${first.x} ${height} Z`
}
