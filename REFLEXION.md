# REFLEXION.md

1. `robots.txt` empêche-t-il, à lui seul, le duplicate content entre
   `/produits?tri=prix` et `/produits?tri=prix-asc` ? Pourquoi ?

   **Non.** `robots.txt` agit sur l'exploration (le crawl), pas sur le choix de l'URL à indexer. Ici, les deux URLs doivent rester accessibles, car ce sont deux liens de tri légitimes pour l'utilisateur, donc aucune règle `Disallow` ne les concerne. Même si on en bloquait une, ça ne réglerait rien : une URL interdite au crawl peut quand même apparaître dans les résultats si un lien pointe vers elle, et Google ne pourrait plus lire la page pour comprendre qu'elle est un doublon de l'autre. Le problème est un problème d'indexation (deux URLs pour un même contenu), pas d'exploration.

2. Pourquoi la balise canonique est-elle l'outil adapté ici, plutôt que
   `robots.txt` ou une meta `noindex` ?

   Parce qu'elle dit à Google « ces URLs affichent la même chose, la version de référence est celle-ci », sans rien retirer à l'utilisateur. Google peut explorer les deux variantes, comprendre qu'elles sont équivalentes, et regrouper les signaux de classement (liens entrants, etc.) sur la seule URL canonique.
   - `robots.txt` bloquerait l'exploration, donc Google ne verrait jamais la relation entre les deux pages.
   - `noindex` retirerait une page de l'index sans reporter ses signaux sur l'autre, et c'est un outil radical : une erreur de config peut faire disparaître les deux URLs des résultats. Il sert à exclure une page de l'index, pas à désigner laquelle de deux pages équivalentes garder.

3. Si demain `/admin` existe sur ce site et ne doit jamais être exploré par
   Google, quelle ligne ajoutes-tu dans `robots.txt` ?

   `Disallow: /admin`, sous `User-agent: *` (c'est déjà la ligne présente dans `public/robots.txt`). Elle bloque `/admin` et tout ce qui commence par ce chemin. Deux limites à garder en tête : cette règle n'empêche pas forcément l'indexation de l'URL seule si un lien externe y mène, et `robots.txt` est public, donc il ne protège rien. La vraie protection d'un espace admin, c'est l'authentification.