import { useState, useCallback } from 'react';

interface AffordabilityCalculator {
  income: number;
  setIncome: (value: number) => void;
  maxBudget: number;
}

export function useAffordabilityCalculator(initialIncome = 6500): AffordabilityCalculator {
  const [income, setIncomeState] = useState<number>(initialIncome);

  const setIncome = useCallback((value: number) => {
    setIncomeState(value);
  }, []);

  const maxBudget = Math.round(income * 0.3);

  return { income, setIncome, maxBudget };
}
