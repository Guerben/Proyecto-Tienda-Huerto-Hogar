document.addEventListener('DOMContentLoaded', function(){
// DOM Elements
const ProductListSection = document.getElementById('product-list');
const ProductFormSection = document.getElementById('product-form');
const ProductsContainer = document.getElementById('products-container');
const formProduct = document.getElementById('form-product');
const formTitle = document.getElementById('form-title');
const btnAddProduct = document.getElementById('btn-add-product');
const btnCancel = document.getElementById('btn-cancel');
const btnLogout = document.getElementById('btn-logout');

// Campos del formulario
const productIdInput = document.getElementById('product-id');
const productNameInput = document.getElementById('product-name');
const ProductPriceInput = document.getElementById('product-price');
const ProductImageInput = document.getElementById('product-image');
const ProductCategorySelect = document.getElementById('product-category');
const ProductDescriptionInput = document.getElementById('product-description');

// Estado: estamos editando?
let isEditing = false;

// Funciones ---------------------------------

// Utilidad para escapar texto antes de insertarlo como HTML
function escapeHTML(str) {
    if (typeof str !== "string") return "";
    return str.replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

// 1. Cargar productos desde localStorage

function loadProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    renderProducts(products)
}

// 2. Renderizar productos en el DOM
function renderProducts(products) {
    ProductsContainer.innerHTML = ''; // Limpiar contenedor

    if(products.length === 0) {
        ProductsContainer.innerHTML = '<p>No hay productos aun. ¡Agrega uno!</p>';
        return;
    }

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${escapeHTML(product.image)}" alt="${escapeHTML(product.name)}">
            <h3>${escapeHTML(product.name)}</h3>
            <p class="price">$${product.price.toFixed(2)}</p>
            <p><strong>Categoría:</strong> ${escapeHTML(product.category)}</p>
            <p>${product.description ? escapeHTML(product.description) : 'Sin descripción'}</p>
            <div class="buttons">
                <button class="btn-edit" data-id="${escapeHTML(product.id)}">Editar</button>
                <button class="btn-delete" data-id="${escapeHTML(product.id)}">Eliminar</button>
            </div>
        `;
        ProductsContainer.appendChild(productCard);
        
    });

    // Agregar eventos a los botones de Editar y Eliminar
    document.querySelectorAll('.btn-edit').forEach(button => {
        button.addEventListener('click', handleEditProduct);
    });

    document.querySelectorAll('.btn-delete').forEach(button => {
        button.addEventListener('click', handleDeleteProduct);
    });

}

// 3. Mostrar/ocultar formulario
function toggleForm(show= true) {
    if (show) {
        ProductListSection.style.display = 'none';
        ProductFormSection.style.display = 'block';
    } else {
        ProductListSection.style.display = 'block';
        ProductFormSection.style.display = 'none';
    }
}

// 4. Manejar envio del formulario
function handleFormSubmit(e) {
    e.preventDefault();
    console.log("Formulario enviado")

    const product = {
        id: productIdInput.value || Date.now().toString(), // si no hay id se genera uno con timestamp
        name: productNameInput.value.trim(),
        price: parseFloat(ProductPriceInput.value),
        image: ProductImageInput.value.trim(),
        category: ProductCategorySelect.value,
        description: ProductDescriptionInput.value.trim()
    };

    console.log("Producto a guardar:", product)

    // Validacion basica
    if (!product.name || !product.price || !product.image || !product.category) {
        alert('Por favor, completa todos los campos obligatorios.');
        return;
    }

    const products = JSON.parse(localStorage.getItem('products')) || [];
    console.log("Productos actuales:", products)

    if (isEditing) {
        // Editar: encontrar y reemplazar
        const index = products.findIndex(p => p.id === product.id);
        if (index !== -1) {
            products[index] = product;
        }
    else 
        {
        // crear: agregar al final
        products.push(product);
    }
    
    }
    // Guardar en localStorage
    localStorage.setItem('products', JSON.stringify(products));
    console.log(" Productos guardados en localStorage:", products)

    // Resetear formulario y volver a la lista
    resetForm();
    loadProducts();
    toggleForm(false);

}


// 5. Manejar edicion de producto
function handleEditProduct(e) {
    const productId = e.target.getAttribute('data-id');
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products.find(p => p.id === productId);

    if (product) {
        // Rellenar formulario
        productIdInput.value = product.id;
        productNameInput.value = product.name;
        ProductPriceInput.value = product.price;
        ProductImageInput.value = product.image;
        ProductCategorySelect.value = product.category;
        ProductDescriptionInput.value = product.description || '';

        // Cambiar titulo y estado
        formTitle.textContent = 'Editar Producto';
        isEditing = true;

        // mostrar formulario
        toggleForm(true);
    }
}

// 6. Manejar eliminacion de producto
function handleDeleteProduct(e) {
    if (!confirm('¿Estas seguro de eliminar este producto?')) return;

    const productId = e.target.getAtribute('data-id');
    let products = JSON.parse(localStorage.getItem('products')) || [];

    products = products.filter(p => p.id !== productId);

    localStorage.setItem('products', JSON.stringify(products));
    loadProducts(); // recargar lista
}


// 7. Resetear formulario
function resetForm() {
    if (formProduct) formProduct.reset();
    if (productIdInput) productIdInput.value ='';
    isEditing = false;
    if (formTitle) formTitle.textContent = 'Agregar Nuevo Producto';
}

// 8. Manejar cierre de sesion 
function handleLogout() {
    alert('Sesion cerrada');
    window.location.href = '../login.html' // Redirigir al inicio
}


// Event Listeners

btnAddProduct.addEventListener('click', () => {
    resetForm();
    toggleForm(true);
});

btnCancel.addEventListener('click', () => {
    toggleForm(false);
});

formProduct.addEventListener('submit', handleFormSubmit);

btnLogout.addEventListener('click', handleLogout);

loadProducts();

});