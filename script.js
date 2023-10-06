// script.js

// JavaScript code
const searchInput = document.getElementById('search');
const listViewBtn = document.getElementById('listViewBtn');
const gridViewBtn = document.getElementById('gridViewBtn');
const productContainer = document.getElementById('productContainer');

// Function to fetch products from an API
async function fetchProducts() {
    try {
        const response = await fetch('https://api.example.com/products'); // Replace with your API endpoint
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

// Function to render products
function renderProducts(products) {
    productContainer.innerHTML = '';
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <h2>${product.name}</h2>
            <p>Price: $${product.price}</p>
            <p>Description: ${product.description}</p>
        `;
        productContainer.appendChild(productDiv);
    });
}

// Event listener for search input
searchInput.addEventListener('input', async () => {
    const searchKey = searchInput.value.toLowerCase();
    const products = await fetchProducts();
    renderProducts(products.filter(product =>
        product.variants.some(variant => variant.toLowerCase().includes(searchKey))
    ));
});

// Event listener for list view button
listViewBtn.addEventListener('click', () => {
    productContainer.classList.remove('grid-view');
    productContainer.classList.add('list-view');
});

// Event listener for grid view button
gridViewBtn.addEventListener('click', () => {
    productContainer.classList.remove('list-view');
    productContainer.classList.add('grid-view');
});

// Initial load of products
(async () => {
    const products = await fetchProducts();
    renderProducts(products);
})();
