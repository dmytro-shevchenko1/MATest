let products = [];
const productsList = document.querySelector('[data-type="products-list"]');
const loadingSection = document.querySelector('[data-type="loading-section"]');

function showLoader() {
    loadingSection.style.display = 'flex';
}

function hideLoader() {
    loadingSection.style.display = 'none';
}
function createCardElement(product) {
    const template = document.querySelector('[data-type="card-template"]');
    const cardClone = template.content.cloneNode(true);

    const cardImg = cardClone.querySelector('[data-card-img]');
    cardImg.src = product.images;

    const cardTitle = cardClone.querySelector('[data-card-title]');
    cardTitle.textContent = product.title;

    const cardDescription = cardClone.querySelector('[data-card-description]');
    cardDescription.textContent = `${product.description.substring(0, 30)}...`

    const cardCategory = cardClone.querySelector('[data-card-category-name]');
    cardCategory.textContent = product.category.name;

    const cardPrice = cardClone.querySelector('[data-card-price]');
    cardPrice.textContent = `$ ${product.price}`;

    return cardClone;
}

function renderCards(container, productsCards) {
    container.innerText = '';
    const fragment = document.createDocumentFragment();
    productsCards.forEach((product) => {
        const cardElement = createCardElement(product);
        fragment.appendChild(cardElement);
    });

    container.appendChild(fragment);
}

async function fetchDataCards() {
    try {
        showLoader();

        const apiUrl = 'https://api.escuelajs.co/api/v1/products';
        const options = {
            method: 'GET',
        };

        const response = await fetch(apiUrl, options);
        products = await response.json();
        renderCards(productsList, products.slice(0, 21));
    } catch (error) {
        console.error('GET error:', error);
    } finally {
        hideLoader();
    }
}

document.addEventListener('DOMContentLoaded', fetchDataCards);