var save = localStorage.getItem('theme');
// DOM BASE DE DATOS
{
    let base;
    var productosFoto = {};

    // OBTENER base-de-datos.js
    async function fetchFileContent() {
        const url = 'https://raw.githubusercontent.com/Flinch101/base-de-datos/main/base-de-datos.js';

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const text = await response.text();
            return text;
        } catch (error) {
            console.error('Error fetching file:', error);
            return null;
        }
    }

    // DOM
    fetchFileContent().then(content => {
        // DOM
        if (content) {
            base = eval(content);

            for(let i=0; i<base.length; i++){
                let producto = base[i];
                let nombre = producto[0];
                let precio = producto[1];
                let fotos = producto[2];
                let desc = producto[3];
                let msjWSP = producto[4];
                let nuevoUsado = producto[5];
                let cantidadFotos = producto[6];
                productosFoto[i+1] = cantidadFotos;
            
                let containerdentro = document.querySelector('main > .container-dentro');
                
                let divProducto = document.createElement('div');
                divProducto.className = 'producto ' + (i + 1);
                divProducto.id = 'producto' + nuevoUsado
                    let pTitulo = document.createElement('p');
                    pTitulo.className = 'titulo';
                    pTitulo.innerHTML = nombre;
                    let imgProducto = document.createElement('img');
                    imgProducto.className = 'producto-foto';
                    imgProducto.src = fotos[0];
                    let divCarrousel = document.createElement('div');
                    divCarrousel.className = 'carrousel-botones';
                        let btIzq = document.createElement('button');
                        btIzq.id = 'carrousel-izq';
                        btIzq.innerHTML = '<i class="icon-left-open"></i>'
                        let btDer = document.createElement('button');
                        btDer.id = 'carrousel-der';
                        btDer.innerHTML = '<i class="icon-right-open"></i>'
                    let divDesc = document.createElement('div');
                    divDesc.className = 'desc';
                        let pDesc = document.createElement('p');
                        pDesc.className = 'descripcion';
                        pDesc.innerHTML = desc;
                    let pPrecio = document.createElement('p');
                    pPrecio.className = 'precio';
                    pPrecio.innerHTML = precio;
                    let divContacto = document.createElement('div');
                    divContacto.className = 'contacto';
                        let a = document.createElement('a');
                        a.href = msjWSP;
                        a.target = '_blank';
                        a.className = 'whatsapp';
                        a.innerHTML = "Contactar vía WhatsApp";
                        let imgWSP = document.createElement('i');
                        imgWSP.innerHTML = '<i class="icon-whatsapp"></i>';
                    
                    containerdentro.appendChild(divProducto);

                    divProducto.appendChild(pTitulo);
                    if(cantidadFotos > 1){
                        divCarrousel.appendChild(btIzq);
                        divCarrousel.appendChild(btDer);
                        divCarrousel.appendChild(imgProducto);
                        divProducto.appendChild(divCarrousel);
                    }
                    else {
                        divProducto.appendChild(imgProducto);
                    }

                    divDesc.appendChild(pDesc);
                    divProducto.appendChild(divDesc)
                    divProducto.appendChild(pPrecio);

                    a.appendChild(divContacto);
                    a.appendChild(imgWSP);
                    divProducto.appendChild(a);
            }
        }

        // THEME
        {
            function toDark(){
                // document.querySelector('body').style.backgroundColor = 'rgb(15,15,15)';
                document.querySelector('body').classList.toggle('dark');
                document.querySelectorAll('header, main, footer').forEach(element => {
                    element.classList.toggle('dark-section');
                });
                document.querySelectorAll('.producto').forEach(element => {
                    element.classList.toggle('dark-border');
                });
                document.querySelectorAll('.menu-desplegable button, .buscador input').forEach(element => {
                    element.classList.toggle('dark-background-light');
                });
                document.querySelectorAll('p, input, button, i.icon-search').forEach(element => {
                    element.classList.toggle('dark-text');
                });
                document.querySelectorAll('i.icon-right-open, i.icon-left-open').forEach(element => {
                    element.classList.toggle('texto-negro');
                });
                document.querySelector('input').classList.toggle('dark-input');
                document.querySelector('input').classList.toggle('dark-pebe');
            }

            let buttonTheme = document.getElementById("theme");
            {
                if(save !== null) {
                    if (save == 'dark'){
                        toDark();
                        buttonTheme.className = 'icon-toggle-on';
                        buttonTheme.classList.toggle('dark-text');
                        document.querySelectorAll('.logo img').forEach(elemento => {
                            elemento.src = 'https://raw.githubusercontent.com/Flinch101/base-de-datos/main/iconos/icono-dark.png';
                        });
                    }
                }
            }
            buttonTheme.addEventListener('click', () => {
                let save = localStorage.getItem('theme');
                let toTheme;
                if(save !== null) {
                    if (save == 'default'){
                        toTheme = 'dark';
                        buttonTheme.className = 'icon-toggle-on';
                        buttonTheme.classList.toggle('dark-text');
                        document.querySelectorAll('.logo img').forEach(elemento => {
                            elemento.src = 'https://raw.githubusercontent.com/Flinch101/base-de-datos/main/iconos/icono-dark.png';
                        });
                        toDark();
                    }
                    else {
                        toTheme = 'default';
                        buttonTheme.className = 'icon-toggle-off';
                        toDark();
                        document.querySelectorAll('.logo img').forEach(elemento => {
                            elemento.src = 'https://raw.githubusercontent.com/Flinch101/base-de-datos/main/iconos/icono-white.png';
                        });
                    }
                }
                else {
                    toTheme = 'dark';
                    buttonTheme.className = 'icon-toggle-on';
                    document.querySelectorAll('.logo img').forEach(elemento => {
                        elemento.src = 'https://raw.githubusercontent.com/Flinch101/base-de-datos/main/iconos/icono-dark.png';
                    });
                    buttonTheme.classList.toggle('dark-text');
                    toDark();
                }

                localStorage.setItem('theme', toTheme);
            });
        }

        // FUNCIONES
        {
            var buttonNuevo = document.getElementById("button_nuevos");
            var buttonUsados = document.getElementById("button_usados");
            var buttonTodos = document.getElementById("button_todos");
            buttonTodos.style.backgroundColor = 'rgb(155, 245, 143)';
            
            var input = document.getElementById("buscador");
            
            var listaDeProductos = [];
            var estaBuscando = false;
            var lastCategoria = 'todos';
            
            var buttonDeslizarIzq = document.querySelectorAll('#carrousel-izq');
            var buttonDeslizarDer = document.querySelectorAll('#carrousel-der');
            
            document.querySelectorAll('.producto').forEach(producto => {
                listaDeProductos.push(producto);
            });
            
            buttonDeslizarIzq.forEach(button => {
                button.addEventListener('click', () => {
                    let img = button.nextElementSibling.nextElementSibling;
                    let srcImg = img.src.substring(img.src.indexOf("producto_"), img.src.length);
                    let imgParticion = srcImg.split("_");
                    imgParticion[2] = imgParticion[2].split(".");
                    
                    let productoActual = parseInt(imgParticion[1]);
                    let fotoNumero = parseInt(imgParticion[2][0]);
                    let extension = imgParticion[2][1];
                    let fotoMaxima = productosFoto[productoActual];

                    let siguienteFotoFunction = (foto) => {
                        if(foto - 1 == 0) {
                            return fotoMaxima;
                        }
                        else {
                            return foto - 1;
                        }
                    }
            
                    img.src = "https://raw.githubusercontent.com/Flinch101/base-de-datos/main/productos/producto_" + productoActual + "_" +siguienteFotoFunction(fotoNumero) + "." + extension; 
                });
            });
            
            buttonDeslizarDer.forEach(button => {
                button.addEventListener('click', () => {
                    let img = button.nextElementSibling;
                    let srcImg = img.src.substring(img.src.indexOf("producto_"), img.src.length);
                    let imgParticion = srcImg.split("_");
                    imgParticion[2] = imgParticion[2].split(".");
                    
                    let productoActual = parseInt(imgParticion[1]);
                    let fotoNumero = parseInt(imgParticion[2][0]);
                    let extension = imgParticion[2][1];
            
                    let siguienteFotoFunction = (foto) => {
                        if(foto + 1 > productosFoto[productoActual]) {
                            return 1;
                        }
                        else {
                            return foto + 1;
                        }
                    }
            
                    img.src = "https://raw.githubusercontent.com/Flinch101/base-de-datos/main/productos/producto_" + productoActual + "_" +siguienteFotoFunction(fotoNumero) + "." + extension; 
                });
            });
            
            let productosUsados = document.querySelectorAll('#productousado');
            let productosNuevos = document.querySelectorAll('#productonuevo');
            
            buttonTodos.style.backgroundColor = 'rgb(155, 245, 143)';
            
            buttonTodos.addEventListener('click', () => {
                if(estaBuscando == false){
                    buttonTodos.style.backgroundColor = 'rgb(155, 245, 143)';
                    if(save !== null && save == 'dark'){
                        buttonNuevo.style.backgroundColor = 'rgb(100, 100, 100)';
                        buttonUsados.style.backgroundColor = 'rgb(100, 100, 100)';
                    }
                    else {
                        buttonNuevo.style.backgroundColor = 'rgb(235, 235, 235)';
                        buttonUsados.style.backgroundColor = 'rgb(235, 235, 235)';
                    }
                    
                    for(let i=0; i<productosUsados.length; i++){
                        productosUsados[i].style.display = 'grid';
                    }
                    for(let i=0; i<productosNuevos.length; i++){
                        productosNuevos[i].style.display = 'grid';
                    }
                    lastCategoria = 'todos';

                    if(productosNuevos.length + productosUsados.length == 1){
                        document.querySelector('main > .container-dentro').style.gridTemplateColumns = "repeat(1, 30%)";
                        document.querySelector('main > .container-dentro').style.justifyContent = "space-evenly";
                    }
                    else if(productosNuevos.length + productosUsados.length == 2){
                        document.querySelector('main > .container-dentro').style.gridTemplateColumns = "repeat(2, 30%)";
                        document.querySelector('main > .container-dentro').style.justifyContent = "space-evenly";
                    }
                    else if(productosNuevos.length + productosUsados.length >= 3){
                        document.querySelector('main > .container-dentro').style.gridTemplateColumns = "repeat(3, 30%)";
                        document.querySelector('main > .container-dentro').style.justifyContent = "space-evenly";
                    }
                }
            });
            
            buttonNuevo.addEventListener('click', () => {
                if(estaBuscando == false){
                    buttonNuevo.style.backgroundColor = 'rgb(155, 245, 143)';
                    buttonTodos.style.backgroundColor = 'rgb(235, 235, 235)';
                    if(save !== null && save == 'dark'){
                        buttonTodos.style.backgroundColor = 'rgb(100, 100, 100)';
                        buttonUsados.style.backgroundColor = 'rgb(100, 100, 100)';
                    }
                    else {
                        buttonTodos.style.backgroundColor = 'rgb(235, 235, 235)';
                        buttonUsados.style.backgroundColor = 'rgb(235, 235, 235)';
                    }
            
                    for(let i=0; i<productosUsados.length; i++){
                        productosUsados[i].style.display = 'none';
                    }
                    for(let i=0; i<productosNuevos.length; i++){
                        productosNuevos[i].style.display = 'grid';
                    }
                    lastCategoria = 'nuevos';

                    productosNuevos.forEach(resultado => {
                        if(productosNuevos.length == 1){
                            resultado.parentElement.style.gridTemplateColumns = "repeat(1, 30%)";
                            resultado.parentElement.style.justifyContent = "space-evenly";
                        }
                        else if(productosNuevos.length == 2){
                            resultado.parentElement.style.gridTemplateColumns = "repeat(2, 30%)";
                            resultado.parentElement.style.justifyContent = "space-evenly";
                        }
                        else {
                            resultado.parentElement.style.gridTemplateColumns = "repeat(3, 30%)";
                            resultado.parentElement.style.justifyContent = "space-evenly";
                        }
                    });
                }
            });
            
            buttonUsados.addEventListener('click', () => {
                if(estaBuscando == false){
                    buttonUsados.style.backgroundColor = 'rgb(155, 245, 143)';
                    if(save !== null && save == 'dark'){
                        buttonNuevo.style.backgroundColor = 'rgb(100, 100, 100)';
                        buttonTodos.style.backgroundColor = 'rgb(100, 100, 100)';
                    }
                    else {
                        buttonNuevo.style.backgroundColor = 'rgb(235, 235, 235)';
                        buttonTodos.style.backgroundColor = 'rgb(235, 235, 235)';
                    }
            
                    for(let i=0; i<productosNuevos.length; i++){
                        productosNuevos[i].style.display = 'none';
                    }
                    for(let i=0; i<productosUsados.length; i++){
                        productosUsados[i].style.display = 'grid';
                    }
                    lastCategoria = 'usados';

                    productosUsados.forEach(resultado => {
                        if(productosUsados.length == 1){
                            resultado.parentElement.style.gridTemplateColumns = "repeat(1, 30%)";
                            resultado.parentElement.style.justifyContent = "space-evenly";
                        }
                        else if(productosUsados.length == 2){
                            resultado.parentElement.style.gridTemplateColumns = "repeat(2, 30%)";
                            resultado.parentElement.style.justifyContent = "space-evenly";
                        }
                        else {
                            resultado.parentElement.style.gridTemplateColumns = "repeat(3, 30%)";
                            resultado.parentElement.style.justifyContent = "space-evenly";
                        }
                    });
                }
            });
            
            input.addEventListener('input', () => {
                if(input.value.length > 0) {
                    estaBuscando = true;
                    if(save !== null && save == 'dark'){
                        buttonNuevo.style.backgroundColor = 'rgb(100, 100, 100)';
                        buttonTodos.style.backgroundColor = 'rgb(100, 100, 100)';
                        buttonUsados.style.backgroundColor = 'rgb(100, 100, 100)';
                    }
                    else {
                        buttonNuevo.style.backgroundColor = 'rgb(235, 235, 235)';
                        buttonTodos.style.backgroundColor = 'rgb(235, 235, 235)';
                        buttonUsados.style.backgroundColor = 'rgb(235, 235, 235)';
                    }
            
                    const resultados = listaDeProductos.filter(
                        palabra => palabra.children[0].textContent.toLowerCase().includes(input.value.toLowerCase())
                    );
                    for(let i=0; i<productosNuevos.length; i++){
                        productosNuevos[i].style.display = 'none';
                    }
                    for(let i=0; i<productosUsados.length; i++){
                        productosUsados[i].style.display = 'none';
                    }
                    resultados.forEach(resultado => {
                        resultado.style.display = 'grid';
                        if(resultados.length == 1){
                            resultado.parentElement.style.gridTemplateColumns = "repeat(1, 30%)";
                            resultado.parentElement.style.justifyContent = "space-evenly";
                        }
                        else if(resultados.length == 2){
                            resultado.parentElement.style.gridTemplateColumns = "repeat(2, 30%)";
                            resultado.parentElement.style.justifyContent = "space-evenly";
                        }
                        else if(resultados.length == 3){
                            resultado.parentElement.style.gridTemplateColumns = "repeat(3, 30%)";
                            resultado.parentElement.style.justifyContent = "space-evenly";
                        }
                    });
                }
                else {
                    estaBuscando = false;
                    switch(lastCategoria){
                        case "todos":
                            if(save !== null && save == 'dark'){
                                buttonNuevo.style.backgroundColor = 'rgb(100, 100, 100)';
                                buttonTodos.style.backgroundColor = 'rgb(155, 245, 143)';
                                buttonUsados.style.backgroundColor = 'rgb(100, 100, 100)';
                            }
                            else {
                                buttonNuevo.style.backgroundColor = 'rgb(235, 235, 235)';
                                buttonTodos.style.backgroundColor = 'rgb(155, 245, 143)';
                                buttonUsados.style.backgroundColor = 'rgb(235, 235, 235)';
                            }
            
                            for(let i=0; i<productosUsados.length; i++){
                                productosUsados[i].style.display = 'grid';
                            }
                            for(let i=0; i<productosNuevos.length; i++){
                                productosNuevos[i].style.display = 'grid';
                            }
                            lastCategoria = 'todos';

                            if(productosNuevos.length + productosUsados.length == 1){
                                document.querySelector('main > .container-dentro').style.gridTemplateColumns = "repeat(1, 30%)";
                                document.querySelector('main > .container-dentro').style.justifyContent = "space-evenly";
                            }
                            else if(productosNuevos.length + productosUsados.length == 2){
                                document.querySelector('main > .container-dentro').style.gridTemplateColumns = "repeat(2, 30%)";
                                document.querySelector('main > .container-dentro').style.justifyContent = "space-evenly";
                            }
                            else if(productosNuevos.length + productosUsados.length >= 3){
                                document.querySelector('main > .container-dentro').style.gridTemplateColumns = "repeat(3, 30%)";
                                document.querySelector('main > .container-dentro').style.justifyContent = "space-evenly";
                            }
                            break;
                        case "nuevos":
                            if(save !== null && save == 'dark'){
                                buttonNuevo.style.backgroundColor = 'rgb(155, 245, 143)';
                                buttonTodos.style.backgroundColor = 'rgb(100, 100, 100)';
                                buttonUsados.style.backgroundColor = 'rgb(100, 100, 100)';
                            }
                            else {
                                buttonNuevo.style.backgroundColor = 'rgb(155, 245, 143)';
                                buttonTodos.style.backgroundColor = 'rgb(235, 235, 235)';
                                buttonUsados.style.backgroundColor = 'rgb(235, 235, 235)';
                            }
            
                            for(let i=0; i<productosUsados.length; i++){
                                productosUsados[i].style.display = 'none';
                            }
                            for(let i=0; i<productosNuevos.length; i++){
                                productosNuevos[i].style.display = 'grid';
                            }
                            lastCategoria = 'nuevos';

                            productosNuevos.forEach(resultado => {
                                if(productosNuevos.length == 1){
                                    resultado.parentElement.style.gridTemplateColumns = "repeat(1, 30%)";
                                    resultado.parentElement.style.justifyContent = "space-evenly";
                                }
                                else if(productosNuevos.length == 2){
                                    resultado.parentElement.style.gridTemplateColumns = "repeat(2, 30%)";
                                    resultado.parentElement.style.justifyContent = "space-evenly";
                                }
                                else {
                                    resultado.parentElement.style.gridTemplateColumns = "repeat(3, 30%)";
                                    resultado.parentElement.style.justifyContent = "space-evenly";
                                }
                            });
                            break;
                        case "usados":
                            if(save !== null && save == 'dark'){
                                buttonNuevo.style.backgroundColor = 'rgb(100, 100, 100)';
                                buttonTodos.style.backgroundColor = 'rgb(100, 100, 100)';
                                buttonUsados.style.backgroundColor = 'rgb(155, 245, 143)';
                            }
                            else {
                                buttonNuevo.style.backgroundColor = 'rgb(235, 235, 235)';
                                buttonTodos.style.backgroundColor = 'rgb(235, 235, 235)';
                                buttonUsados.style.backgroundColor = 'rgb(155, 245, 143)';
                            }
                    
                            for(let i=0; i<productosNuevos.length; i++){
                                productosNuevos[i].style.display = 'none';
                            }
                            for(let i=0; i<productosUsados.length; i++){
                                productosUsados[i].style.display = 'grid';
                            }
                            lastCategoria = 'usados';
                            productosUsados.forEach(resultado => {
                                if(productosUsados.length == 1){
                                    resultado.parentElement.style.gridTemplateColumns = "repeat(1, 30%)";
                                    resultado.parentElement.style.justifyContent = "space-evenly";
                                }
                                else if(productosUsados.length == 2){
                                    resultado.parentElement.style.gridTemplateColumns = "repeat(2, 30%)";
                                    resultado.parentElement.style.justifyContent = "space-evenly";
                                }
                                else {
                                    resultado.parentElement.style.gridTemplateColumns = "repeat(3, 30%)";
                                    resultado.parentElement.style.justifyContent = "space-evenly";
                                }
                            });
                            break;
                    }
                }
            });
        }
    });
}
