//comienzo de la función de búsqueda
    
    // Lista de productos 
const productos = [
    { id: "FR001", nombre: "Manzanas Fuji", categoria: "Frutas Frescas" },
    { id: "FR002", nombre: "Naranjas Valencia", categoria: "Frutas Frescas" },
    { id: "FR003", nombre: "Plátanos Cavendish", categoria: "Frutas Frescas" },
    { id: "VR001", nombre: "Zanahorias Orgánicas", categoria: "Verduras Orgánicas" },
    { id: "VR002", nombre: "Espinacas Frescas", categoria: "Verduras Orgánicas" },
    { id: "VR003", nombre: "Pimientos Tricolores", categoria: "Verduras Orgánicas" },
    { id: "PO001", nombre: "Miel Orgánica", categoria: "Productos Orgánicos" },
    { id: "PO003", nombre: "Quinua Orgánica", categoria: "Productos Orgánicos" },
    { id: "PL001", nombre: "Leche Entera", categoria: "Productos Lácteos" }
];

// Función para mostrar los resultados de la búsqueda
function searchProductos(query) {
    const resultados = productos.filter(producto => {
        return producto.nombre.toLowerCase().includes(query.toLowerCase()) ||
               producto.categoria.toLowerCase().includes(query.toLowerCase());
    });

    mostrarResultados(resultados);
}

// Mostrar los resultados en la página
function mostrarResultados(resultados) {
    const resultadosDiv = document.getElementById('search-results');
    if (!resultadosDiv) {
        return;
    }

    resultadosDiv.innerHTML = ''; // Limpiar resultados previos

    if (resultados.length === 0) {
        resultadosDiv.innerHTML = '<p>No se encontraron resultados.</p>';
        return;
    }

    resultados.forEach(producto => {
        const divProducto = document.createElement('div');
        divProducto.classList.add('result-item');
        divProducto.innerHTML = `<h5>${producto.nombre}</h5><p>${producto.categoria}</p>`;
        resultadosDiv.appendChild(divProducto);
    });
}

// Función para mostrar u ocultar el campo de búsqueda
function toggleSearch() {
    const searchInput = document.getElementById('search-input');
    if (searchInput.style.display === 'none' || searchInput.style.display === '') {
        searchInput.style.display = 'block';
        searchInput.focus();
    } else {
        searchInput.style.display = 'none';
    }
}

// Event listener para realizar la búsqueda en tiempo real
document.getElementById('search-input').addEventListener('input', function() {
    searchProductos(this.value);
});
// fin de la función de búsqueda