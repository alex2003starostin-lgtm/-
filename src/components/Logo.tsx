const GRADIENT_ID = 'gtdesk-logo-gradient'

export function LogoMark({ size = 32, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={GRADIENT_ID} x1="4" y1="2" x2="36" y2="38" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4dabff" />
          <stop offset="1" stopColor="#0040dd" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="11" fill={`url(#${GRADIENT_ID})`} />
      <text
        x="20"
        y="21.5"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Display', Inter, Helvetica, Arial, sans-serif"
        fontWeight="700"
        fontSize="17"
        letterSpacing="-0.5"
        fill="white"
      >
        GT
      </text>
    </svg>
  )
}

export default function Logo({
  size = 32,
  withWordmark = false,
  wordmarkClassName = '',
}: {
  size?: number
  withWordmark?: boolean
  wordmarkClassName?: string
}) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <LogoMark size={size} />
      {withWordmark && <span className={`font-semibold tracking-tight ${wordmarkClassName}`}>GTDesk</span>}
    </span>
  )
}
