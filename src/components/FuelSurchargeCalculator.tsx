import React, { useState } from "react";
import { Card, CardContent } from "./Card";
import { Input } from "./Input";
import { Button } from "./Button";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "./Tooltip";
import { ClipboardCopy } from "lucide-react";

const FuelSurchargeCalculator: React.FC = () => {
  const [dieselPrice, setDieselPrice] = useState<string>("");
  const [surcharge, setSurcharge] = useState<number | null>(null);
  const [tooltipText, setTooltipText] = useState<string>(
    "Kopieer percentage naar het klembord"
  );
  const [tooltipVisible, setTooltipVisible] = useState<boolean>(false);

  const basePrice = 1.5236;
  const priceStep = 0.028;

  const calculateSurcharge = () => {
    const priceDiff = parseFloat(dieselPrice) - basePrice;
    const steps = priceDiff / priceStep;
    const surchargePercentage = Math.round(steps * 100) / 100;
    setSurcharge(surchargePercentage);
  };

  const copyToClipboard = async () => {
    if (surcharge !== null) {
      try {
        await navigator.clipboard.writeText(`${surcharge.toFixed(2)}%`);
        setTooltipText("Percentage gekopieerd naar klembord");
      } catch (error) {
        setTooltipText("Kopiëren mislukt");
      }
      setTooltipVisible(false);
      setTimeout(() => setTooltipVisible(true), 100);
      setTimeout(() => setTooltipVisible(false), 3000);
    }
  };

  return (
    <TooltipProvider>
      <div className="flex flex-col items-center justify-center p-4">
        <Card className="max-w-sm w-full">
          <CardContent>
            <h2 className="text-xl font-semibold mb-4">
              Brandstoftoeslag Calculator
            </h2>
            <p className="mb-4 text-sm">
              De basisprijs van diesel was op 1 februari 2022 € 1,5236 per liter
              (excl. BTW). Iedere keer dat de dieselprijs met € 0,028 per liter
              stijgt, komt er 1% toeslag bij.
            </p>
            <Input
              type="number"
              placeholder="Voer dieselprijs in (€)"
              value={dieselPrice}
              onChange={(e) => setDieselPrice(e.target.value)}
              className="mb-4"
              step="0.0001"
            />
            <Button onClick={calculateSurcharge} className="w-full mb-4">
              Bereken Toeslag
            </Button>
            {surcharge !== null && (
              <div className="text-lg font-medium flex items-center">
                <p className="mr-2">
                  Brandstoftoeslag: {surcharge.toFixed(2)}%
                </p>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      className="p-1"
                      onClick={copyToClipboard}
                      aria-label="Kopieer percentage"
                    >
                      <ClipboardCopy className="w-5 h-5 text-gray-600 hover:text-black" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>{tooltipText}</TooltipContent>
                </Tooltip>
              </div>
            )}
            {surcharge !== null && (
              <p className="text-sm mt-2">
                Berekening: (({dieselPrice} - 1.5236) / 0.028) * 1% ={" "}
                {surcharge.toFixed(2)}%
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
};

export default FuelSurchargeCalculator;
