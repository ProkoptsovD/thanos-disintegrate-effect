export const getWightedPeakDistibution = (peak, canvasCount) => {
  const prob = [];
  const seq = [];

  for (let i = 0; i < canvasCount; i++) {
    prob.push(Math.pow(canvasCount - Math.abs(peak - i), 3));
    seq.push(i);
  }

  return chance.weighted(seq, prob);
};
