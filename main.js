let menu = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menu.onclick = () => {
  navbar.classList.toggle("active");
};

window.onscroll = () => {
  navbar.classList.remove("active");
};

const fetchFurnitureData = async () => {
  try {
    const response = await fetch("/furniture.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
const searchBar = document.getElementById('search-bar');

searchBar.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    searchProducts();
  }
});

function searchProducts() {
  const query = searchBar.value.trim().toLowerCase();

  const searchResults = [];
  const allProducts = document.querySelectorAll('.box');
  allProducts.forEach(product => {
    if (product.textContent.toLowerCase().includes(query)) {
      searchResults.push(product);
    }
  });

  if (searchResults.length > 0) {
    const firstResult = searchResults[0];
    firstResult.scrollIntoView({ behavior: 'smooth' });
    // Optionally, you can also redirect to the product details page
    const productId = firstResult.getAttribute('data-productId');
    if (productId) {
      window.location.href = `htmlFiles/itemDetails.html?productId=${productId}`;
    }
  } else {
    console.log('Product not found!');
  }
}

const ShopSection = (data) => {
  const shopDiv = document.getElementById("shop-container");

  for (let i = 0; i < 6; i++) {
    const box = document.createElement("div");
    box.className = "box";

    // Add product image
    const boxImg = document.createElement("div");
    boxImg.className = "box-img";
    const productImage = document.createElement("img");
    productImage.src = data[i].img;
    productImage.alt = "";
    (function (i) {
      productImage.addEventListener("click", function () {
        // Create a new  item Data object for the current product with spread operator (...)
        const ItemData = { ...data[i] };
        console.log(ItemData);

        // Redirect to the itemDetails page with the data item object
        window.location.href =
          "htmlFiles/itemDetails.html?" +
          new URLSearchParams({
            ItemData: JSON.stringify(data[i]),
          }).toString();
      });  
    })(i);
    boxImg.appendChild(productImage);
    box.appendChild(boxImg);

    // Add title and price
    const titlePrice = document.createElement("div");
    titlePrice.className = "title-price";
    const productName = document.createElement("h3");
    productName.textContent = data[i].productName;
    titlePrice.appendChild(productName);

    // Add stars
    const stars = document.createElement("div");
    stars.className = "stars";
    stars.innerHTML += getStarsHTML(data[i].rating.rate);
    titlePrice.appendChild(stars);

    box.appendChild(titlePrice);

    // Add price
    const priceSpan = document.createElement("span");
    priceSpan.textContent = `${data[i].price}$`;
    box.appendChild(priceSpan);

    // Add cart icon
    const cartIcon = document.createElement("i");
    cartIcon.className = "bx bx-cart";
    (function (i) {
      cartIcon.addEventListener("click", function () {
        // Create a new  item Data object for the current product with spread operator (...)
        const ItemData = { ...data[i] };
        console.log(ItemData);

        // Navigate to cart page
        window.location.href =
          "htmlFiles/cart.html?" +
          new URLSearchParams({
            ItemData: JSON.stringify(data[i]),
          }).toString();
      });
    })(i);
    box.appendChild(cartIcon);

    shopDiv.appendChild(box);
  }
};

const NewCollectionSection = (data) => {
  const newDiv = document.getElementById("new-container");
  for (let i = 6; i < 12; i++) {
    const box = document.createElement("div");
    box.className = "box";

    const boxImg = document.createElement("div");
    boxImg.className = "box-img";
    const productImage = document.createElement("img");
    productImage.src = data[i].img;
    productImage.alt = "";
    (function (i) {
      productImage.addEventListener("click", function () {
        // Create a new  item Data object for the current product with spread operator (...)
        const ItemData = { ...data[i] };
        console.log(ItemData);

        // Redirect to the itemDetails page with the data item object
        window.location.href =
          "htmlFiles/itemDetails.html?" +
          new URLSearchParams({
            ItemData: JSON.stringify(data[i]),
          }).toString();
      });
    })(i);
    boxImg.appendChild(productImage);
    box.appendChild(boxImg);

    const titlePrice = document.createElement("div");
    titlePrice.className = "title-price";
    const productName = document.createElement("h3");
    productName.textContent = data[i].productName;
    titlePrice.appendChild(productName);

    const stars = document.createElement("div");
    stars.className = "stars";
    stars.innerHTML += getStarsHTML(data[i].rating.rate);
    titlePrice.appendChild(stars);

    box.appendChild(titlePrice);

    const priceSpan = document.createElement("span");
    priceSpan.textContent = `${data[i].price}$`;
    box.appendChild(priceSpan);

    const cartIcon = document.createElement("i");
    cartIcon.className = "bx bx-cart";

    (function (i) {
      cartIcon.addEventListener("click", function () {
        // Create a new  item Data object for the current product with spread operator (...)
        const ItemData = { ...data[i] };
        console.log(ItemData);

        // Navigate to cart page
        window.location.href =
          "htmlFiles/cart.html?" +
          new URLSearchParams({
            ItemData: JSON.stringify(data[i]),
          }).toString();
      });
    })(i);

    box.appendChild(cartIcon);

    newDiv.appendChild(box);
  }
};

function getStarsHTML(rating) {
  let starsHTML = "";
  for (let i = 0; i < Math.floor(rating); i++) {
    starsHTML += `<i class='bx bxs-star'></i>`;
  }
  if (rating - Math.floor(rating) > 0) {
    starsHTML += `<i class='bx bxs-star-half'></i>`;
  }
  return starsHTML;
}

async function getFurnitures() {
  const data = await fetchFurnitureData();
  if (!data) {
    return;
  }

  ShopSection(data);
  NewCollectionSection(data);
}

getFurnitures();
