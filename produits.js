// ======================================================================
// CATALOGUE DE LA BOUTIQUE SAG
// Chaque produit peut recevoir, en plus de son nom :
//   desc     : description et caractéristiques techniques
//   marque   : marque du produit
//   prix     : prix de vente en F CFA (sans espace). Sans prix => « Prix sur demande »
//   prixGros : prix de gros en F CFA, et minGros : quantité minimum pour l'obtenir
//   stock    : "En stock", "Sur commande" ou "Rupture"
//   image    : chemin de la photo, par exemple "images/produits/fil-1-5.jpg"
// Exemple :
//   { nom: "Fil électrique 1,5 mm²", marque: "…", prix: 12000, prixGros: 11000, minGros: 10,
//     stock: "En stock", image: "images/produits/fil-1-5.jpg", desc: "Rouleau de 100 m" },
// ======================================================================
const CATALOGUE = [
 {
  "id": "electricite",
  "nom": "Matériels électriques",
  "image": "images/cat-electricite.jpg",
  "sous": [
   {
    "nom": "Fils et câbles électriques",
    "produits": [
     { "nom": "Fil électrique 1,5 mm²" },
     { "nom": "Fil électrique 2,5 mm²" },
     { "nom": "Fil électrique 4 mm²" },
     { "nom": "Fil électrique 6 mm²" },
     { "nom": "Fil électrique 10 mm²" },
     { "nom": "Câble électrique souple" },
     { "nom": "Câble électrique rigide" },
     { "nom": "Câble monophasé" },
     { "nom": "Câble triphasé" }
    ]
   },
   {
    "nom": "Appareillages électriques",
    "produits": [
     { "nom": "Interrupteur simple" },
     { "nom": "Interrupteur double" },
     { "nom": "Interrupteur va-et-vient" },
     { "nom": "Prise électrique simple" },
     { "nom": "Prise électrique double" },
     { "nom": "Prise de terre" },
     { "nom": "Prise TV" },
     { "nom": "Prise RJ45" },
     { "nom": "Sonnette" },
     { "nom": "Variateur de lumière" }
    ]
   },
   {
    "nom": "Protection et distribution électrique",
    "produits": [
     { "nom": "Disjoncteur monophasé" },
     { "nom": "Disjoncteur triphasé" },
     { "nom": "Disjoncteur différentiel" },
     { "nom": "Tableau électrique" },
     { "nom": "Coffret électrique" },
     { "nom": "Fusibles" },
     { "nom": "Contacteur" },
     { "nom": "Parafoudre" }
    ]
   },
   {
    "nom": "Éclairage et luminaires",
    "produits": [
     { "nom": "Ampoule LED" },
     { "nom": "Tube LED" },
     { "nom": "Réglette LED" },
     { "nom": "Spot encastrable" },
     { "nom": "Projecteur LED" },
     { "nom": "Plafonnier" },
     { "nom": "Lampe solaire" }
    ]
   },
   {
    "nom": "Matériels d'installation",
    "produits": [
     { "nom": "Gaine électrique" },
     { "nom": "Tube PVC électrique" },
     { "nom": "Moulure" },
     { "nom": "Goulotte" },
     { "nom": "Boîte d'encastrement" },
     { "nom": "Boîte de dérivation" },
     { "nom": "Bornes de connexion" },
     { "nom": "Dominos" },
     { "nom": "Ruban isolant" },
     { "nom": "Accessoires de fixation" }
    ]
   },
   {
    "nom": "Mise à la terre et sécurité",
    "produits": [
     { "nom": "Piquet de terre" },
     { "nom": "Câble de mise à la terre" },
     { "nom": "Accessoires de mise à la terre" },
     { "nom": "Barre de coupure" },
     { "nom": "Accessoires de protection" }
    ]
   },
   {
    "nom": "Énergie solaire",
    "produits": [
     { "nom": "Panneau solaire" },
     { "nom": "Régulateur de charge" },
     { "nom": "Onduleur" },
     { "nom": "Batterie solaire" },
     { "nom": "Lampadaire solaire" },
     { "nom": "Accessoires solaires" }
    ]
   },
   {
    "nom": "Outillage électrique professionnel",
    "produits": [
     { "nom": "Multimètre" },
     { "nom": "Pince ampèremétrique" },
     { "nom": "Testeur de tension" },
     { "nom": "Tournevis isolés" },
     { "nom": "Pince coupante" },
     { "nom": "Pince à dénuder" },
     { "nom": "Outillage pour électriciens" }
    ]
   }
  ]
 },
 {
  "id": "plomberie",
  "nom": "Plomberie et sanitaires",
  "image": "images/cat-plomberie.jpg",
  "sous": [
   {
    "nom": "Tuyaux et tubes de plomberie",
    "produits": [
     { "nom": "Tube PVC" },
     { "nom": "Tube PPR" },
     { "nom": "Tube PEHD" }
    ]
   },
   {
    "nom": "Raccords et accessoires",
    "produits": [
     { "nom": "Coude" },
     { "nom": "Té" },
     { "nom": "Manchon" },
     { "nom": "Réduction" }
    ]
   },
   {
    "nom": "Robinets et robinetterie",
    "produits": [
     { "nom": "Robinet" },
     { "nom": "Mitigeur" },
     { "nom": "Mélangeur" },
     { "nom": "Vanne" },
     { "nom": "Accessoires de robinetterie" }
    ]
   },
   {
    "nom": "Sanitaires et équipements de salle de bain",
    "produits": [
     { "nom": "WC" },
     { "nom": "Lavabo" },
     { "nom": "Vasque" },
     { "nom": "Bidet" },
     { "nom": "Douche" },
     { "nom": "Accessoires de salle de bain" }
    ]
   },
   {
    "nom": "Évacuation et drainage",
    "produits": [
     { "nom": "Siphon" },
     { "nom": "Bonde" },
     { "nom": "Caniveau" },
     { "nom": "Grille d'évacuation" }
    ]
   },
   {
    "nom": "Accessoires de plomberie",
    "produits": [
     { "nom": "Flexible" },
     { "nom": "Joints" },
     { "nom": "Téflon" },
     { "nom": "Collier" },
     { "nom": "Colle PVC" },
     { "nom": "Produit d'étanchéité pour plomberie" }
    ]
   },
   {
    "nom": "Pompage et alimentation en eau",
    "produits": [
     { "nom": "Pompe" },
     { "nom": "Surpresseur" },
     { "nom": "Réservoir" },
     { "nom": "Flotteur" }
    ]
   }
  ]
 },
 {
  "id": "etancheite",
  "nom": "Matériels d'étanchéité",
  "image": "images/cat-etancheite.jpg",
  "sous": [
   {
    "nom": "Membranes d'étanchéité",
    "produits": [
     { "nom": "Membrane bitumineuse" },
     { "nom": "Membrane autocollante" },
     { "nom": "Membrane PVC" },
     { "nom": "Membrane EPDM" }
    ]
   },
   {
    "nom": "Résines et étanchéité liquide",
    "produits": [
     { "nom": "Résine d'étanchéité" },
     { "nom": "Revêtement imperméabilisant" },
     { "nom": "Produit polyuréthane" },
     { "nom": "Hydrofuge" }
    ]
   },
   {
    "nom": "Primaires et produits bitumineux",
    "produits": [
     { "nom": "Primaire d'accrochage" },
     { "nom": "Enduit bitumineux" },
     { "nom": "Émulsion bitumineuse" }
    ]
   },
   {
    "nom": "Mastics et joints",
    "produits": [
     { "nom": "Mastic polyuréthane" },
     { "nom": "Silicone" },
     { "nom": "Mastic bitumineux" },
     { "nom": "Joint d'étanchéité" }
    ]
   },
   {
    "nom": "Bandes et accessoires d'étanchéité",
    "produits": [
     { "nom": "Bande bitumineuse" },
     { "nom": "Bande autocollante" },
     { "nom": "Bande de renfort" },
     { "nom": "Accessoires de jonction" }
    ]
   },
   {
    "nom": "Géotextiles et protection",
    "produits": [
     { "nom": "Géotextile" },
     { "nom": "Feutre" },
     { "nom": "Nappe drainante" },
     { "nom": "Membrane de protection" }
    ]
   },
   {
    "nom": "Outillage pour étancheurs",
    "produits": [
     { "nom": "Rouleau" },
     { "nom": "Brosse" },
     { "nom": "Spatule" },
     { "nom": "Taloche" },
     { "nom": "Équipements de protection" }
    ]
   }
  ]
 }
];
