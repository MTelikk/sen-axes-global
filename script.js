// Numéro WhatsApp de l'entreprise (format international, sans "+")
const WHATSAPP = "221773836746";

// Menu mobile
const burger = document.querySelector(".burger");
const nav = document.getElementById("nav");
burger.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  burger.setAttribute("aria-expanded", open);
});
nav.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => nav.classList.remove("open"))
);

// Formulaire de devis : ouvre WhatsApp avec la demande déjà rédigée
document.getElementById("devisForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const val = (id) => document.getElementById(id).value.trim();
  const besoins = [...document.querySelectorAll('input[name="besoin"]:checked')].map((c) => c.value);
  const lignes = [
    "Bonjour SAG, je souhaite un devis.",
    "",
    `Nom : ${val("dNom")}`,
    `Téléphone : ${val("dTel")}`,
    `Besoin : ${besoins.length ? besoins.join(", ") : "à préciser"}`,
    `Type de bâtiment : ${val("dType")}`,
  ];
  if (val("dSurface")) lignes.push(`Surface : ${val("dSurface")} m²`);
  if (val("dLieu")) lignes.push(`Lieu : ${val("dLieu")}`);
  if (val("dMsg")) lignes.push("", `Précisions : ${val("dMsg")}`);
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(lignes.join("\n"))}`, "_blank");
});

// Formulaire de recrutement : ouvre WhatsApp avec la candidature déjà rédigée
document.getElementById("recrutForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const val = (id) => document.getElementById(id).value.trim();
  const lignes = [
    "Bonjour SAG, je souhaite déposer ma candidature.",
    "",
    `Nom : ${val("rNom")}`,
    `Téléphone : ${val("rTel")}`,
    `Domaine : ${val("rDomaine")}`,
    `Expérience : ${val("rExp")} an(s)`,
    `Diplôme / attestation : ${val("rDiplome")}`,
  ];
  if (val("rMsg")) lignes.push("", `Parcours : ${val("rMsg")}`);
  lignes.push("", "Je joins mes documents (CV, diplôme ou attestation) à la suite de ce message.");
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(lignes.join("\n"))}`, "_blank");
});

// ---------- Panier ----------
// Le panier est gardé dans le navigateur du client ; la commande part sur WhatsApp.
const fcfa = (n) => n.toLocaleString("fr-FR").replace(/\u202f|\u00a0/g, " ") + " F CFA";
let panier = [];
try { panier = JSON.parse(localStorage.getItem("sag-panier")) || []; } catch (e) { panier = []; }
const cart = document.getElementById("cart");
const $ = (id) => document.getElementById(id);

function majPanier() {
  try { localStorage.setItem("sag-panier", JSON.stringify(panier)); } catch (e) {}
  const nb = panier.reduce((s, a) => s + a.qte, 0);
  $("cartCount").textContent = nb;
  $("cartCount").hidden = nb === 0;
  $("cartEmpty").hidden = nb > 0;
  $("cartForm").hidden = nb === 0;
  const ul = $("cartItems");
  ul.textContent = "";
  panier.forEach((a, i) => {
    const li = document.createElement("li");
    const nom = document.createElement("span");
    nom.className = "ci-name";
    nom.textContent = a.nom;
    const prix = document.createElement("span");
    prix.className = "ci-price";
    prix.textContent = a.prix ? fcfa(a.prix * a.qte) : "Prix sur demande";
    const qte = document.createElement("div");
    qte.className = "ci-qty";
    const bouton = (texte, label, action, cls) => {
      const b = document.createElement("button");
      b.type = "button";
      b.textContent = texte;
      b.setAttribute("aria-label", label);
      if (cls) b.className = cls;
      b.addEventListener("click", action);
      return b;
    };
    const n = document.createElement("span");
    n.textContent = a.qte;
    qte.append(
      bouton("−", "Diminuer la quantité", () => { a.qte > 1 ? a.qte-- : panier.splice(i, 1); majPanier(); }),
      n,
      bouton("+", "Augmenter la quantité", () => { a.qte++; majPanier(); }),
      bouton("Retirer", "Retirer du panier", () => { panier.splice(i, 1); majPanier(); }, "ci-del")
    );
    li.append(nom, prix, qte);
    ul.append(li);
  });
  const total = panier.reduce((s, a) => s + a.prix * a.qte, 0);
  $("cartTotal").textContent = total ? fcfa(total) : "Sur devis";
  $("cartNote").hidden = !panier.some((a) => !a.prix);
}

function toast(texte) {
  const t = document.createElement("div");
  t.className = "toast";
  t.textContent = texte;
  document.body.append(t);
  setTimeout(() => t.remove(), 2200);
}

// Un seul écouteur pour tous les boutons « Ajouter au panier », y compris ceux du catalogue
document.addEventListener("click", (e) => {
  const b = e.target.closest(".add-cart");
  if (!b) return;
  const nom = b.dataset.name;
  const existant = panier.find((a) => a.nom === nom);
  if (existant) existant.qte++;
  else panier.push({ nom, prix: Number(b.dataset.price) || 0, qte: 1 });
  majPanier();
  toast("Ajouté au panier");
});
$("cartOpen").addEventListener("click", () => (cart.hidden = false));
$("cartClose").addEventListener("click", () => (cart.hidden = true));
cart.addEventListener("click", (e) => { if (e.target === cart) cart.hidden = true; });
$("cMode").addEventListener("change", () => ($("cAdrWrap").hidden = $("cMode").selectedIndex !== 0));

$("cartForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const val = (id) => $(id).value.trim();
  const lignes = ["Bonjour SAG, je souhaite passer cette commande :", ""];
  panier.forEach((a) => lignes.push(`• ${a.qte} x ${a.nom} : ${a.prix ? fcfa(a.prix * a.qte) : "prix sur demande"}`));
  const total = panier.reduce((s, a) => s + a.prix * a.qte, 0);
  lignes.push("", total ? `Total : ${fcfa(total)}${panier.some((a) => !a.prix) ? " (hors articles sur demande)" : ""}` : "Merci de m'envoyer votre devis pour ces articles.", "");
  if ($("cGros").checked) lignes.push("Je suis revendeur / j'achète en gros : merci de m'indiquer vos tarifs de gros.", "");
  lignes.push(`Nom : ${val("cNom")}`, `Téléphone : ${val("cTel")}`, `Réception : ${val("cMode")}`);
  if ($("cMode").selectedIndex === 0 && val("cAdr")) lignes.push(`Adresse : ${val("cAdr")}`);
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(lignes.join("\n"))}`, "_blank");
});
majPanier();

// ---------- Catalogue de la boutique (les produits sont dans produits.js) ----------
const ICONE = "M20 7l-8-4-8 4v10l8 4 8-4V7zm-8 2.200L6.500 6.500 12 3.800l5.500 2.700L12 9.200zM5 8.100l6 3v7.300l-6-3V8.100zm8 10.300v-7.300l6-3v7.300l-6 3z";
const sansAccent = (t) => t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
const el = (tag, cls, texte) => {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (texte) e.textContent = texte;
  return e;
};
let catActive = null;   // catégorie ouverte (null = toutes, lors d'une recherche)
let sousActive = null;  // sous-catégorie filtrée

function carteProduit(p, cat) {
  const c = el("div", "prod");
  const vignette = el("div", "prod-thumb");
  if (p.image) {
    const img = el("img");
    img.src = p.image; img.alt = p.nom; img.loading = "lazy";
    vignette.append(img);
  } else {
    vignette.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${ICONE}"/></svg>`;
  }
  c.append(vignette, el("span", "prod-name", p.nom));
  if (p.marque) c.append(el("p", "prod-brand", "Marque : " + p.marque));
  if (p.desc) c.append(el("p", "prod-desc", p.desc));
  if (p.stock) {
    const s = sansAccent(p.stock);
    c.append(el("span", "prod-stock" + (s.includes("rupture") ? " out" : s.includes("commande") ? " cmd" : ""), p.stock));
  }
  c.append(el("span", "prod-price" + (p.prix ? "" : " ask"), p.prix ? fcfa(p.prix) : "Prix sur demande"));
  if (p.prixGros) c.append(el("p", "prod-gros", `Prix de gros : ${fcfa(p.prixGros)}${p.minGros ? ` dès ${p.minGros} unités` : ""}`));
  const b = el("button", "btn btn-yellow add-cart", "Ajouter au panier");
  b.type = "button";
  b.dataset.name = p.nom + (p.marque ? ` (${p.marque})` : "");
  b.dataset.price = p.prix || 0;
  c.append(b);
  return c;
}

function afficherCatalogue() {
  const q = sansAccent($("shopSearch").value.trim());
  const cats = CATALOGUE.filter((c) => !catActive || c.id === catActive);
  $("catTitle").textContent = catActive ? cats[0].nom : "Résultats de la recherche";
  document.querySelectorAll(".shop-cat").forEach((b) => b.classList.toggle("active", b.dataset.cat === catActive));

  const filtres = $("catFilters");
  filtres.textContent = "";
  if (catActive) {
    const bouton = (texte, valeur) => {
      const b = el("button", valeur === sousActive ? "active" : "", texte);
      b.type = "button";
      b.addEventListener("click", () => { sousActive = valeur; afficherCatalogue(); });
      filtres.append(b);
    };
    bouton("Tout", null);
    cats[0].sous.forEach((s) => bouton(s.nom, s.nom));
  }

  const liste = $("catList");
  liste.textContent = "";
  let nb = 0;
  cats.forEach((cat) =>
    cat.sous.forEach((s) => {
      if (catActive && sousActive && s.nom !== sousActive) return;
      const produits = s.produits.filter((p) => !q || sansAccent([p.nom, p.marque, p.desc, s.nom].join(" ")).includes(q));
      if (!produits.length) return;
      nb += produits.length;
      const titre = el("h4", "cat-sub", s.nom + " ");
      if (!catActive) titre.append(el("small", "", "– " + cat.nom));
      const grille = el("div", "prod-grid");
      produits.forEach((p) => grille.append(carteProduit(p, cat)));
      liste.append(titre, grille);
    })
  );
  $("catEmpty").hidden = nb > 0;
  $("catalogue").hidden = false;
}

CATALOGUE.forEach((cat) => {
  const b = el("button", "shop-cat");
  b.type = "button";
  b.dataset.cat = cat.id;
  const img = el("img");
  img.src = cat.image; img.alt = cat.nom; img.loading = "lazy";
  const d = el("div");
  d.append(el("b", "", cat.nom), el("span", "", cat.sous.map((s) => s.nom).slice(0, 3).join(", ") + "…"), document.createElement("br"), el("em", "", "Voir les produits →"));
  b.append(img, d);
  b.addEventListener("click", () => {
    catActive = cat.id; sousActive = null;
    $("shopSearch").value = "";
    afficherCatalogue();
    $("catalogue").scrollIntoView({ behavior: "smooth", block: "start" });
  });
  $("shopCats").append(b);
});
$("shopSearch").addEventListener("input", () => {
  if ($("shopSearch").value.trim()) { catActive = null; sousActive = null; afficherCatalogue(); }
  else if (!catActive) $("catalogue").hidden = true;
});
$("catClose").addEventListener("click", () => {
  $("catalogue").hidden = true; catActive = null; $("shopSearch").value = "";
  document.querySelectorAll(".shop-cat").forEach((b) => b.classList.remove("active"));
});

// Agrandissement des images des packs
const lightbox = document.getElementById("lightbox");
const lbImg = lightbox.querySelector("img");
document.querySelectorAll(".pack-img").forEach((b) =>
  b.addEventListener("click", () => {
    lbImg.src = b.dataset.full;
    lbImg.alt = b.querySelector("img").alt;
    lightbox.hidden = false;
  })
);
lightbox.addEventListener("click", () => (lightbox.hidden = true));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") { lightbox.hidden = true; cart.hidden = true; }
});

// Année automatique dans le pied de page
document.getElementById("year").textContent = new Date().getFullYear();
