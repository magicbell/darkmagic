import * as React from 'react';

export function ChartIcon(props: React.HTMLAttributes<SVGElement>) {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" {...(props as any)}>
      <path
        d="M5.5 13.5V7.5M1.5 13.5V5.5M9.5 13.5V1.5M13.5 13.5C13.5 9.59476 13.5 7.40524 13.5 3.5"
        stroke="currentColor"
        strokeLinecap="round"
      />
    </svg>
  );
}
