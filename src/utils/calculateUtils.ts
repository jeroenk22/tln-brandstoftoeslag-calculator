// utils/calculateUtils.ts

const basePrice = 1.5236;
const priceStep = 0.028;

export const calculateSurchargePercentage = (dieselPrice: string): number => {
  const priceDiff = parseFloat(dieselPrice) - basePrice;
  const steps = priceDiff / priceStep;
  const surchargePercentage = Math.round(steps * 100) / 100;

  // Zorg ervoor dat de toeslag niet negatief is
  return surchargePercentage < 0 ? 0 : surchargePercentage;
};
