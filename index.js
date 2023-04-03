const productos = [
    {
        id: 1,
        marca: "TV Philips",
        pulgadas: 50,
        precio: 106000,
        cantidad: 20,
       
    },
    {
        id: 2,
        marca: "TV TCL",
        pulgadas: 40,
        precio: 66000,
        cantidad: 15,
    },
    {
        id: 3,
        marca: "TV Samsung",
        pulgadas: 55,
        precio: 250000,
        cantidad: 10,
    },

    {
        id: 4,
        marca: "TV Admiral",
        pulgadas: 32,
        precio: 251000,
        cantidad: 50,
    },

];


let carrito = [];
const divisa = '$';
const DOMitems = document.querySelector('#items');
const DOMcarrito = document.querySelector('#carrito');
const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.querySelector('#boton-vaciar');


function renderizarProductos() {
    productos.forEach((info) => {
       
        const miNodo = document.createElement('div');
        miNodo.classList.add('card', 'col-sm-4');
        
        const miNodoCardBody = document.createElement('div');
        miNodoCardBody.classList.add('card-body');
        
        const miNodoTitle = document.createElement('h5');
        miNodoTitle.classList.add('card-title');
        miNodoTitle.textContent = info.marca;
                  
        const miNodoPrecio = document.createElement('p');
        miNodoPrecio.classList.add('card-text');
        miNodoPrecio.textContent = `${info.precio}${divisa}`;
    
        const miNodoBoton = document.createElement('button');
        miNodoBoton.classList.add('btn', 'btn-primary');
        miNodoBoton.textContent = '+';
        miNodoBoton.setAttribute('marcador', info.id);
        miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
        
               
        miNodoCardBody.appendChild(miNodoTitle);
        miNodoCardBody.appendChild(miNodoPrecio);
        miNodoCardBody.appendChild(miNodoBoton);
        miNodo.appendChild(miNodoCardBody);
        DOMitems.appendChild(miNodo);
    });
}


function anyadirProductoAlCarrito(evento) {
   
    carrito.push(evento.target.getAttribute('marcador'))
    
    renderizarCarrito();

}


function renderizarCarrito() {
    
    DOMcarrito.textContent = '';
    
    const carritoSinDuplicados = [...new Set(carrito)];
    
    carritoSinDuplicados.forEach((item) => {
        
        const miItem = productos.filter((itemProductos) => {
            
            return itemProductos.id === parseInt(item);
        });
        
        const numeroUnidadesItem = carrito.reduce((total, itemId) => {
            
            return itemId === item ? total += 1 : total;
        }, 0);
        
        const miNodo = document.createElement('li');
        miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
        miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa}`;
        
        const miBoton = document.createElement('button');
        miBoton.classList.add('btn', 'btn-danger', 'mx-5');
        miBoton.textContent = 'X';
        miBoton.style.marginLeft = '1rem';
        miBoton.dataset.item = item;
        miBoton.addEventListener('click', borrarItemCarrito);
        
        miNodo.appendChild(miBoton);
        DOMcarrito.appendChild(miNodo);
    });
    
    DOMtotal.textContent = calcularTotal();
}


function borrarItemCarrito(evento) {
    
    const id = evento.target.dataset.item;
    
    carrito = carrito.filter((carritoId) => {
        return carritoId !== id;
    });
    
    renderizarCarrito();
}


function calcularTotal() {
 
    return carrito.reduce((total, item) => {
        
        const miItem = productos.filter((itemProductos) => {
            return itemProductos.id === parseInt(item);
        });
        
        return total + miItem[0].precio;
    }, 0).toFixed(2);
}

function vaciarCarrito() {
   
    carrito = [];
    
    renderizarCarrito();
}


DOMbotonVaciar.addEventListener('click', vaciarCarrito);


renderizarProductos();
renderizarCarrito();

