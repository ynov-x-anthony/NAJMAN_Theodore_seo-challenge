import { useParams } from 'react-router-dom'
import { products } from '../data'
import { useDocumentMeta } from '../useDocumentMeta'

const NOT_FOUND_DESCRIPTION =
  "Ce produit n'existe pas ou n'est plus disponible. Retrouvez toute la gamme CycloShop."

export default function Product() {
  const { slug } = useParams()
  const product = products.find((p) => p.slug === slug)

  const description = product
    ? `${product.description} ${product.name} à ${product.price} € sur CycloShop.`
    : NOT_FOUND_DESCRIPTION

  useDocumentMeta({
    title: product ? `${product.name} | CycloShop` : 'Produit introuvable | CycloShop',
    description,
    ogTitle: product ? `${product.name} - CycloShop` : 'Produit introuvable - CycloShop',
    ogDescription: description,
  })

  if (!product) return <p className="page">Produit introuvable.</p>

  return (
    <div className="page">
      <h1>{product.name}</h1>
      <p className="price">{product.price} €</p>
      <p>{product.description}</p>
    </div>
  )
}