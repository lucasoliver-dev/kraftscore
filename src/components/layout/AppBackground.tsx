import Image from 'next/image'

export default function AppBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <Image
        src="/images/ksInsights-bg.png"
        alt="KraftScore background"
        fill
        priority
        className="object-cover opacity-80"
      />

      <div className="absolute inset-0 bg-black/45" />

      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/55 to-black/80" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_18%,rgba(249,115,22,0.18),transparent_52%)]" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_35%,rgba(249,115,22,0.10),transparent_60%)]" />
    </div>
  )
}
