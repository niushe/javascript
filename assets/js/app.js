
let total= 0; 
let cantidad= 0; 
let carritoProductos = JSON.parse(localStorage.getItem('carritoProductos')) || []; 
let itemBorrar; 

$(() =>{ 


const imprimirCarritoEnHtml = () => {
    $('#printHtml').empty(); 
    $('#montoTotal').empty(); 
    carritoProductos.forEach((item) => {
        precioCantidad = item.precio * item.cantidad;
        $('#printHtml').prepend(`<tr><th scope="row"><img src=${item.portada} width="70rem"></th>
                                <td>${item.titulo}</td>
                                <td>${item.codigo}</td>
                                <td>${item.cantidad}</td>
                                <td>$${precioCantidad}</td>
                                <td><button id="${item.codigo}" type="button" class="borrar btn btn-danger">X</button></td></tr>`);
        });
        borrarItem(); 
        $('#montoTotal').append(` $${montoTotalProductos()}`); 

        if(carritoProductos.length === 0) { 
            $('#carro-vacio').show();
        }else {
            $('#carro-vacio').hide(); 
        }
};

const montoTotalProductos = () => {
    total = 0;
    for(item of carritoProductos) {
        total += item.precio * item.cantidad;
    }
    return total;
}


const borrarItem = ()=> {
    const btnBorrarItem = document.querySelectorAll('tr button'); 
    btnBorrarItem.forEach(btn => {   
        btn.addEventListener("click", (e) => { 
            e.preventDefault(); 
            itemBorrar = parseInt(btn.id) 
                carritoProductos = JSON.parse(localStorage.getItem('carritoProductos')); 
                const indexItemBorrar = carritoProductos.findIndex(item => item.codigo === itemBorrar)
                carritoProductos.splice(indexItemBorrar, 1); 
                localStorage.setItem('carritoProductos', JSON.stringify(carritoProductos)); 
                imprimirCarritoEnHtml(); 
        });    
    });
};

const filtroPorTitulo = (titulo )=> carritoProductos.filter(producto => producto.titulo === titulo); 

imprimirCarritoEnHtml(carritoProductos); 

$('#btnCarro1').click((e) => { 
    e.preventDefault(); 
    cantidad = ((filtroPorTitulo('Yamaha-CP70')).length) + 1; 
    const item1 = new Carrito('Yamaha-CP70', 1, 3600, cantidad, "assets/img/yamaha-cp70.jpg"); 
    ingresoCarrito(item1);             
});

$('#btnCarro2').click((e) => { 
    e.preventDefault(); 
    cantidad = ((filtroPorTitulo('Yamaha-V20G')).length) + 1; 
    const item2 = new Carrito('Yamaha-V20G', 2, 1600, cantidad, "assets/img/yamaha-v20g.jpg"); 
    ingresoCarrito(item2); 
}); 

$('#btnCarro3').click((e) => { 
    e.preventDefault();
    cantidad = ((filtroPorTitulo('Rickenbacker 360')).length) + 1; 
    const item3 = new Carrito('Rickenbacker 360', 3, 3000, cantidad,"assets/img/rickenbacker360.jpg"); 
    ingresoCarrito(item3); 
}); 

$('#btnCarro4').click((e) => { 
    e.preventDefault(); 
    cantidad = ((filtroPorTitulo('Hofner 500/1')).length) + 1; 
    const item4 = new Carrito('Hofner 500/1', 4, 2500, cantidad, "assets/img/hofnerbass.jpg"); 
    ingresoCarrito(item4); 
}); 


const ingresoCarrito = (item) => {
    const existeItem = carritoProductos.some(producto => producto.codigo === item.codigo); 
    if(existeItem){
        const productos = carritoProductos.map(producto => { 
            if(producto.codigo === item.codigo){
                producto.cantidad++;
                return producto; 
            } else {
                return producto; 
            }
        })
        carritoProductos = [...productos]; 
    }else{
        carritoProductos= [...carritoProductos, item]; 
    } 
  localStorage.setItem('carritoProductos', JSON.stringify(carritoProductos)); 
  imprimirCarritoEnHtml(); 

}


class Carrito {
    constructor(titulo, codigo, precio, cantidad, portada) { 
        this.titulo = titulo;
        this.codigo = codigo;
        this.precio = precio;
        this.cantidad = cantidad;
        this.portada = portada;
    }  
}

$('#btnDeletAll').dblclick((e) => { 
    e.preventDefault(); 
    if(carritoProductos.length >0) {
            carritoProductos = [];
            localStorage.clear();
            imprimirCarritoEnHtml(); 
        }
    
}); 

});
