"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPackage, FiPlus } from 'react-icons/fi';

const KnapsackForm = ({ onSubmit }) => {
    const [capacity, setCapacity] = useState('');
    const [items, setItems] = useState([]);
    const [weight, setWeight] = useState('');
    const [value, setValue] = useState('');
    const [name, setName] = useState('');

    const handleAddItem = () => {
        if (!weight || !value || !name) return;
        setItems([...items, { name, weight: parseInt(weight), value: parseInt(value) }]);
        setWeight('');
        setValue('');
        setName('');
    };

    const handleSubmit = () => {
        onSubmit({ capacity: parseInt(capacity), items });
    };

    return (
        <motion.div
            className="p-6 bg-[#3B1C32] rounded-md shadow-lg w-full max-w-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            <h2 className="text-lg font-semibold mb-4 text-white">Knapsack Setup</h2>
            <input
                type="number"
                placeholder="Knapsack Capacity"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                className="mb-4 p-2 rounded w-full bg-[#6A1E55] text-white"
            />
            <div className="flex items-center mb-4">
                <input
                    type="text"
                    placeholder="Item Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mr-2 p-2 rounded bg-[#6A1E55] text-white"
                />
                <input
                    type="number"
                    placeholder="Weight"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="mr-2 p-2 rounded bg-[#6A1E55] text-white"
                />
                <input
                    type="number"
                    placeholder="Value"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="mr-2 p-2 rounded bg-[#6A1E55] text-white"
                />
                <motion.button
                    onClick={handleAddItem}
                    className="p-2 bg-[#F0C1E1] text-[#1A1A1D] rounded flex items-center"
                    whileHover={{ scale: 1.1 }}
                >
                    <FiPlus className="mr-1" /> Add Item
                </motion.button>
            </div>

            {/* Display list of added items */}
            {items.length > 0 && (
                <ul className="mb-4 pl-4 text-white">
                    {items.map((item, index) => (
                        <li key={index} className="text-gray-300">
                            {item.name} - Weight: {item.weight}, Value: {item.value}
                        </li>
                    ))}
                </ul>
            )}

            <motion.button
                onClick={handleSubmit}
                className="p-2 bg-[#F0C1E1] text-[#1A1A1D] rounded w-full"
                whileHover={{ scale: 1.05 }}
            >
                Calculate
            </motion.button>
        </motion.div>
    );
};

export default KnapsackForm;
