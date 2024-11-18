import React from 'react';

export default function ResultDisplay({ selectedItems, maxGain, complexity, finalMatrix }) {
    return (
        <div className="mt-8 w-full max-w-2xl">
            <h2 className="text-2xl font-semibold text-center">Result</h2>
            <div className="p-4 mt-4 bg-[#2C2C34] rounded-md shadow-md">
                <p className="text-xl mb-2 font-semibold text-green-300">Max Gain: {maxGain}</p>

                <div className="mb-4">
                    <h3 className="text-lg font-semibold text-green-400">Selected Items:</h3>
                    <ul className="ml-4 list-disc text-green-300">
                        {selectedItems.map((item, index) => (
                            <li key={index}>
                                {item.name} (Weight: {item.weight}, Value: {item.value})
                            </li>
                        ))}
                    </ul>
                </div>

                {/* complexity  */}
                <div className="mt-6 bg-[#1E1E24] p-4 rounded-lg text-gray-300">
                    <h3 className="text-lg font-semibold text-center mb-2">
                        Algorithm Complexity
                    </h3>
                    <p className="text-sm">
                        <strong>Time Complexity:</strong> {complexity.time}
                    </p>
                    <p className="text-sm">
                        <strong>Space Complexity:</strong> {complexity.space}
                    </p>
                </div>
            </div>
        </div>
    );
}
