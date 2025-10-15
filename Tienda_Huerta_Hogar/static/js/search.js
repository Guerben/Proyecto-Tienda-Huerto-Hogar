// ===== SISTEMA DE BÚSQUEDA =====

class SearchSystem {
    constructor() {
        this.products = [];
        this.searchResults = [];
        this.init();
    }

    init() {
        this.loadProducts();
        this.bindEvents();
    }

    // Cargar productos
    loadProducts() {
        this.products = [
            {
                id: 'tomates-cherry',
                name: 'Tomates Cherry',
                price: 3990,
                originalPrice: 5000,
                image: '/static/img/product-1.jpg',
                category: 'vegetales',
                description: 'Deliciosos tomates cherry orgánicos',
                tags: ['tomate', 'cherry', 'orgánico', 'vegetal', 'fresco']
            },
            {
                id: 'pimientos-tricolores',
                name: 'Pimientos Tricolores',
                price: 1690,
                originalPrice: 2000,
                image: '/static/img/pimiento_tricolor.webp',
                category: 'vegetales',
                description: 'Pimientos frescos en tres colores',
                tags: ['pimiento', 'tricolor', 'vegetal', 'fresco', 'colorido']
            },
            {
                id: 'ajis',
                name: 'Ajíes',
                price: 5490,
                originalPrice: 6000,
                image: '/static/img/product-3.jpg',
                category: 'vegetales',
                description: 'Ajíes frescos y picantes',
                tags: ['ají', 'picante', 'vegetal', 'fresco', 'especias']
            },
            {
                id: 'zanahorias',
                name: 'Zanahorias',
                price: 1190,
                originalPrice: 2000,
                image: '/static/img/zanahorias-1024x683.jpg',
                category: 'vegetales',
                description: 'Zanahorias crujientes y dulces',
                tags: ['zanahoria', 'vegetal', 'fresco', 'dulce', 'crudo']
            },
            {
                id: 'pinas-frescas',
                name: 'Piñas Frescas',
                price: 2490,
                originalPrice: 3600,
                image: '/static/img/product-2.jpg',
                category: 'frutas',
                description: 'Piñas tropicales frescas y jugosas',
                tags: ['piña', 'tropical', 'fruta', 'fresco', 'jugoso']
            },
            {
                id: 'manzanas-fuji',
                name: 'Manzanas Fuji',
                price: 2000,
                originalPrice: 2300,
                image: '/static/img/manzanas-fuji.jpg',
                category: 'frutas',
                description: 'Manzanas Fuji crujientes y dulces',
                tags: ['manzana', 'fuji', 'fruta', 'fresco', 'dulce']
            },
            {
                id: 'frutillas',
                name: 'Frutillas',
                price: 2100,
                originalPrice: 3000,
                image: '/static/img/product-4.jpg',
                category: 'frutas',
                description: 'Frutillas frescas y aromáticas',
                tags: ['frutilla', 'fresa', 'fruta', 'fresco', 'aromático']
            },
            {
                id: 'naranjas',
                name: 'Naranjas',
                price: 1100,
                originalPrice: 2000,
                image: '/static/img/naranjas.jpg',
                category: 'frutas',
                description: 'Naranjas jugosas y ricas en vitamina C',
                tags: ['naranja', 'cítrico', 'fruta', 'fresco', 'vitamina c']
            },
            {
                id: 'leche-chocolate',
                name: 'Leche Descremada Sabor Chocolate',
                price: 1099,
                originalPrice: 1300,
                image: '/static/img/chocolate.png',
                category: 'lacteos',
                description: 'Leche descremada con sabor a chocolate',
                tags: ['leche', 'chocolate', 'lácteo', 'descremada', 'bebida']
            },
            {
                id: 'leche-natural',
                name: 'Leche Enteral Natural 1 LT',
                price: 1000,
                originalPrice: 1350,
                image: '/static/img/leche.webp',
                category: 'lacteos',
                description: 'Leche entera fresca y natural',
                tags: ['leche', 'entera', 'lácteo', 'natural', 'fresco']
            },
            {
                id: 'yogurt-batido',
                name: 'Pack Yoghurt Batido Colun 12 X 125 GR',
                price: 2600,
                originalPrice: 2999,
                image: '/static/img/jogurt.png',
                category: 'lacteos',
                description: 'Pack de 12 yogures batidos',
                tags: ['yogurt', 'batido', 'lácteo', 'pack', 'probiótico']
            },
            {
                id: 'queso-ranco',
                name: 'Queso Ranco Laminado Colun 500 GR',
                price: 7000,
                originalPrice: 7250,
                image: '/static/img/queso.webp',
                category: 'lacteos',
                description: 'Queso Ranco laminado de alta calidad',
                tags: ['queso', 'ranco', 'lácteo', 'laminado', 'proteína']
            }
        ];
    }

    // Vincular eventos
    bindEvents() {
        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.getElementById('searchBtn');
        const searchResults = document.getElementById('searchResults');

        if (searchInput) {
            // Búsqueda en tiempo real
            searchInput.addEventListener('input', (e) => {
                const query = e.target.value.trim();
                if (query.length >= 2) {
                    this.search(query);
                } else {
                    this.hideResults();
                }
            });

            // Búsqueda al presionar Enter
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.performSearch();
                }
            });

            // Ocultar resultados al hacer clic fuera
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.search-container')) {
                    this.hideResults();
                }
            });
        }

        if (searchBtn) {
            searchBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.performSearch();
            });
        }
    }

    // Realizar búsqueda
    search(query) {
        const results = this.products.filter(product => {
            const searchText = `${product.name} ${product.description} ${product.tags.join(' ')}`.toLowerCase();
            return searchText.includes(query.toLowerCase());
        });

        this.searchResults = results;
        this.displayResults(results);
    }

    // Mostrar resultados
    displayResults(results) {
        const searchResults = document.getElementById('searchResults');
        if (!searchResults) return;

        if (results.length === 0) {
            searchResults.innerHTML = `
                <div class="p-3 text-center text-muted">
                    <i class="fa fa-search fa-2x mb-2"></i>
                    <p class="mb-0">No se encontraron productos</p>
                </div>
            `;
        } else {
            searchResults.innerHTML = results.map(product => `
                <div class="search-result-item p-3 border-bottom" style="cursor: pointer;">
                    <div class="d-flex align-items-center">
                        <img src="${product.image}" alt="${product.name}" class="me-3" style="width: 50px; height: 50px; object-fit: cover; border-radius: 5px;">
                        <div class="flex-grow-1">
                            <h6 class="mb-1">${product.name}</h6>
                            <small class="text-muted">${product.description}</small>
                            <div class="mt-1">
                                <span class="text-primary fw-bold">$${product.price.toLocaleString()}</span>
                                ${product.originalPrice ? `<span class="text-muted text-decoration-line-through ms-2">$${product.originalPrice.toLocaleString()}</span>` : ''}
                            </div>
                        </div>
                    </div>
                </div>
            `).join('');

            // Agregar eventos a los resultados
            searchResults.querySelectorAll('.search-result-item').forEach((item, index) => {
                item.addEventListener('click', () => {
                    this.goToProduct(results[index]);
                });
            });
        }

        searchResults.style.display = 'block';
    }

    // Ocultar resultados
    hideResults() {
        const searchResults = document.getElementById('searchResults');
        if (searchResults) {
            searchResults.style.display = 'none';
        }
    }

    // Ir al producto
    goToProduct(product) {
        window.location.href = `product-detail.html?id=${product.id}`;
    }

    // Realizar búsqueda completa
    performSearch() {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            const query = searchInput.value.trim();
            if (query.length >= 2) {
                // Redirigir a página de resultados de búsqueda
                window.location.href = `search-results.html?q=${encodeURIComponent(query)}`;
            }
        }
    }

    // Buscar productos por categoría
    searchByCategory(category) {
        return this.products.filter(product => product.category === category);
    }

    // Obtener productos populares
    getPopularProducts() {
        return this.products.slice(0, 6);
    }

    // Obtener productos en oferta
    getProductsOnSale() {
        return this.products.filter(product => product.originalPrice > product.price);
    }
}

// Inicializar sistema de búsqueda
document.addEventListener('DOMContentLoaded', function() {
    window.searchSystem = new SearchSystem();
});

// Función global para búsqueda rápida
function quickSearch(query) {
    if (window.searchSystem) {
        window.searchSystem.search(query);
    }
}
