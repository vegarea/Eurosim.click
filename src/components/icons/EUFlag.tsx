const EUFlag = ({ className = "" }: { className?: string }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 810 540"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="810" height="540" fill="#003399"/>
      <g>
        {[...Array(12)].map((_, i) => (
          <path
            key={i}
            d="M405 95.1L419.9 141.2L468.3 141.2L428.9 170.6L443.8 216.7L405 187.3L366.2 216.7L381.1 170.6L341.7 141.2L390.1 141.2L405 95.1Z"
            fill="#FFCC00"
            transform={`rotate(${i * 30} 405 270)`}
          />
        ))}
      </g>
    </svg>
  );
};

export default EUFlag;