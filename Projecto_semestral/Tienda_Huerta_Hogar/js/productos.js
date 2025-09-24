// js/dynamic-products.js

/**
 * Obtiene los productos del localStorage.
 * Si no existen, crea productos por defecto basados en las imágenes de tu plantilla.
 */
function obtenerProductos() {
    const productosGuardados = localStorage.getItem('products');
    
    if (productosGuardados) {
        return JSON.parse(productosGuardados);
    } else {
        // Productos por defecto (coinciden con las imágenes que ya tienes: product-1.jpg, etc.)
        const productosDefault = [
            {
                id: "1",
                name: "Fresh Tomato",
                price: 19.00,
                oldPrice: 29.00,
                image: "img/product-1.jpg",
                category: "vegetable",
                description: "Jugoso y recién cosechado de la huerta."
            },
            {
                id: "2",
                name: "Organic Apple",
                price: 15.00,
                oldPrice: 22.00,
                image: "img/product-2.jpg",
                category: "fruits",
                description: "Manzana orgánica, crujiente y dulce."
            },
            {
                id: "3",
                name: "Green Lettuce",
                price: 8.00,
                oldPrice: 12.00,
                image: "img/product-3.jpg",
                category: "fresh",
                description: "Lechuga verde fresca y crocante."
            },
            {
                id: "4",
                name: "Carrot Bundle",
                price: 10.00,
                oldPrice: 15.00,
                image: "img/product-4.jpg",
                category: "vegetable",
                description: "Zanahorias orgánicas, ricas en vitamina A."
            },
            {
                id: "5",
                name: "Orange Juice",
                price: 25.00,
                oldPrice: 35.00,
                image: "img/product-5.jpg",
                category: "fruits",
                description: "Jugo de naranja 100% natural."
            },
            {
                id: "6",
                name: "Herb Mix",
                price: 12.00,
                oldPrice: 18.00,
                image: "img/product-6.jpg",
                category: "fresh",
                description: "Mezcla aromática de hierbas frescas."
            },
            {
                id: "7",
                name: "Red Bell Pepper",
                price: 14.00,
                oldPrice: 20.00,
                image: "img/product-7.jpg",
                category: "vegetable",
                description: "Pimiento rojo dulce y jugoso."
            },
            {
                id: "8",
                name: "Mixed Berries",
                price: 30.00,
                oldPrice: 40.00,
                image: "img/product-8.jpg",
                category: "fruits",
                description: "Mezcla de bayas frescas: fresas, arándanos y frambuesas."
            }
        ];

        // Guardamos los productos por defecto en localStorage
        localStorage.setItem('products', JSON.stringify(productosDefault));
        return productosDefault;
    }
}

/**
 * Renderiza los productos en un contenedor específico, filtrados por categoría.
 * @param {string} categoria - La categoría de productos a mostrar (e.g., 'vegetable')
 * @param {HTMLElement} contenedor - El elemento del DOM donde se inyectarán los productos.
 */
function renderizarProductosPorCategoria(categoria, contenedor) {
    const productos = obtenerProductos();
    const productosFiltrados = productos.filter(p => p.category === categoria);

    // Limpiamos el contenedor
    contenedor.innerHTML = '';

    if (productosFiltrados.length === 0) {
        contenedor.innerHTML = '<p class="text-center">No hay productos en esta categoría.</p>';
        return;
    }

    // Creamos un fragmento para mejorar el rendimiento
    const fragment = document.createDocumentFragment();

    productosFiltrados.forEach((producto, index) => {
        // Calculamos el delay para la animación Wow.js
        const delay = (index % 4) * 0.2 + 0.1; // 0.1s, 0.3s, 0.5s, 0.7s, y se repite

        const productoHTML = `
            <div class="col-xl-3 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="${delay}s">
                <div class="product-item">
                    <div class="position-relative bg-light overflow-hidden">
                        <img class="img-fluid w-100" src="${producto.image}" alt="${producto.name}">
                        <div class="bg-secondary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">New</div>
                    </div>
                    <div class="text-center p-4">
                        <a class="d-block h5 mb-2" href="#">${producto.name}</a>
                        <span class="text-primary me-1">$${producto.price.toFixed(2)}</span>
                        <span class="text-body text-decoration-line-through">$${producto.oldPrice ? producto.oldPrice.toFixed(2) : (producto.price * 1.5).toFixed(2)}</span>
                    </div>
                    <div class="d-flex border-top">
                        <small class="w-50 text-center border-end py-2">
                            <a class="text-body" href="#" onclick="verDetalle('${producto.id}')">
                                <i class="fa fa-eye text-primary me-2"></i>View detail
                            </a>
                        </small>
                        <small class="w-50 text-center py-2">
                            <a class="text-body" href="#" onclick="agregarAlCarrito('${producto.id}')">
                                <i class="fa fa-shopping-bag text-primary me-2"></i>Add to cart
                            </a>
                        </small>
                    </div>
                </div>
            </div>
        `;

        // Convertimos el string HTML en un nodo real
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = productoHTML;
        fragment.appendChild(tempDiv.firstChild);
    });

    // Agregamos el botón "Browse More Products" al final
    const botonHTML = `
        <div class="col-12 text-center wow fadeInUp" data-wow-delay="0.1s">
            <a class="btn btn-primary rounded-pill py-3 px-5" href="#">Browse More Products</a>
        </div>
    `;
    const tempBoton = document.createElement('div');
    tempBoton.innerHTML = botonHTML;
    fragment.appendChild(tempBoton.firstChild);

    // Inyectamos TODO el fragmento en el DOM (una sola operación -> más eficiente)
    contenedor.appendChild(fragment);

    // Re-inicializamos Wow.js para que las animaciones funcionen en los nuevos elementos
    if (window.WOW) {
        new WOW().init();
    }
}

/**
 * Función principal que inicializa todo.
 * Se ejecuta cuando el DOM está completamente cargado.
 */
function inicializarProductosDinamicos() {
    // Obtenemos las pestañas
    const tab1 = document.querySelector('#tab-1'); // Vegetable
    const tab2 = document.querySelector('#tab-2'); // Fruits
    const tab3 = document.querySelector('#tab-3'); // Fresh

    // Renderizamos productos en cada pestaña
    if (tab1) renderizarProductosPorCategoria('vegetable', tab1);
    if (tab2) renderizarProductosPorCategoria('fruits', tab2);
    if (tab3) renderizarProductosPorCategoria('fresh', tab3);

    // Opcional: Agregamos un evento para que, al cambiar de pestaña, se recarguen los productos
    // (útil si en el futuro agregas productos en tiempo real)
    document.querySelectorAll('.nav-pills .nav-link').forEach(link => {
        link.addEventListener('shown.bs.tab', function (e) {
            const target = e.target.getAttribute('href'); // #tab-1, #tab-2, etc.
            const categoriaMap = {
                '#tab-1': 'vegetable',
                '#tab-2': 'fruits',
                '#tab-3': 'fresh'
            };
            const categoria = categoriaMap[target];
            if (categoria && tab1 && tab2 && tab3) {
                const contenedor = document.querySelector(target);
                if (contenedor) {
                    renderizarProductosPorCategoria(categoria, contenedor);
                }
            }
        });
    });
}

// Funciones auxiliares para "View detail" y "Add to cart"

function verDetalle(id) {
    const productos = obtenerProductos();
    const producto = productos.find(p => p.id === id);
    if (producto) {
        // Por ahora, mostramos un alert. Puedes redirigir a una página de detalle.
        alert(`Detalle del Producto:\n\nNombre: ${producto.name}\nPrecio: $${producto.price}\nDescripción: ${producto.description}`);
    }
}

function agregarAlCarrito(id) {
    const productos = obtenerProductos();
    const producto = productos.find(p => p.id === id);
    if (producto) {
        // Obtenemos el carrito actual (si existe)
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        
        // Verificamos si el producto ya está en el carrito
        const productoEnCarrito = carrito.find(item => item.id === producto.id);
        if (productoEnCarrito) {
            productoEnCarrito.cantidad = (productoEnCarrito.cantidad || 1) + 1;
        } else {
            producto.cantidad = 1;
            carrito.push(producto);
        }

        // Guardamos el carrito actualizado
        localStorage.setItem('carrito', JSON.stringify(carrito));

        // Mostramos feedback al usuario
        alert(`${producto.name} ha sido agregado al carrito.`);
        
        // Actualizamos el contador del carrito en la navbar (si lo implementas)
        actualizarContadorCarrito();
    }
}

function actualizarContadorCarrito() {
    // Esta función actualiza un contador visual en el ícono del carrito.
    // Por ejemplo: <span id="cart-count">3</span>
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const totalItems = carrito.reduce((total, item) => total + (item.cantidad || 1), 0);
    
    const contador = document.querySelector('#cart-count'); // Asegúrate de tener este elemento en tu HTML
    if (contador) {
        contador.textContent = totalItems;
        contador.style.display = totalItems > 0 ? 'inline' : 'none';
    }
}

// Ejecutamos la inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    inicializarProductosDinamicos();
    
    // Si tienes un contador de carrito, lo actualizamos al cargar la página
    actualizarContadorCarrito();
});