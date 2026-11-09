import { useEffect, useRef, useState } from 'react'
import './App.css'

const HERO = "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Crect width='800' height='400' fill='%231a5fa8'/%3E%3Ctext x='400' y='210' font-size='28' fill='white' text-anchor='middle'%3EVélo électrique pliable%3C/text%3E%3C/svg%3E"

const TOTAL_ITERATIONS = 400_000_000
const SLICE_BUDGET_MS = 25
const CHECK_EVERY = 100_000

export default function App() {
  const [showBanner, setShowBanner] = useState(false)
  const [points, setPoints] = useState<number | null>(null)
  const [computing, setComputing] = useState(false)
  const alive = useRef(true)

  useEffect(() => {
    alive.current = true
    return () => {
      alive.current = false
    }
  }, [])

  useEffect(() => {
    const t = setTimeout(() => setShowBanner(true), 1200)
    return () => clearTimeout(t)
  }, [])

  function calculerPoints() {
    if (computing) return
    setComputing(true)
    setPoints(null)

    let total = 0
    let i = 0

    function step() {
      if (!alive.current) return
      const start = performance.now()
      let t = total
      let k = i
      while (k < TOTAL_ITERATIONS && performance.now() - start < SLICE_BUDGET_MS) {
        const end = Math.min(k + CHECK_EVERY, TOTAL_ITERATIONS)
        for (; k < end; k++) t += Math.sqrt(k) % 7
      }
      total = t
      i = k
      if (i < TOTAL_ITERATIONS) {
        setTimeout(step, 0)
      } else {
        setPoints(Math.round(total % 1000))
        setComputing(false)
      }
    }

    requestAnimationFrame(() => setTimeout(step, 0))
  }

  return (
    <div className="page">
      {/* Toujours dans le flux : son espace est réservé dès le départ, il
          apparaît par opacité au lieu de pousser le contenu. */}
      <div className={showBanner ? 'banner' : 'banner banner-hidden'}>
        🎉 Livraison offerte ce week-end !
      </div>

      <h1>CycloShop</h1>

      {/* width/height : le navigateur réserve l'espace avant le décodage de l'image */}
      <img src={HERO} alt="Vélo électrique pliable" width={800} height={400} />

      <p>Le vélo électrique pliable le plus vendu de la boutique.</p>

      {/* aria-disabled plutôt que disabled : le bouton garde le focus clavier */}
      <button onClick={calculerPoints} aria-disabled={computing}>
        {computing ? 'Calcul en cours…' : 'Calculer mes points fidélité'}
      </button>
      {points !== null && <p>Tu as {points} points fidélité.</p>}
    </div>
  )
}