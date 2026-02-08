interface StockIndicatorProps {
  stock: number;
}

export function StockIndicator({ stock }: StockIndicatorProps) {
  const level = stock === 0 ? 0 : stock <= 10 ? 1 : stock <= 50 ? 2 : 3;

  return (
    <div className="flex gap-[2px] justify-center">
      {[1, 2, 3].map((bar) => (
        <div
          key={bar}
          className={`w-[6px] h-[18px] rounded-md ${bar <= level ? "bg-gray-105" : "bg-gray-110"}`}
        />
      ))}
    </div>
  );
}
