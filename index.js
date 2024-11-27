const burgerIcon = document.getElementById("burgerIcon");
const navbarElements = document.querySelector(".navbar-elemets");
const overlay = document.getElementById("overlay");
const body = document.body;

burgerIcon.addEventListener("click", () => {
  const isActive = navbarElements.classList.toggle("active");
  overlay.classList.toggle("active", isActive);
  body.classList.toggle("menu-open", isActive);
});

overlay.addEventListener("click", () => {
  navbarElements.classList.remove("active");
  overlay.classList.remove("active");
  body.classList.remove("menu-open");
});

let currentPage = 1;
let pageSize = 20;

async function loadProducts() {
  try {
    const response = await fetch(
      `https://brandstestowy.smallhost.pl/api/random?pageNumber=${currentPage}&pageSize=${pageSize}`
    );

    if (!response.ok) {
      throw new Error("Ошибка при загрузке данных");
    }

    const data = await response.json();
    console.log(data);

    const productsList = document.getElementById("productsList");
    data.data.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.className = "card";
      productCard.innerHTML = `ID: ${product.id}<br>${product.text}`;
      productsList.appendChild(productCard);
    });

    if (currentPage < data.totalPages) {
      currentPage++;
    }
  } catch (error) {
    console.error("Ошибка:", error);
  }
}

document.getElementById("productsPerPage").addEventListener("change", (e) => {
  pageSize = parseInt(e.target.value);
  currentPage = 1;
  document.getElementById("productsList").innerHTML = "";
  loadProducts();
});

window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
    loadProducts();
  }
});

loadProducts();
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  const dogContent = document.querySelector(".dog-content");
  if (dogContent) {
    dogContent.style.transform = `translateY(${scrollY * 0.2}px)`;
  }

  // const vectcorsDog = document.querySelector(".vectcors-dog");
  // if (vectcorsDog) {
  //   vectcorsDog.style.transform = `translateX(-50%) translateY(${
  //     scrollY * 0.2
  //   }px)`; // Более медленный параллакс (коэффициент 0.1)
  // }
});

document
  .querySelector(".block-navbar a")
  .addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(".sklad-content");
    target.scrollIntoView({ behavior: "smooth" });
  });
document
  .querySelector(".block-navbar a")
  .addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(".produkty");
    target.scrollIntoView({ behavior: "smooth" });
  });
document
  .querySelector(".block-navbar a")
  .addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(".content-preparat");
    target.scrollIntoView({ behavior: "smooth" });
  });
