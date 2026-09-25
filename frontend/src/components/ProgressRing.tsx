interface ProgressRingProps {
  completions: number;
  goal?: number;
  size?: number;
  strokeWidth?: number;
}

function ProgressRing({
  completions,
  goal = 66,
  size = 72,
  strokeWidth = 8,
}: ProgressRingProps) {
  const percentage = Math.min(completions / goal, 1) * 100;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <svg
      className="progress-ring"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
    >
      <circle
        className="progress-ring-track"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={strokeWidth}
        fill="none"
      />
      <circle
        className="progress-ring-fill"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text
        className="progress-ring-label"
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="central"
      >
        {completions}/{goal}
      </text>
    </svg>
  );
}

export default ProgressRing;
