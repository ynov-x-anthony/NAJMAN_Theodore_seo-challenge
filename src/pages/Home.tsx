import { Link } from 'react-router-dom'
import { products } from '../data'
import { useDocumentMeta } from '../useDocumentMeta'

const DESCRIPTION =
  "Vélo électrique pliable, trottinette tout-terrain, casque connecté : tout l'équipement pour rouler en ville, toute l'année. Découvrez la gamme CycloShop."

export default function Home() {
  useDocumentMeta({
    title: 'Vélo électrique, trottinette et casque connecté | CycloShop',
    description: DESCRIPTION,
    ogTitle: 'Vélo électrique, trottinette, casque connecté - CycloShop',
    ogDescription: DESCRIPTION,
  })

  return (
    <div className="page">
      <h1>CycloShop</h1>
      <ul>
        {products.map((p) => (
          <li key={p.id}><Link to={`/produits/${p.slug}`}>{p.name}</Link></li>
        ))}
      </ul>
    </div>
  )
}