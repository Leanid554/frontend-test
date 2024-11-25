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
let totalPages = 1;
let totalLoaded = 0;
let loading = false;

async function loadProducts() {
  if (loading) return;

  loading = true;

  if (totalLoaded >= pageSize) {
    loading = false;
    return;
  }

  if (currentPage > totalPages) {
    loading = false;
    return;
  }

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
    if (currentPage === 1) {
      productsList.innerHTML = "";
    }

    data.data.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.className = "card";
      productCard.innerHTML = `ID: ${product.id}<br>${product.text}`;
      productsList.appendChild(productCard);
      totalLoaded++;
    });

    totalPages = data.totalPages;

    if (currentPage < totalPages && totalLoaded < pageSize) {
      currentPage++;
    }

    loading = false;
  } catch (error) {
    console.error("Ошибка:", error);
    loading = false;
  }
}

document.getElementById("productsPerPage").addEventListener("change", (e) => {
  pageSize = parseInt(e.target.value);
  currentPage = 1;
  totalPages = 1;
  totalLoaded = 0;
  document.getElementById("productsList").innerHTML = "";
  loadProducts();
});

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 &&
    totalLoaded < pageSize
  ) {
    loadProducts();
  }
});

loadProducts();
