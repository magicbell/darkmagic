import * as React from 'react';

function StatusIcon(props: React.HTMLAttributes<SVGElement>) {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...(props as any)}>
      <path
        d="M2.41016 7.75H5.07682L7.07682 3.75L9.74349 11.75L11.7435 7.75H14.4102"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default StatusIcon;
