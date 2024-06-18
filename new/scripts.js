document.addEventListener('DOMContentLoaded', function() {
    // Função para buscar produtos da API
    async function fetchProducts(url, elementId) {
        try {
            const response = await fetch(url);
            const products = await response.json();
            displayProducts(products, elementId);
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
        }
    }

    // Função para exibir produtos na página
    function displayProducts(products, elementId) {
        const container = document.getElementById(elementId);
        container.innerHTML = '';

        products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.classList.add('product-item');

            productItem.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p>$${product.price}</p>
                <span class="rating">★★★★☆</span>
            `;

            container.appendChild(productItem);
        });
    }

    // URLs da API
    const newArrivalsUrl = 'https://fakestoreapi.com/products?limit=4';
    const topSellingUrl = 'https://fakestoreapi.com/products?sort=desc&limit=4';

    // Buscar e exibir produtos
    fetchProducts(newArrivalsUrl, 'new-arrivals');
    fetchProducts(topSellingUrl, 'top-selling');
});
