export function ProgressBar({
  backgroundColor = "#76789F",
  color = "#2A2567",
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
    <div className="w-full h-fit rounded-xl bg-white flex items-center justify-between py-2 px-4 gap-5">
      <div
        className="w-full h-2 bg-[#76789F] rounded-full overflow-hidden"
        style={progressBarStyle}
      >
        <div
          className="h-full bg-[#2A2567] rounded-l-full transition-all duration-300"
          style={progressBarFillStyle}
        ></div>
      </div>
      <span>{progress.toFixed(0)}%</span>
    </div>
  );
}
