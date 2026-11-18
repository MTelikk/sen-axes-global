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
  $("cartTotal").textContent = fcfa(panier.reduce((s, a) => s + a.prix * a.qte, 0));
  $("cartNote").hidden = !panier.some((a) => !a.prix);
}

function toast(texte) {
  const t = document.createElement("div");
  t.className = "toast";
  t.textContent = texte;
  document.body.append(t);
  setTimeout(() => t.remove(), 2200);
}

document.querySelectorAll(".add-cart").forEach((b) =>
  b.addEventListener("click", () => {
    const nom = b.dataset.name;
    const existant = panier.find((a) => a.nom === nom);
    if (existant) existant.qte++;
    else panier.push({ nom, prix: Number(b.dataset.price), qte: 1 });
    majPanier();
    toast("Ajouté au panier");
  })
);
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
  lignes.push("", `Total : ${fcfa(total)}${panier.some((a) => !a.prix) ? " (hors articles sur demande)" : ""}`, "");
  lignes.push(`Nom : ${val("cNom")}`, `Téléphone : ${val("cTel")}`, `Réception : ${val("cMode")}`);
  if ($("cMode").selectedIndex === 0 && val("cAdr")) lignes.push(`Adresse : ${val("cAdr")}`);
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(lignes.join("\n"))}`, "_blank");
});
majPanier();

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
