// Data Produk (Poin 2)
const products = [
  {
    id: 1,
    name: "Strawberry Cake",
    price: 25000,
    img: "https://beyondfrosting.com/wp-content/uploads/2021/07/Strawberry-Cake-075.jpg",
  },
  {
    id: 2,
    name: "Mint Ice Cream",
    price: 15000,
    img: "https://tse1.mm.bing.net/th/id/OIP._hJv3UQmV-npsnHEWPZghQHaLH?pid=Api&h=220&P=0",
  },
  {
    id: 3,
    name: "Donut Glaze",
    price: 12000,
    img: "https://www.purecookingjoy.com/wp-content/uploads/2025/09/shiny-donut-donut-glaze-1.jpg",
  },
  {
    id: 4,
    name: "Macaron Blue",
    price: 10000,
    img: "https://tse4.mm.bing.net/th/id/OIP.FpUdJm7Ee0H0siBKkp2KkAHaH0?pid=Api&h=220&P=0",
  },
  {
    id: 5,
    name: "Chocolate Muffin",
    price: 18000,
    img: "https://preppykitchen.com/wp-content/uploads/2021/02/Chocolate-Muffin-Recipe.jpg",
  },
];

// Poin 5: State Keranjang (Array)
let cart = [];

// Tampilkan Produk ke HTML
const productList = document.getElementById("product-list");
products.forEach((p) => {
  productList.innerHTML += `
        <div class="card">
            <img src="${p.img}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p>Rp ${p.price.toLocaleString()}</p>
            <button class="btn-add" onclick="addToCart(${p.id})">Tambah ke Keranjang</button>
        </div>
    `;
});

// Poin 5: Fungsi Render Ulang Tampilan
function renderCart() {
  const cartContent = document.getElementById("cart-content");
  const cartBadge = document.getElementById("cart-badge");
  const totalPriceEl = document.getElementById("total-price");

  if (cart.length === 0) {
    cartContent.innerHTML = `<p style="color: #999; font-size: 0.8rem;">Wah, keranjang masih kosong...</p>`;
    cartBadge.innerText = "0";
    totalPriceEl.innerText = "Rp 0";
    return;
  }

  cartContent.innerHTML = "";
  let total = 0;
  let totalItems = 0;

  cart.forEach((item) => {
    total += item.price * item.qty;
    totalItems += item.qty;
    cartContent.innerHTML += `
            <div class="cart-item">
                <div class="item-info">
                    <h4>${item.name}</h4>
                    <small>${item.qty} x Rp ${item.price.toLocaleString()}</small>
                </div>
                <div class="qty-control">
                    <button class="qty-btn" onclick="updateQty(${item.id}, -1)">-</button>
                    <span>${item.qty}</span>
                    <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
                    <button class="qty-btn" style="color: red;" onclick="removeItem(${item.id})">🗑️</button>
                </div>
            </div>
        `;
  });

  cartBadge.innerText = totalItems;
  totalPriceEl.innerText = `Rp ${total.toLocaleString()}`;
}

// Fungsi Tambah (Poin 5)
function addToCart(id) {
  const product = products.find((p) => p.id === id);
  const existingItem = cart.find((item) => item.id === id);

  if (existingItem) {
    existingItem.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  renderCart();
}

// Poin 4: Fungsi Update Jumlah (+ & -)
function updateQty(id, change) {
  const item = cart.find((item) => item.id === id);
  if (item) {
    item.qty += change;
    if (item.qty <= 0) {
      removeItem(id);
    }
  }
  renderCart();
}

// Poin 4: Fungsi Hapus per Item
function removeItem(id) {
  cart = cart.filter((item) => item.id !== id);
  renderCart();
}

// Poin 6: Checkout
function checkout() {
  if (cart.length === 0)
    return alert("Keranjang masih kosong, ayo jajan dulu!");

  let summary = "Ringkasan Pesanan Anda: \n\n";
  let total = 0;
  cart.forEach((item) => {
    summary += `- ${item.name} (${item.qty} pcs): Rp ${(item.qty * item.price).toLocaleString()}\n`;
    total += item.qty * item.price;
  });
  summary += `\nTotal Bayar: Rp ${total.toLocaleString()}\n\nTerima kasih sudah jajan! ✨`;

  alert(summary);
  cart = []; // Kosongkan keranjang setelah checkout
  renderCart();
}
