import Image from 'next/image'

export default function AppBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <Image
        src="/images/ksInsights-bg.png"
        alt="KraftScore background"
        fill
        priority
        className="object-cover"
      />

      {/* Overlay escuro para garantir legibilidade */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Glow suave laranja (opcional) */}
      <div className="absolute inset-0 bg-gradient-to-b from-orange-500/10 via-transparent to-black/70" />
    </div>
  )
}
