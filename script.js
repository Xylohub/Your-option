/* script.js — Her Option interactive behaviors
   - theme toggle (manual)
   - hamburger mobile menu
   - products rendering (local images)
   - buy modal with MoMo / WhatsApp options
   - scroll reveal (IntersectionObserver)
*/

const PRODUCTS = [
  {
    id: "p1",
    title: "Casio",
    price: "65k",
    img: "images/img1.jpg",
  },
  {
    id: "p2",
    title: "Daniel Wellington silver-green",
    price: "65k",
    img: "images/img2.jpg",
  },
  {
    id: "p3",
    title: "Daniel Wellington silver-black",
    price: "65k",
    img: "images/img3.jpg",
  },
  {
    id: "p4",
    title: "Daniel Wellington silver-white",
    price: "65k",
    img: "images/img4.jpg",
  },
  {
    id: "p5",
    title: "Daniel Wellington gold-cream",
    price: "65k",
    img: "images/img5.jpg",
  },
  {
    id: "p6",
    title: "Daniel Wellington gold-white",
    price: "65k frw",
    img: "images/img6.jpg",
  },
  {
    id: "p7",
    title: "Daniel Wellington gold-green ",
    price: "65k frw",
    img: "images/img7.jpg",
  },
  {
    id: "p8",
    title: "Casio",
    price: "65k frw",
    img: "images/img8.jpg",
  },
  {
    id: "p9",
    title: "Tissot",
    price: "60k frw",
    img: "images/img9.jpg",
  },
  {
    id: "p10",
    title: "Rolex Oyster Perpetual",
    price: "65k frw",
    img: "images/img10.jpg",
  },
  {
    id: "p11",
    title: "Casio watch & bracelet (gold)",
    price: "65k frw",
    img: "images/img11.jpg",
  },
  {
    id: "p12",
    title: "Casio watch & bracelet (gold & blue)",
    price: "65k frw",
    img: "images/img12.jpg",
  },
  {
    id: "p13",
    title: "Rolex Oyster Perpetual (Pale-Gold)",
    price: "65k frw",
    img: "images/img13.jpg",
  },
  {
    id: "p14",
    title: "Rolex Oyster Perpetual  (Silver-White)",
    price: "65k frw",
    img: "images/img14.jpg",
  },
  {
    id: "p15",
    title: "Tissot(green)",
    price: "65k frw",
    img: "images/img15.jpg",
  },
  {
    id: "p16",
    title: "Tissot(black-white)",
    price: "65k frw",
    img: "images/img16.jpg",
  },
  {
    id: "p17",
    title: "Rolex Oyster Perpetual (white)",
    price: "65k frw",
    img: "images/img17.jpg",
  },
  {
    id: "p18",
    title: "Tissot (pure black)",
    price: "65k frw",
    img: "images/img18.jpg",
  },
  {
    id: "p19",
    title: "Rolex Oyster Perpetual",
    price: "65k frw",
    img: "images/img19.jpg",
  },
  {
    id: "p20",
    title: "Rolex Oyster Perpetual",
    price: "65k frw",
    img: "images/img20.jpg",
  },
];

const productGrid = document.getElementById("product-grid");
const buyModal = document.getElementById("buy-modal");
const modalTitle = document.getElementById("modal-title");
const modalPrice = document.getElementById("modal-price");
const momoBtn = document.getElementById("momo-btn");
const waBtn = document.getElementById("wa-btn");
const modalClose = document.getElementById("modal-close");

const themeToggle = document.getElementById("theme-toggle");
const hamburger = document.getElementById("hamburger");
const mobileNav = document.getElementById("mobile-nav");
const brandLogo = document.getElementById("brand-logo");

const yearEl = document.getElementById("year");
yearEl.textContent = new Date().getFullYear();

/* Render product cards */
function renderProducts() {
  productGrid.innerHTML = "";
  PRODUCTS.forEach((p) => {
    const card = document.createElement("div");
    card.className = "card reveal";

    const media = document.createElement("div");
    media.className = "card-media";
    const img = document.createElement("img");
    img.src = p.img;
    img.alt = p.title;
    media.appendChild(img);

    const body = document.createElement("div");
    body.className = "card-body";
    const info = document.createElement("div");
    info.className = "card-info";
    const title = document.createElement("div");
    title.className = "card-title";
    title.textContent = p.title;
    const price = document.createElement("div");
    price.className = "card-price";
    price.textContent = p.price;
    info.appendChild(title);
    info.appendChild(price);

    const actions = document.createElement("div");
    actions.className = "card-actions";
    const buy = document.createElement("button");
    buy.className = "btn";
    buy.textContent = "Buy";
    buy.addEventListener("click", () => openBuyModal(p));
    const details = document.createElement("a");
    details.className = "btn outline";
    details.textContent = "Details";
    details.href = "#";
    actions.appendChild(buy);
    actions.appendChild(details);

    body.appendChild(info);
    body.appendChild(actions);

    card.appendChild(media);
    card.appendChild(body);
    productGrid.appendChild(card);
  });
}

/* Buy modal behavior */
function openBuyModal(product) {
  modalTitle.textContent = product.title;
  modalPrice.textContent = product.price;

  // MoMo link example (replace with real payment flow or deep link)
  // Example: use USSD or payment URL from your provider. Below is placeholder
  const momoLink = `tel:*182*8*1*${encodeURIComponent(product.id)}#`; // placeholder
  momoBtn.href = momoLink;

  // WhatsApp: prefilled message with product and price
  const waNumber = "250798812309";
  const msg = `Hello, I want to order "${product.title}" priced at ${product.price}.`;
  waBtn.href = `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;

  buyModal.setAttribute("aria-hidden", "false");
}

function closeBuyModal() {
  buyModal.setAttribute("aria-hidden", "true");
}

/* modal close events */
modalClose.addEventListener("click", closeBuyModal);
buyModal.addEventListener("click", (e) => {
  if (e.target === buyModal) closeBuyModal();
});

/* Theme toggle (manual, saves choice) */
function updateLogo(isLight) {
  // switch logo file names (put your logos in images/logo-dark.png & images/logo-light.png)
  brandLogo.src = isLight ? "images/logo.jpg" : "images/logo.jpg";
}
(function initTheme() {
  const saved = localStorage.getItem("sg_theme");
  const initial = saved || "dark";
  if (initial === "light")
    document.documentElement.classList.add("light-theme");
  updateLogo(document.documentElement.classList.contains("light-theme"));
  themeToggle.addEventListener("click", () => {
    document.documentElement.classList.toggle("light-theme");
    const isLight = document.documentElement.classList.contains("light-theme");
    localStorage.setItem("sg_theme", isLight ? "light" : "dark");
    updateLogo(isLight);
  });
})();

/* Mobile hamburger */
hamburger.addEventListener("click", () => {
  const open = hamburger.getAttribute("aria-expanded") === "true";
  hamburger.setAttribute("aria-expanded", String(!open));
  mobileNav.setAttribute("aria-hidden", String(open));
  mobileNav.classList.toggle("open");
});

/* Scroll reveal using IntersectionObserver */
function setupReveal() {
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((ent) => {
        if (ent.isIntersecting) {
          ent.target.classList.add("visible");
          obs.unobserve(ent.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
}

/* Init */
renderProducts();
setupReveal();

/* optional: pause video on small devices to save data */
const heroVideo = document.getElementById("hero-video");
if (window.matchMedia && window.matchMedia("(max-width:600px)").matches) {
  try {
    heroVideo.pause();
  } catch (e) {}
}
