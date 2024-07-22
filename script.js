// DOM BASE DE DATOS
{
    let base;
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

    // Ejemplo de uso:
    fetchFileContent().then(content => {
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
                        let btDer = document.createElement('button');
                        btDer.id = 'carrousel-der';
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
                        let imgWSP = document.createElement('img');
                        imgWSP.src = 'https://raw.githubusercontent.com/Flinch101/base-de-datos/main/iconos/whatsapp-logo.webp';
                    
                    containerdentro.appendChild(divProducto);

                    divProducto.appendChild(pTitulo);
                    divProducto.appendChild(imgProducto);

                    divCarrousel.appendChild(btIzq);
                    divCarrousel.appendChild(btDer);
                    divProducto.appendChild(divCarrousel);

                    divProducto.appendChild(pDesc);
                    divProducto.appendChild(pPrecio);

                    divContacto.appendChild(a);
                    divContacto.appendChild(imgWSP);
                    divProducto.appendChild(divContacto);
            }
        }

        // FUNCIONES
        {
            var buttonNuevo = document.getElementById("button_nuevos");
            var buttonUsados = document.getElementById("button_usados");
            var buttonTodos = document.getElementById("button_todos");
            
            var input = document.getElementById("buscador");
            
            var listaDeProductos = [];
            var estaBuscando = false;
            var lastCategoria = 'todos';
            
            var buttonDeslizarIzq = document.querySelectorAll('#carrousel-izq');
            var buttonDeslizarDer = document.querySelectorAll('#carrousel-der');
            var productosFoto = {
                1: 4,
                2: 1
            };
            
            document.querySelectorAll('.producto').forEach(producto => {
                listaDeProductos.push(producto);
            });
            
            buttonDeslizarIzq.forEach(button => {
                button.addEventListener('click', () => {
                    let img = button.parentElement.previousElementSibling;
                    let srcImg = img.src.substring(img.src.indexOf("producto_"), img.src.length);
                    let imgParticion = srcImg.split("_");
                    imgParticion[2] = imgParticion[2].split(".");
                    
                    let productoActual = parseInt(imgParticion[1]);
                    let fotoNumero = parseInt(imgParticion[2][0]);
                    let extension = imgParticion[2][1];
            
                    let siguienteFotoFunction = (foto) => {
                        if(foto - 1 == 0) {
                            return 3;
                        }
                        else {
                            return foto - 1;
                        }
                    }
            
                    img.src = "./productos/producto_" + productoActual + "_" +siguienteFotoFunction(fotoNumero) + "." + extension; 
                });
            });
            
            buttonDeslizarDer.forEach(button => {
                button.addEventListener('click', () => {
                    let img = button.parentElement.previousElementSibling;
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
            
                    img.src = "./productos/producto_" + productoActual + "_" +siguienteFotoFunction(fotoNumero) + "." + extension; 
                });
            });
            
            let productosUsados = document.querySelectorAll('#productousado');
            let productosNuevos = document.querySelectorAll('#productonuevo');
            
            buttonTodos.style.backgroundColor = 'rgb(155, 245, 143)';
            
            buttonTodos.addEventListener('click', () => {
                if(estaBuscando == false){
                    buttonNuevo.style.backgroundColor = 'rgb(235, 235, 235)';
                    buttonUsados.style.backgroundColor = 'rgb(235, 235, 235)';
                    buttonTodos.style.backgroundColor = 'rgb(155, 245, 143)';
            
                    for(let i=0; i<productosUsados.length; i++){
                        productosUsados[i].style.display = 'flex';
                    }
                    for(let i=0; i<productosNuevos.length; i++){
                        productosNuevos[i].style.display = 'flex';
                    }
                    lastCategoria = 'todos';
                }
            });
            
            buttonNuevo.addEventListener('click', () => {
                if(estaBuscando == false){
                    buttonNuevo.style.backgroundColor = 'rgb(155, 245, 143)';
                    buttonUsados.style.backgroundColor = 'rgb(235, 235, 235)';
                    buttonTodos.style.backgroundColor = 'rgb(235, 235, 235)';
            
                    for(let i=0; i<productosUsados.length; i++){
                        productosUsados[i].style.display = 'none';
                    }
                    for(let i=0; i<productosNuevos.length; i++){
                        productosNuevos[i].style.display = 'flex';
                    }
                    lastCategoria = 'nuevos';
                }
            });
            
            buttonUsados.addEventListener('click', () => {
                if(estaBuscando == false){
                    buttonNuevo.style.backgroundColor = 'rgb(235, 235, 235)';
                    buttonUsados.style.backgroundColor = 'rgb(155, 245, 143)';
                    buttonTodos.style.backgroundColor = 'rgb(235, 235, 235)';
            
                    for(let i=0; i<productosNuevos.length; i++){
                        productosNuevos[i].style.display = 'none';
                    }
                    for(let i=0; i<productosUsados.length; i++){
                        productosUsados[i].style.display = 'flex';
                    }
                    lastCategoria = 'usados';
                }
            });
            
            input.addEventListener('input', () => {
                if(input.value.length > 0) {
                    estaBuscando = true;
                    buttonNuevo.style.backgroundColor = 'rgb(235, 235, 235)';
                    buttonUsados.style.backgroundColor = 'rgb(235, 235, 235)';
                    buttonTodos.style.backgroundColor = 'rgb(235, 235, 235)';
            
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
                        resultado.style.display = 'flex';
                    });
                }
                else {
                    estaBuscando = false;
                    
                    switch(lastCategoria){
                        case "todos":
                            buttonNuevo.style.backgroundColor = 'rgb(235, 235, 235)';
                            buttonUsados.style.backgroundColor = 'rgb(235, 235, 235)';
                            buttonTodos.style.backgroundColor = 'rgb(155, 245, 143)';
            
                            for(let i=0; i<productosUsados.length; i++){
                                productosUsados[i].style.display = 'flex';
                            }
                            for(let i=0; i<productosNuevos.length; i++){
                                productosNuevos[i].style.display = 'flex';
                            }
                            lastCategoria = 'todos';
                            break;
                        case "nuevos":
                            buttonNuevo.style.backgroundColor = 'rgb(155, 245, 143)';
                            buttonUsados.style.backgroundColor = 'rgb(235, 235, 235)';
                            buttonTodos.style.backgroundColor = 'rgb(235, 235, 235)';
            
                            for(let i=0; i<productosUsados.length; i++){
                                productosUsados[i].style.display = 'none';
                            }
                            for(let i=0; i<productosNuevos.length; i++){
                                productosNuevos[i].style.display = 'flex';
                            }
                            lastCategoria = 'nuevos';
                            break;
                        case "usados":
                            buttonNuevo.style.backgroundColor = 'rgb(235, 235, 235)';
                            buttonUsados.style.backgroundColor = 'rgb(155, 245, 143)';
                            buttonTodos.style.backgroundColor = 'rgb(235, 235, 235)';
                    
                            for(let i=0; i<productosNuevos.length; i++){
                                productosNuevos[i].style.display = 'none';
                            }
                            for(let i=0; i<productosUsados.length; i++){
                                productosUsados[i].style.display = 'flex';
                            }
                            lastCategoria = 'usados';
                            break;
                    }
                }
            });
        }
    });
}
