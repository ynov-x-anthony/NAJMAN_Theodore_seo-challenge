import { Link, useParams } from 'react-router-dom'
import { products } from '../data'
import { useDocumentMeta } from '../useDocumentMeta'

export default function Product() {
  const { slug } = useParams()
  const product = products.find((p) => p.slug === slug)

  useDocumentMeta({
    title: product ? `${product.name} | CycloShop` : 'Produit introuvable | CycloShop',
    description: product
      ? `${product.description} ${product.name} à ${product.price} € sur CycloShop.`
      : "Ce produit n'existe pas ou n'est plus disponible. Retrouvez toute la gamme CycloShop.",
  })

  if (!product) return <p className="page">Produit introuvable.</p>

  const similar = products.filter((p) => p.id !== product.id)

  return (
    <div className="page">
      <h1>{product.name}</h1>
      <p className="price">{product.price} €</p>
      <p>{product.description}</p>

      <section aria-labelledby="similar-title">
        <h2 id="similar-title">Produits similaires</h2>
        <ul>
          {similar.map((p) => (
            <li key={p.id}>
              <Link to={`/produits/${p.slug}`}>{p.name}</Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}