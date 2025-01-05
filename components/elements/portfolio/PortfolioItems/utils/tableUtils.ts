const generateRandomData = (baseValue: number, range: number, length: number) => {
    return Array.from({ length }, () => baseValue + Math.random() * range - range / 2);
};

export const createTableData = (period: string, currency: string) => [
    { id: 1, token: currency.toUpperCase(), price: `$${(Math.random() * 100).toFixed(2)}`, change: `${(Math.random() * 10 - 5).toFixed(2)}%`, market: `+${(Math.random() * 500).toFixed(2)} ${currency.toUpperCase()}`, graphData: generateRandomData(50, 10, 7), graphColor: '#EF4444' },
    { id: 2, token: 'Bcoin', price: `$${(Math.random() * 100).toFixed(2)}`, change: `${(Math.random() * 10 - 5).toFixed(2)}%`, market: `+${(Math.random() * 500).toFixed(2)} Bcoin`, graphData: generateRandomData(15, 5, 7), graphColor: '#10B981' },
    { id: 3, token: 'Ecoin', price: `$${(Math.random() * 100).toFixed(2)}`, change: `${(Math.random() * 10 - 5).toFixed(2)}%`, market: `+${(Math.random() * 500).toFixed(2)} Ecoin`, graphData: generateRandomData(25, 8, 7), graphColor: '#EF4444' },
    { id: 4, token: 'Gcoin', price: `$${(Math.random() * 100).toFixed(2)}`, change: `${(Math.random() * 10 - 5).toFixed(2)}%`, market: `+${(Math.random() * 500).toFixed(2)} Gcoin`, graphData: generateRandomData(75, 15, 7), graphColor: '#10B981' },
    { id: 5, token: 'Lcoin', price: `$${(Math.random() * 100).toFixed(2)}`, change: `${(Math.random() * 10 - 5).toFixed(2)}%`, market: `+${(Math.random() * 500).toFixed(2)} Lcoin`, graphData: generateRandomData(30, 10, 7), graphColor: '#EF4444' },
];

