# SSR_SSG.md : à compléter

Pour CE catalogue (quelques dizaines de produits, mis à jour occasionnellement) :

1. Choisirais-tu plutôt du SSR, du SSG, ou du pré-rendu ? Justifie en une
   ou deux phrases en t'appuyant sur la fréquence de mise à jour du contenu.

    **SSG.** Le catalogue change rarement, donc on peut générer le HTML de chaque fiche une fois au build (avec le bon `<title>`, les `og:*` et le contenu) et le servir tel quel : c'est le plus rapide, le moins coûteux, et le crawler reçoit une page pleine sans exécuter de JS. Une mise à jour du catalogue se traduit simplement par un nouveau build. Le pré-rendu n'aurait de sens que pour migrer progressivement une SPA existante, et le SSR ferait payer à chaque requête un rendu dont le résultat ne change presque jamais.

2. Si demain ce site affichait un **stock en temps réel** (quantité
   disponible qui change à chaque commande), ce choix changerait-il ? Pourquoi ?

   **Oui, pour cette donnée-là.** Une page SSG est figée au moment du build : elle afficherait un stock périmé dès la première commande. Pour afficher la quantité exacte dans le HTML, il faudrait du SSR (rendu à chaque requête, au prix d'un serveur et d'un temps de réponse plus long). Mais on peut aussi rester sur un mode mixte : garder le SSG pour tout le contenu stable (nom, description, meta, `og:*`, ce qui compte pour le référencement) et charger le stock côté client via une API, puisque la quantité exacte n'a pas besoin d'être lue par un crawler. Dans tous les cas, c'est le contenu qui change à chaque requête qui détermine le mode de rendu, route par route, et pas le site entier.
