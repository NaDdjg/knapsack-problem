"use client";

import React, { useState } from 'react';
import KnapsackForm from './components/KnapsackForm';
import ResultDisplay from './components/ResultDisplay';

const knapsack = (capacity, items, setFinalMatrix) => {
  const dp = Array(items.length + 1)
    .fill(0)
    .map(() => Array(capacity + 1).fill(0));

  const dpItems = Array(items.length + 1)
    .fill(null)
    .map(() => Array(capacity + 1).fill(null));

  for (let i = 1; i <= items.length; i++) {
    for (let w = 1; w <= capacity; w++) {
      if (items[i - 1].weight <= w) {
        const includeItemValue =
          items[i - 1].value + dp[i - 1][w - items[i - 1].weight];
        const excludeItemValue = dp[i - 1][w];

        if (includeItemValue > excludeItemValue) {
          dp[i][w] = includeItemValue;
          dpItems[i][w] = items[i - 1].name;
        } else {
          dp[i][w] = excludeItemValue;
        }
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }

  setFinalMatrix({ values: dp, items: dpItems });

  const selectedItems = [];
  let w = capacity;
  for (let i = items.length; i > 0 && w > 0; i--) {
    if (dp[i][w] !== dp[i - 1][w]) {
      selectedItems.push(items[i - 1]);
      w -= items[i - 1].weight;
    }
  }

  return { maxGain: dp[items.length][capacity], selectedItems };
};

export default function Home() {
  const [result, setResult] = useState(null);
  const [finalMatrix, setFinalMatrix] = useState(null);

  const handleFormSubmit = ({ capacity, items }) => {
    setFinalMatrix(null);
    const solution = knapsack(capacity, items, setFinalMatrix);

    const complexity = {
      time: `O(${items.length} * ${capacity})`,
      space: `O(${items.length} * ${capacity})`,
    };

    setResult({ ...solution, complexity });
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 min-h-screen bg-[#1A1A1D] text-white">
      <h1 className="text-2xl font-bold mb-6">Knapsack Problem Solver</h1>
      <KnapsackForm onSubmit={handleFormSubmit} />
      {result && (
        <>
          <ResultDisplay
            selectedItems={result.selectedItems}
            maxGain={result.maxGain}
            complexity={result.complexity}
          />

          {finalMatrix && (
            <div className="mt-6 w-full">
              <h3 className="text-xl font-semibold text-center">Final Matrix State</h3>
              <table className="table-fixed w-full text-center mt-4">
                <tbody>
                  {finalMatrix.values.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((value, colIndex) => (
                        <td
                          key={colIndex}
                          className={`px-4 py-2 border min-w-[60px] text-base ${value > 0 ? 'bg-green-600' : 'bg-gray-800'}`}
                        >
                          {value > 0 ? (
                            <span className="block text-white">
                              {value}
                            </span>
                          ) : (
                            <span className="block text-gray-500">0</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}