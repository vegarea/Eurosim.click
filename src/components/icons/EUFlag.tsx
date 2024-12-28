const EUFlag = ({ className = "" }: { className?: string }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 810 540"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="810" height="540" fill="#003399"/>
      <g transform="translate(405, 270)">
        {[...Array(12)].map((_, i) => {
          const angle = (i * 30) * Math.PI / 180;
          const x = Math.cos(angle) * 150;
          const y = Math.sin(angle) * 150;
          return (
            <path
              key={i}
              d="M0,-50 L14.8,-15.4 L52.4,-15.4 L23.8,5.9 L38.6,40.5 L0,19.1 L-38.6,40.5 L-23.8,5.9 L-52.4,-15.4 L-14.8,-15.4 Z"
              fill="#FFCC00"
              transform={`translate(${x}, ${y})`}
            />
          );
        })}
      </g>
    </svg>
  );
};

export default EUFlag;