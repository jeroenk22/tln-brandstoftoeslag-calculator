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
import { calculateSurchargePercentage } from "../utils/calculateUtils";

const FuelSurchargeCalculator: React.FC = () => {
  const [dieselPrice, setDieselPrice] = useState<string>("");
  const [surcharge, setSurcharge] = useState<number | null>(null);
  const [tooltipText, setTooltipText] = useState<string>(
    "Kopieer percentage naar het klembord"
  );
  const [tooltipVisible, setTooltipVisible] = useState<boolean>(false);

  const calculateSurcharge = () => {
    if (dieselPrice.trim() !== "") {
      const surchargePercentage = calculateSurchargePercentage(dieselPrice);
      setSurcharge(surchargePercentage);
    }
  };

  const copyToClipboard = async () => {
    if (surcharge !== null) {
      try {
        // Zet de toeslag om naar een string en vervang de punt door een komma
        const formattedSurcharge = surcharge.toFixed(2).replace(".", ",");
        await navigator.clipboard.writeText(formattedSurcharge);
        setTooltipText("Gekopieerd!");
      } catch (error) {
        setTooltipText("Kopiëren mislukt");
      }

      // Maak de tooltip zichtbaar
      setTooltipVisible(true);

      // Zet de tooltip na 1,5 seconden weer uit
      setTimeout(() => setTooltipVisible(false), 1000);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDieselPrice(value);

    // Reset de surcharge wanneer het veld leeg is
    if (value.trim() === "") {
      setSurcharge(null);
    }
  };

  return (
    <TooltipProvider>
      <div className="flex flex-col items-center justify-center p-4">
        <Card className="max-w-sm w-full">
          <CardContent>
            <h2 className="text-xl font-semibold mb-4">
              TLN Brandstoftoeslag Calculator
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
              onChange={handleInputChange}
              className="mb-4"
              step="0.0001"
            />
            <Button onClick={calculateSurcharge} className="w-full mb-4">
              Bereken Toeslag
            </Button>
            {surcharge !== null && dieselPrice.trim() !== "" && (
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
                  {tooltipVisible && (
                    <TooltipContent>{tooltipText}</TooltipContent>
                  )}
                </Tooltip>
              </div>
            )}
            {surcharge !== null && dieselPrice.trim() !== "" && (
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
