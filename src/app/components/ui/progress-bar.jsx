export function ProgressBar({
  backgroundColor = "#2D3748",
  color = "#F7FAFC",
  progress = 0,
}) {

  const progressBarFillStyle = {
    width: `${progress}%`,
    backgroundColor: color,
  };
  const progressBarStyle = {
    backgroundColor: backgroundColor,
  };
  return (
    <div
      className="w-full h-5 bg-gray-300 rounded-full overflow-hidden"
      style={progressBarStyle}
    >
      <div
        className="h-full rounded-l-full transition-all duration-300"
        style={progressBarFillStyle}
      ></div>
    </div>
  );
}