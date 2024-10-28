export const interpolateGradient = (factor: number): string => {
  const startIncorrect = [241, 180, 150]
  const endIncorrect = [234, 128, 106]

  const startIncorrectUpper = [234, 216, 128]
  const endIncorrectUpper = [235, 163, 65]

  const startCorrect = [118, 224, 194]
  const endCorrect = [89, 202, 218]

  const interpolate = (start: number[], end: number[], factor: number) =>
    start.map((startValue, index) =>
      Math.round(startValue + factor * (end[index] - startValue))
    )

  const [r1, g1, b1] =
    factor < 1
      ? interpolate(startIncorrect, startIncorrectUpper, factor)
      : startCorrect
  const [r2, g2, b2] =
    factor < 1
      ? interpolate(endIncorrect, endIncorrectUpper, factor)
      : endCorrect

  return `linear-gradient(to bottom, rgb(${r1}, ${g1}, ${b1}), rgb(${r2}, ${g2}, ${b2}))`
}
