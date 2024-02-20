let carrito = [];
let total = 0;


function agregarAlCarrito(precio) {
    carrito.push(precio);
    actualizarCarrito();
}

function actualizarCarrito() {
    const carritoLista = document.getElementById('carrito-lista');
    const totalElemento = document.getElementById('total');
    
    carritoLista.innerHTML = '';
    total = 0;


    carrito.forEach((precio, index) => {
        total += precio;
        carritoLista.innerHTML += `
            <li>
                    producto ${index + 1}: $${precio}
                <i class="fas fa-times" onclick="eliminarProducto(${index})"></i>
            </li>`;
    });

    totalElemento.textContent = total;
}

function eliminarProducto(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

function pagar() {
    const productosComprados = carrito.slice(); // Copia el arreglo de carrito
    carrito = []; // Reinicia el carrito después de pagar
    actualizarCarrito();
    
    // Enviar los productos comprados al backend Flask
    fetch('/compra', {
        method: 'POST',

        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productos: productosComprados })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message);
        alert("¡Gracias por su compra!");
    })
    .catch(error => {
        console.error('Error:', error);
        alert("Hubo un error al procesar la compra");
    });
}