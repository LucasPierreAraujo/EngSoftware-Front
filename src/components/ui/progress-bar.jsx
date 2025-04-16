export function ProgressBar({
  backgroundColor = "#76789F",
  color = "#2A2567",
  progress = 0,
  transparent = false
}) {
  const progressBarFillStyle = {
    width: `${progress ?? 0}%`,
    backgroundColor: color,
  };
  const progressBarStyle = {
    backgroundColor: backgroundColor,
  };
  const bgBase = (transparent ? 'transparent' : '#FFFFFF')
  const baseStyle = { 
    backgroundColor: bgBase
  }
  return (
    <div className="w-full h-fit rounded-xl flex items-center justify-between py-2 px-4 gap-5" style={baseStyle}>
      <div
        className="w-full h-2 bg-[#76789F] rounded-full overflow-hidden"
        style={progressBarStyle}
      >
        <div
          className="h-full bg-[#2A2567] rounded-l-full transition-all duration-300"
          style={progressBarFillStyle}
        ></div>
      </div>
      <span>{(progress ?? 0).toFixed(0)}%</span>
    </div>
  );
}
