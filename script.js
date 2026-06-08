//Inicio

// 1. BASE DE DATOS: Aquí guardarás la info de tus dinosaurios
const baseDatosDinos = {
    carnivoros: [
        { id: '001', nombre: 'Tiranosaurio Rex', descripcion: 'El rey depredador...', genero: 'Theropoda', dieta: 'Carnívoro', nombreCientifico: 'Tyrannosaurus rex', fechaDescubrimiento: '1905', descubridor: 'Barnum Brown', periodo: 'Cretácico', img: '/Proyecto/images/t-rex.jpg' },
        { id: '002', nombre: 'Velociraptor', descripcion: 'Pequeño pero astuto...', genero: 'Dromaeosauridae', dieta: 'Carnívoro', nombreCientifico: 'Velociraptor mongoliensis', fechaDescubrimiento: '1924', descubridor: 'Peter Kaisen', periodo: 'Cretácico', img: '/Proyecto/images/velociraptor.jpg' }
    ],
    hervivoros: [
        { id: '003', nombre: 'Triceratops', descripcion: 'El herbívoro con tres cuernos...', genero: 'Ceratopsidae', dieta: 'Herbívoro', nombreCientifico: 'Triceratops horridus', fechaDescubrimiento: '1889', descubridor: 'John Bell Hatcher', periodo: 'Cretácico', img: '/Proyecto/images/triceratops.jpg' }
    ]
};

// Variable donde guardaremos la URL final
let urlDinoFinal = "";

const btnInicio=document.getElementById('inicio');
const btnCatalogo=document.getElementById('Catalogo');
const btnRegistrar=document.getElementById('Registrar');
const btnCargarUsuario=document.getElementById('usuario');
const btnMisContribuciones=document.getElementById('Miscontribuciones');
const contenedorVistaInicio=document.querySelector('.vistaInicio');
const contenedorFichaTecnica=document.getElementById('fichaTecnica');
const contenedorContenido = document.querySelector('.Contenido'); /*Contenido DOM*/
const contenedorVistaRegistro= document.querySelector('.vistaRegistro');
const contenedorFiltros=document.querySelector('.filtros');
const contenedorVistaUsuario=document.querySelector('.vistaUsuario');

//DOM del los filtros
const textoF=document.getElementById('textoFiltro');
const casillaId=document.querySelector('input[name="Id"]');
const casillaNombre=document.querySelector('input[name="Nombre"]');
const casillaGenero=document.querySelector('input[name="Genero"]');
const casillaTipo=document.querySelector('input[name="Tipo"]');

// Seleccionamos todos los checkboxes dentro del div con clase "filtros"
const checkboxes = document.querySelectorAll('.filtros input[type="checkbox"]');

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        // Actualizamos el atributo value dinámicamente
        this.value = this.checked ? "true" : "false";
        if(casillaId.checked || casillaNombre.checked || casillaGenero.checked || casillaTipo.checked){
            const filtro = document.getElementById('textoFiltro').value.trim(); /*Se obtiene el id del tf*/
            mostrarListaFiltrada(filtro);
        }
        console.log(`El filtro ${this.name} ahora tiene valor: ${this.value}`);
    });
});

//Selector del DOM
const UI = {
    // Contenedores de datos (donde inyectaremos)
    datos: {
        nombre: document.getElementById('nombre'),
        descripcion: document.getElementById('descripccion'),
        genero: document.getElementById('genero'),
        dieta: document.getElementById('dieta'),
        nCientifico: document.getElementById('nombreCientifico'),
        fDescubrimiento: document.getElementById('fechaDescubrimiento'),
        descubridor: document.getElementById('descubridor'),
        pVida: document.getElementById('periodoVida'),
        imagen: document.getElementById('imagenDinosaurio')
    },
    // Contenedores de acciones (los botones)
    nav: {
        contenedorVinculos: document.querySelector('.panelVinculos'),
        btnCatalogo: document.getElementById('Catalogo')
    },
    usuario:{
       id: document.getElementById ('Id_usuario'),
       nombre: document.getElementById('nombreUsuario'),
       descripccion: document.getElementById('descripccionUsuario')
    }
};

function mostrarInicio(){
    contenedorVistaInicio.classList.remove('oculto');
    contenedorFichaTecnica.classList.add('oculto');
    contenedorContenido.classList.add('oculto');
    contenedorVistaRegistro.classList.add('oculto');
    contenedorFiltros.classList.add('oculto');
    contenedorVistaUsuario.classList.add('oculto');
}

//Funcion para habilitar el primer nivel 1
function mostrarTipos() {
    contenedorVistaInicio.classList.add('oculto');
    contenedorFichaTecnica.classList.add('oculto');
    contenedorVistaRegistro.classList.add('oculto');
    contenedorVistaUsuario.classList.add('oculto');
    contenedorContenido.classList.remove('oculto') //Ocultamos la ficha tecnica
    contenedorFiltros.classList.remove('oculto');
    
    //Generamos los botones
    contenedorContenido.innerHTML = ` 
        <button onclick="mostrarLista('carnivoros')"><h3>Ver Carnívoros</h3></button>
        <button onclick="mostrarLista('hervivoros')"><h3>Ver Hervívoros</h3></button>
    `;
}

//Funcion para habilitar el segundo nivel
function mostrarLista(tipo){
    contenedorContenido.innerHTML=`<button onclick="mostrarTipos()"><h3>« Volver a Tipos</h3></button>`;
    baseDatosDinos[tipo].forEach(dino=>{
        const btn = document.createElement('button'); //Creamos un boton
        btn.innerHTML = `<h3>${dino.nombre}</h3>`; //Definimos el contenido del boton
        btn.onclick = () => mostrarFichaTecnico(dino);   //Definimos el listener que va a tener "mostrar el nivel 3"
        contenedorContenido.appendChild(btn); //Lo declaramos como un elemento hijo del contenedor Contenido
    })   
}

function mostrarListaFiltrada(dato){
    contenedorFichaTecnica.classList.add('oculto');
    contenedorContenido.classList.remove('oculto');
    contenedorContenido.innerHTML=`<button onclick="mostrarTipos()"><h3>« Volver a Tipos</h3></button>`;
    // 1. Unir todos los dinos en un solo array para facilitar la búsqueda
    const todosLosDinos = [...baseDatosDinos.carnivoros, ...baseDatosDinos.hervivoros];
    // 2. Convertir el dato a minúsculas para una comparación más flexible
    const busqueda = dato.toLowerCase().trim();
    if (busqueda.length > 0) { 
        todosLosDinos.forEach(dino => {
            if (dino.id.includes(busqueda)) {
                const btn = document.createElement('button');
                btn.innerHTML = `<h3>${dino.nombre} (ID: ${dino.id})</h3>`;
                btn.onclick = () => mostrarFichaTecnico(dino);
                contenedorContenido.appendChild(btn);
            }
        });
    }
    if(typeof busqueda ==='string'){
        todosLosDinos.forEach(dino=>{
        if(dino.nombre.toLowerCase().includes(busqueda) || dino.genero.toLowerCase().includes(busqueda) || dino.dieta.toLowerCase().includes(busqueda) ){
            const btn = document.createElement('button'); //Creamos un boton
            btn.innerHTML = `<h3>${dino.nombre}</h3>`; //Definimos el contenido del boton
            btn.onclick = () => mostrarFichaTecnico(dino);   //Definimos el listener que va a tener "mostrar el nivel 3"
            contenedorContenido.appendChild(btn); //Lo declaramos como un elemento hijo del contenedor Contenido
        }
    }    
    )  
    }
}

function mostrarFichaTecnico(dino){
    
    UI.datos.nombre.innerHTML = `Nombre: <span class="dato-dinamico">${dino.nombre}</span>`;
    UI.datos.descripcion.innerHTML = `<span class="dato-dinamico">${dino.descripcion}</span>`;
    UI.datos.genero.innerHTML = `Genero: <span class="dato-dinamico">${dino.genero}</span>`;
    UI.datos.dieta.innerHTML = `Dieta: <span class="dato-dinamico">${dino.dieta}</span>`;
    UI.datos.nCientifico.innerHTML = `Nombre cientifico: <span class="dato-dinamico">${dino.nombreCientifico}</span>`;
    UI.datos.fDescubrimiento.innerHTML = `Fecha de descubrimiento: <span class="dato-dinamico">${dino.fechaDescubrimiento}</span>`;
    UI.datos.descubridor.innerHTML = `Descubridor: <span class="dato-dinamico">${dino.descubridor}</span>`;
    UI.datos.pVida.innerHTML = `Periodo de vida: <span class="dato-dinamico">${dino.periodo}</span>`;
    UI.datos.imagen.src=dino.img;
    contenedorContenido.classList.add('oculto');
    contenedorFichaTecnica.classList.remove('oculto');
}

function mostrarRegistro(){
    contenedorVistaInicio.classList.add('oculto');
    contenedorVistaUsuario.classList.add('oculto');
    contenedorFichaTecnica.classList.add('oculto');
    contenedorContenido.classList.add('oculto');
    contenedorVistaRegistro.classList.remove('oculto');
    
}

function mostrarUsuario(){
    contenedorVistaUsuario.classList.remove('oculto');
    contenedorVistaInicio.classList.add('oculto');
    contenedorFichaTecnica.classList.add('oculto');
    contenedorContenido.classList.add('oculto');
    contenedorVistaRegistro.classList.add('oculto');
    contenedorFiltros.classList.add('oculto');

    UI.usuario.id.innerHTML = `Id de usuario: <span class="dato-dinamico">${'001'}</span>`;
    UI.usuario.nombre.innerHTML=`Nombre de usuario: <span class="dato-dinamico">${'Cesar Solano Callejas'}</span>`;
    UI.usuario.descripccion.innerHTML = `Sobre mi: <span class="dato-dinamico">${'Una persona amante de la paleontologia, las especies prehistoricas de la realidad y la ficcion asi como un aficionado a las peliculas de este tema'}</span>`;
}

/**
 * Inicializa el selector de imágenes y devuelve la URL del blob creado.
 * @param {string} idBoton - ID del botón visible.
 * @param {string} idInput - ID del input file invisible.
 * @param {function} callback - Función que se ejecutará con la URL de la imagen.
 */
function inicializarSelectorImagen(idBoton, idInput, callback) {
    const btn = document.getElementById(idBoton);
    const input = document.getElementById(idInput);

    // 1. Al hacer clic en el botón, abrimos el input oculto
    btn.addEventListener('click', () => input.click());

    // 2. Al seleccionar una imagen, procesamos el archivo
    input.addEventListener('change', (event) => {
        const archivo = event.target.files[0];
        
        if (archivo) {
            // Validamos que sea realmente una imagen
            if (archivo.type.startsWith('image/')) {
                const urlImagen = URL.createObjectURL(archivo);
                
                // Actualizamos la interfaz
                btn.textContent = "Imagen: " + archivo.name;
                
                // Enviamos la URL al "callback" para que la guardes en tu objeto
                callback(urlImagen);
            } else {
                alert("Por favor, selecciona solo archivos de imagen.");
            }
        }
    });
}

/**
 * Captura, valida y genera un string XML basado en el formulario de registro.
 * @returns {string|null} Retorna el string XML si es válido, o null si falló la validación.
 */
function generarXMLDinosaurio() {
    // 1. Captura de datos
    const datos = {
        nombre: document.getElementById('tfNombre').value.trim(),
        desc: document.getElementById('tfDescripccion').value.trim(),
        genero: document.getElementById('tfGenero').value.trim(),
        tipo: document.getElementById('txTipo').value.trim(),
        nombreC: document.getElementById('tfNombreC').value.trim(),
        fecha: document.getElementById('tfFechaD').value.trim(),
        descubridor: document.getElementById('tfDescubridor').value.trim(),
        periodo: document.getElementById('tfPeriodoV').value.trim()
    };

    // 2. Validación
    if (!datos.nombre || !datos.desc || !datos.genero || !datos.tipo) {
        alert("Error: Por favor llena todos los campos obligatorios.");
        return null; // Retorna null si la validación falla
    }

    // CORRECCIÓN: Validación de tipo (usando && y toLowerCase para evitar errores de mayúsculas)
    const tipoNormalizado = datos.tipo.toLowerCase();
    if (tipoNormalizado !== "hervívoro" && tipoNormalizado !== "carnívoro") {
        alert("Error: El tipo debe ser 'Hervívoro' o 'Carnívoro'.");
        return null;
    }

    // 3. Generación del XML
    const xmlString = 
`<dinosaurio>
    <nombre>${datos.nombre}</nombre>
    <descripcion>${datos.desc}</descripcion>
    <genero>${datos.genero}</genero>
    <tipo>${datos.tipo}</tipo>
    <opcionales>
        ${datos.nombreC ? `<nombre_cientifico>${datos.nombreC}</nombre_cientifico>` : ''}
        ${datos.fecha ? `<fecha_descubrimiento>${datos.fecha}</fecha_descubrimiento>` : ''}
        ${datos.descubridor ? `<descubridor>${datos.descubridor}</descubridor>` : ''}
        ${datos.periodo ? `<periodo_vida>${datos.periodo}</periodo_vida>` : ''}
    </opcionales>
</dinosaurio>`;

// AQUÍ ES DONDE DEBES GUARDAR EN LA BD
    const categoria = tipoNormalizado === 'carnívoro' ? 'carnivoros' : 'hervivoros';
    baseDatosDinos[categoria].push({
        id: '00' + (baseDatosDinos.carnivoros.length + baseDatosDinos.hervivoros.length + 1),
        nombre: datos.nombre,
        descripcion: datos.desc,
        genero: datos.genero,
        dieta: datos.tipo,
        nombreCientifico: datos.nombreC,
        fechaDescubrimiento: datos.fecha,
        descubridor: datos.descubridor,
        periodo: datos.periodo,
        img: urlDinoFinal || '/Proyecto/images/default.jpg'

});
    return xmlString;
}

// Evento para el botón de Registrar
document.getElementById('btnAgregar').addEventListener('click', function() {
    const xml = generarXMLDinosaurio();
    
    if (xml) {
        // Obtenemos el nombre para el archivo (usando el valor del input)
        const nombreDino = document.getElementById('tfNombre').value.trim() || "dinosaurio";
        
        console.log("XML generado con éxito:", xml);
        
        // Llamamos a la función de descarga
        descargarXML(nombreDino, xml);
        
        alert("Dinosaurio registrado y archivo XML descargado.");
        
        // Opcional: Limpiar formulario aquí
    }
});

/**
 * Fuerza la descarga del XML generado como un archivo .xml
 */
function descargarXML(nombreArchivo, contenidoXML) {
    const blob = new Blob([contenidoXML], { type: 'text/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    
    a.href = url;
    a.download = nombreArchivo + ".xml"; // Nombre del archivo basado en el nombre del dino
    
    document.body.appendChild(a);
    a.click();
    
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Variable para seleccionar el contenedor donde aparecerán los nuevos accesos
const contenedorContribuciones = document.getElementById('contenedorContribuciones'); 

// 1. Nueva función contenedora
async function procesarArchivosSeleccionados(event) {
    const archivos = event.target.files;
    
    for (let archivo of archivos) {
        if (archivo.name.endsWith('.xml')) {
            try {
                const contenido = await archivo.text();
                const nuevoDino = parsearXMLADino(contenido);
                
                // Guardar en BD
                const categoria = nuevoDino.dieta.toLowerCase() === 'carnívoro' ? 'carnivoros' : 'hervivoros';
                baseDatosDinos[categoria].push(nuevoDino);

                // Crear botón de acceso directo
                crearAccesoDirecto(nuevoDino);
                
            } catch (err) {
                console.error("Error al procesar el archivo:", archivo.name, err);
            }
        }
    }
    alert("¡Contribuciones cargadas correctamente!");
}

// 2. Listener simplificado que llama a la función
selectorCarpeta.addEventListener('change', procesarArchivosSeleccionados);

// Función para crear el botón dinámicamente (se mantiene igual)
function crearAccesoDirecto(dino) {
    const btnAcceso = document.createElement('button');
    btnAcceso.classList.add('btn-dinosaurio'); 
    btnAcceso.innerHTML = `<h3>Acceder a: ${dino.nombre}</h3>`;
    
    btnAcceso.addEventListener('click', () => {
        mostrarFichaTecnico(dino);
    });
    
    document.querySelector('.Contenido').appendChild(btnAcceso);
}

// 5. INICIALIZACIÓN
btnCatalogo.addEventListener('click',mostrarTipos);
btnInicio.addEventListener('click', mostrarInicio);
btnRegistrar.addEventListener('click', mostrarRegistro);
btnCargarUsuario.addEventListener('click', mostrarUsuario);
document.addEventListener("DOMContentLoaded", () => {
    mostrarInicio();
});

// Inicializamos el selector
inicializarSelectorImagen('btnSubir', 'archivoInput', (url) => {
    urlDinoFinal = url; // Aquí capturamos la URL para tu objeto nuevoDino
    console.log("Imagen lista para el registro:", urlDinoFinal);
});