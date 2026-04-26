const menuData = {
  starters: [
    { name: "Burrata & Heirloom Tomato", price: "₹620", desc: "Fresh burrata, slow-roasted tomatoes, aged balsamic reduction, micro basil.", tag: "Vegetarian" },
    { name: "Seared Scallops", price: "₹890", desc: "Pan-seared king scallops, cauliflower purée, crispy capers, herb oil.", tag: "Chef's Pick" },
    { name: "Charcuterie Board", price: "₹750", desc: "Cured meats, artisan cheeses, house pickles, fig jam, warm sourdough.", tag: "To Share" },
    { name: "Wild Mushroom Velouté", price: "₹480", desc: "Velvety porcini soup, truffle cream, toasted rye croutons.", tag: "Vegetarian" },
  ],
  mains: [
    { name: "Wood-Fired Lamb Rack", price: "₹1,850", desc: "Herb-crusted rack of lamb, minted pea purée, rosemary jus, charred asparagus.", tag: "Signature" },
    { name: "Dry-Aged Ribeye 300g", price: "₹2,100", desc: "45-day dry-aged beef, bone marrow butter, truffle fries, red wine reduction.", tag: "Chef's Pick" },
    { name: "Pan-Roasted Sea Bass", price: "₹1,450", desc: "Crispy skin sea bass, saffron risotto, fennel confit, citrus beurre blanc.", tag: "Seafood" },
    { name: "Roasted Cauliflower Steak", price: "₹980", desc: "Whole cauliflower, harissa, pomegranate, toasted almonds, yoghurt.", tag: "Vegan" },
  ],
  desserts: [
    { name: "Dark Chocolate Fondant", price: "₹520", desc: "Warm 70% cacao fondant, tahini ice cream, salted caramel, hazelnut praline.", tag: "Must Try" },
    { name: "Vanilla Panna Cotta", price: "₹420", desc: "Madagascan vanilla, seasonal berry compote, pistachio crumb.", tag: "Vegetarian" },
    { name: "Cheese Selection", price: "₹680", desc: "Four artisan cheeses, quince paste, walnut bread, seasonal fruit.", tag: "To Share" },
    { name: "Tarte Tatin", price: "₹480", desc: "Classic French apple tart, Calvados caramel, clotted cream.", tag: "House Classic" },
  ]
};

// Render menu
function renderMenu(category) {
  const grid = document.getElementById('menu-grid');
  grid.innerHTML = '';
  menuData[category].forEach(item => {
    grid.innerHTML += `
      <div class="menu-item">
        <div class="menu-item-top">
          <h4>${item.name}</h4>
          <span class="menu-price">${item.price}</span>
        </div>
        <p>${item.desc}</p>
        <span class="menu-tag">${item.tag}</span>
      </div>
    `;
  });
}

// Tab switching
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    renderMenu(tab.dataset.tab);
  });
});

renderMenu('starters');

// Reservation form
function handleReserve(e) {
  e.preventDefault();
  const msg = document.getElementById('reserve-msg');
  msg.textContent = '✓ Reservation confirmed! We\'ll send a confirmation to your email shortly.';
  e.target.reset();
}

// Hamburger
document.getElementById('hamburger')?.addEventListener('click', () => {
  const nav = document.querySelector('.nav-links');
  nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
});