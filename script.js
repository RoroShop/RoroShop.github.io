// Sample product data
const products = [
  { id: 1, name: "Carry Sport Porte Plastique Bleue", price: 30, image: "./img/products/f1.jpg" },
  { id: 2, name: "IMAC Baggy Cage de Transport 36x25x29cm", price: 10, image: "./img/products/f2.jpg" },
  { id: 3, name: "Jouet chat Trainning WHEEL vert", price: 12, image: "./img/products/f3.jpg" },
  { id: 4, name: "Jouet Petite Souris pour Chat 5 cm", price: 20, image: "./img/products/f4.jpg" },
  { id: 5, name: "Collier et Laisse de Luxe ", price: 10, image: "./img/products/f5.jpg" },
  { id: 6, name: "Manteau pour Chien Coco Rose", price: 12, image: "./img/products/f6.jpg" },
  { id: 7, name: "Menforsan Spray Apaisant", price: 20, image: "./img/products/f7.jpg" },
  { id: 8, name: "Panier Sofa ouatiné", price: 10, image: "./img/products/f8.jpg" },
  { id: 9, name: "Peigne à Puces Poignée Confort 19 cm", price: 12, image: "./img/products/n1.jpg" },
  { id: 10, name: "Pelle Giulietta", price: 20, image: "./img/products/n2.jpg" },
  { id: 11, name: "Pelle Giulietta", price: 10, image: "./img/products/n3.jpg" },
  { id: 12, name: "Royal canin CHAT HAIR & SKIN 2 Kg", price: 12, image: "./img/products/n4.jpg" },
  { id: 13, name: "Royal canin CHAT HAIR & SKIN 2 Kg", price: 20, image: "./img/products/n5.jpg" },
  { id: 14, name: "Royal canin CHAT HAIR & SKIN 2 Kg", price: 10, image: "./img/products/n6.jpg" },
  { id: 15, name: "SIMBA CHAT MOUSSE THON POISSON 85 GR", price: 12, image: "./img/products/n7.jpg" },
  { id: 16, name: "Balle de Tennis Smash Jaune", price: 20, image: "./img/products/n8.jpg" }

];

// Initialize cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Render cart items
function renderCart() {
  const cartItems = document.querySelector("#cart-items tbody");
  const subtotalElem = document.getElementById("cart-subtotal");
  const totalElem = document.getElementById("cart-total");

  cartItems.innerHTML = "";

  let subtotal = 0;

  cart.forEach((item, index) => {
      const { id, name, price, image, quantity } = item;
      const itemTotal = price * quantity;
      subtotal += itemTotal;

      cartItems.innerHTML += `
          <tr>
              <td><button class="remove" data-index="${index}">X</button></td>
              <td><img src="${image}" alt="${name}" width="50"></td>
              <td>${name}</td>
              <td>${price}</td>
              <td><input type="number" class="quantity" data-index="${index}" value="${quantity}" min="1"></td>
              <td>${itemTotal}</td>
          </tr>
      `;
  });

  subtotalElem.textContent = `${subtotal}`;
  totalElem.textContent = `${subtotal}`;
}

// Add product to cart
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
      existingItem.quantity += 1;
  } else {
      cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Update quantity
document.addEventListener("input", (e) => {
  if (e.target.classList.contains("quantity")) {
      const index = e.target.dataset.index;
      cart[index].quantity = parseInt(e.target.value) || 1;
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
  }
});

// Remove item
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove")) {
      const index = e.target.dataset.index;
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
  }
});

// On page load
renderCart();


