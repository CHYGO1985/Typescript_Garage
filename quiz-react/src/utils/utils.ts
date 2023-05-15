// randomly sort fan >0 or fan<0 the answers in the quiz
export const shuffleArray = (array: any[]) =>
  [...array].sort(() => Math.random() - 0.5)
