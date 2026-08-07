interface BarberPoleProps {
  className?: string
  height?: string
  animated?: boolean
}

export function BarberPole({
  className = '',
  height = 'h-1',
  animated = false,
}: BarberPoleProps) {
  return (
    <div
      className={`${animated ? 'barber-pole-stripe-animated' : 'barber-pole-stripe'} w-full rounded-full ${height} ${className}`}
      aria-hidden="true"
    />
  )
}

/** Mini barber pole icon matching the motion intro */
export function BarberPoleIcon({ className = '', size = 28 }: { className?: string; size?: number }) {
  return (
    <div
      className={`barber-pole-stripe shrink-0 rounded-full shadow-lg shadow-black/40 ${className}`}
      style={{ width: size * 0.42, height: size }}
      aria-hidden="true"
    />
  )
}
