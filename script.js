var save = localStorage.getItem('theme');
var url = `?${new Date().getTime()}`;
// DOM BASE DE DATOS
{
    let base;
    var productosFoto = {};

    // OBTENER base-de-datos.js
    async function fetchFileContent() {
        const urlBase = 'https://raw.githubusercontent.com/Flinch101/base-de-datos/main/base-de-datos.js' + url;

        try {
            const response = await fetch(urlBase);
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
                    let pTitulo = document.createElement('h2');
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
            let todo = document.querySelector('.todo');
            function toDark(){
                let inputD = document.querySelector('input');
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
                inputD.classList.toggle('dark-input');
                inputD.classList.toggle('dark-pebe');
                todo.style.backgroundColor = '';
                todo.classList.toggle('dark');
            }

            let buttonTheme = document.getElementById("theme");
            {
                if(save !== null) {
                    if (save == 'dark'){
                        toDark();
                        todo.style.backgroundColor = '';
                        todo.classList.add('dark');
                        buttonTheme.className = 'icon-toggle-on';
                        buttonTheme.classList.toggle('dark-text');
                        document.querySelectorAll('.logo img').forEach(elemento => {
                            elemento.src = 'https://raw.githubusercontent.com/Flinch101/base-de-datos/main/iconos/icono-dark.png' + url;
                        });
                        todo.classList.remove('light');
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
                            elemento.src = 'https://raw.githubusercontent.com/Flinch101/base-de-datos/main/iconos/icono-dark.png' + url;
                        });
                        toDark();
                        todo.classList.remove('light');
                    }
                    else {
                        toTheme = 'default';
                        buttonTheme.className = 'icon-toggle-off';
                        toDark();
                        document.querySelectorAll('.logo img').forEach(elemento => {
                            elemento.src = 'https://raw.githubusercontent.com/Flinch101/base-de-datos/main/iconos/icono-white.png' + url;
                        });
                        todo.classList.add('light');
                    }
                }
                else {
                    toTheme = 'dark';
                    buttonTheme.className = 'icon-toggle-on';
                    document.querySelectorAll('.logo img').forEach(elemento => {
                        elemento.src = 'https://raw.githubusercontent.com/Flinch101/base-de-datos/main/iconos/icono-dark.png' + url;
                    });
                    buttonTheme.classList.toggle('dark-text');
                    todo.classList.remove('light');
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
            
                    img.src = "https://raw.githubusercontent.com/Flinch101/base-de-datos/main/productos/producto_" + productoActual + "_" +siguienteFotoFunction(fotoNumero) + "." + extension + url; 
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

            function lastUsadoTodos() {
                if(estaBuscando == false){
                    buttonTodos.style.backgroundColor = 'rgb(155, 245, 143)';
                    buttonNuevo.style.backgroundColor = '';
                    buttonUsados.style.backgroundColor = '';
                    
                    for(let i=0; i<productosUsados.length; i++){
                        productosUsados[i].style.display = 'grid';
                    }
                    for(let i=0; i<productosNuevos.length; i++){
                        productosNuevos[i].style.display = 'grid';
                    }
                    lastCategoria = 'todos';
                }
            }

            function lastUsadoNuevos() {
                if(estaBuscando == false){
                    buttonNuevo.style.backgroundColor = 'rgb(155, 245, 143)';
                    buttonTodos.style.backgroundColor = '';
                    buttonUsados.style.backgroundColor = '';
            
                    for(let i=0; i<productosUsados.length; i++){
                        productosUsados[i].style.display = 'none';
                    }
                    for(let i=0; i<productosNuevos.length; i++){
                        productosNuevos[i].style.display = 'grid';
                    }
                    lastCategoria = 'nuevos';
                }
            }

            function lastUsadoUsados() {
                if(estaBuscando == false){
                    buttonUsados.style.backgroundColor = 'rgb(155, 245, 143)';
                    buttonNuevo.style.backgroundColor = '';
                    buttonTodos.style.backgroundColor = '';
            
                    for(let i=0; i<productosNuevos.length; i++){
                        productosNuevos[i].style.display = 'none';
                    }
                    for(let i=0; i<productosUsados.length; i++){
                        productosUsados[i].style.display = 'grid';
                    }
                    lastCategoria = 'usados';
                }
            }
            
            buttonTodos.addEventListener('click', lastUsadoTodos);
            buttonNuevo.addEventListener('click', lastUsadoNuevos);
            buttonUsados.addEventListener('click', lastUsadoUsados);
            
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
                    });
                }
                else {
                    estaBuscando = false;
                    switch(lastCategoria){
                        case "todos":
                            lastUsadoTodos();
                            break;
                        case "nuevos":
                            lastUsadoNuevos();
                            break;
                        case "usados":
                            lastUsadoUsados();
                            break;
                    }
                }
            });

            var carta = document.querySelectorAll('.producto img');
            let positionX;
            let positionY;
            carta.forEach(img => {
                img.addEventListener('mousemove', function(event) {
                    const rect = img.getBoundingClientRect();
                    positionX = event.clientX - rect.left;
                    positionY = event.clientY - rect.top;

                    positionX = positionX - (img.clientWidth/2);
                    positionY = positionY - (img.clientHeight/2);

                    img.style.transform = `
                        perspective(1000px)
                        scale(1.2)
                        rotateY(${((positionX/10) * 2)}deg)
                        rotateX(${((-positionY/10) * 2)}deg)
                    `;

                    document.querySelector('.todo').style.display = 'block';
                    document.querySelector('.todo').style.opacity = '0.8';
                    document.querySelector('.todo').style.zIndex = '1';
                    img.style.zIndex = '2';
                    document.querySelector('.todo').style.width = document.querySelector('body').clientWidth + "px";
                    document.querySelector('.todo').style.height = document.querySelector('.container').clientHeight + "px";
                });

                img.addEventListener('mouseleave', function(event) {
                    img.style.transform = '';
                    document.querySelector('.todo').style.display = 'none';
                    document.querySelector('.todo').style.opacity = '1';
                    img.style.zIndex = '0';
                });
            });
        }

        // HEAD HTML
        {
            document.head.innerHTML += 
            `
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="preconnect" href="https://fonts.googleapis.com${url}">
                <link rel="preconnect" href="https://fonts.gstatic.com${url}" crossorigin>
                <link href="https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap${url}" rel="stylesheet">
                <link rel="shortcut icon" href="https://raw.githubusercontent.com/Flinch101/base-de-datos/main/iconos/icono-dark.png${url}" type="image/x-icon">
                <link rel="stylesheet" href="styles.css${url}">
                <link rel="stylesheet" href="fontello-fcabe407/css/fontello.css${url}">
            </head>
            `;
        }

        // BODY HTML
        {
            document.body.innerHTML += 
            `
            <body>
                <!-- THEME ---------------------------------- -->
                <div class="todo"></div>
                <script>
                    if(localStorage.getItem('theme') == 'dark'){
                        document.querySelector('.todo').classList.toggle('dark');
                    }
                    else {
                        document.querySelector('.todo').classList.toggle('light');
                    }
                    document.querySelector('body').classList.toggle('sinOverflow');
                    setTimeout(() => {
                            document.querySelector('.todo').style.display = 'none';
                            document.querySelector('body').classList.toggle('sinOverflow');
                        }, 500);
                </script>
                <div class="container">
                    <!-- ADD ---------------------------------- -->
                    <div class="ad"> 
                        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5838016460172798" crossorigin="anonymous"></script>
                    </div>
                    <!-- HEADER ---------------------------------- -->
                    <header>
                        <div class="container-dentro">
                            <div class="up">
                                <div class="logo">
                                    <img src="https://raw.githubusercontent.com/Flinch101/base-de-datos/main/iconos/icono-white.png" alt="Venta de Articulos icono">
                                </div>
                                <div class="buscador">
                                    <div class="input">
                                        <input id="buscador" placeholder="Buscar">
                                    </div>
                                    <div class="lupa">
                                        <i class="icon-search"></i>
                                    </div>
                                    <div class="theme">
                                        <i class="icon-toggle-off" id="theme"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="down">
                                <div class="menu-desplegable">
                                    <button id="button_todos">Todos</button>
                                    <button id="button_nuevos">Nuevos</button>
                                    <button id="button_usados">Usados</button>
                                </div>
                            </div>
                        </div>
                    </header>
                    <!-- MAIN ---------------------------------- -->
                    <main>
                        <div class="container-dentro"></div>
                    </main>
                    <!-- FOOTER ---------------------------------- -->
                    <footer>
                        <div class="container-dentro">
                            <p>Hecho por Franco Caviglia 2024 - Zona Buenos Aires, La Matanza - Envíos a todo el país.</p>
                        </div>
                    </footer>
                </div>
            </body>
            `; 
        }
    });
}
