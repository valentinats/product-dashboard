interface ProgressBarProps {
  isLoading: boolean;
}

export function ProgressBar({ isLoading }: ProgressBarProps) {
  if (!isLoading) return null;

  return (
    <div className="w-full h-1 bg-gray-20 overflow-hidden">
      <div className="h-full bg-accent animate-progress" />
    </div>
  );
}
