export const chartData = [
    { month: 'January', desktop: 4000 },
    { month: 'February', desktop: 3000 },
    { month: 'March', desktop: 2000 },
    { month: 'April', desktop: 2780 },
    { month: 'May', desktop: 1890 },
    { month: 'June', desktop: 2390 },
    { month: 'July', desktop: 3490 },
  ];
  
  export const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-1))",
    },
  };
  
  export function getLineColor(value: number) {
    return value > 3000 ? "hsl(var(--chart-1))" : "hsl(var(--chart-2))";
  }
  
  