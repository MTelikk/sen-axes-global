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
  if (e.key === "Escape") lightbox.hidden = true;
});

// Année automatique dans le pied de page
document.getElementById("year").textContent = new Date().getFullYear();
