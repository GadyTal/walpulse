interface ArrowProps {
  className?: string;
}

export const UpArrow = ({ className }: ArrowProps) => (
  <svg 
    width="10" 
    height="11" 
    viewBox="0 0 10 11" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path 
      d="M9.04466 3.49831L5.99882 0.459564C5.73339 0.195708 5.37434 0.0476074 5.00007 0.0476074C4.62581 0.0476074 4.26675 0.195708 4.00132 0.459564L0.95549 3.49831C0.823562 3.63103 0.749512 3.81056 0.749512 3.99769C0.749512 4.18482 0.823562 4.36435 0.95549 4.49706C1.02134 4.56345 1.09968 4.61615 1.186 4.65211C1.27231 4.68807 1.3649 4.70659 1.45841 4.70659C1.55191 4.70659 1.6445 4.68807 1.73082 4.65211C1.81713 4.61615 1.89547 4.56345 1.96132 4.49706L4.29174 2.16665V9.95831C4.29174 10.1462 4.36637 10.3263 4.49921 10.4592C4.63204 10.592 4.81221 10.6666 5.00007 10.6666C5.18794 10.6666 5.3681 10.592 5.50094 10.4592C5.63378 10.3263 5.70841 10.1462 5.70841 9.95831V2.16665L8.03882 4.49706C8.17127 4.63045 8.35127 4.70575 8.53924 4.70642C8.7272 4.70708 8.90773 4.63305 9.04112 4.50061C9.1745 4.36816 9.2498 4.18816 9.25047 4.00019C9.25113 3.81223 9.1771 3.6317 9.04466 3.49831V3.49831Z" 
      fill="currentColor"
    />
  </svg>
); 