const MexicoFlag = ({ className = "" }: { className?: string }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0" y="0" width="8" height="16" fill="#006847" />
      <rect x="8" y="0" width="8" height="16" fill="#FFFFFF" />
      <rect x="16" y="0" width="8" height="16" fill="#CE1126" />
      <circle cx="12" cy="8" r="2.5" fill="#C09300" />
    </svg>
  );
};

export default MexicoFlag;