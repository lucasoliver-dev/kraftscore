'use client'

/**
 * Global animated background used across the app.
 * Orbs + stripes + hex grid.
 */
const AppBackground = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* grid hexagonal */}
      <div className="kbet-hex-grid" />

      {/* orbs */}
      <div className="kbet-orb kbet-orb--orange" />
      <div className="kbet-orb kbet-orb--green" />

      {/* faixas diagonais */}
      <div className="kbet-stripe kbet-stripe--top" />
      <div className="kbet-stripe kbet-stripe--bottom" />
    </div>
  )
}

export default AppBackground
