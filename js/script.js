localStorage.setItem('bienvenida', '¡VAMOS A JUGAR!');
localStorage.setItem('esMayorEdad', true);
localStorage.setItem('edad', 32);


// Variables
const bienvenida = localStorage.getItem('bienvenida'); // ¡VAMOS A JUGAR!
let nombreUsuario = localStorage.getItem('nombreUsuario');
let apellidoUsuario = localStorage.getItem('apellidoUsuario');
let edadUsuario = localStorage.getItem('edadUsuario');
let inputNombre = sessionStorage.getItem('inputNombre');
let inputApellido = sessionStorage.getItem('inputApellido');

//Variables DOM
const saludoEstudiantes = document.querySelector('#saludoUsuario');
const formulario = document.querySelector('#formulario');
const nombre = document.querySelector('#nombre');
const apellido = document.querySelector('#apellido');
const edad = document.querySelector('#edad');
const contFormulario = document.querySelector('#contFormulario');
const contenido = document.querySelector('#contenido');
const logout = document.querySelector('#logout');

//funciones
const ocultarFormulario = () => {
    contFormulario.style.display = 'none';
    contenido.innerHTML = `Hola ${nombreUsuario} ${apellidoUsuario}. Tienes ${edadUsuario} años.`;
}


saludoEstudiantes.innerHTML = bienvenida;

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    nombreUsuario = nombre.value;
    apellidoUsuario = apellido.value;
    edadUsuario = edad.value;

    localStorage.setItem('nombreUsuario', nombre.value);
    localStorage.setItem('apellidoUsuario', apellido.value);
    localStorage.setItem('edadUsuario', edad.value);
    ocultarFormulario();
})

if (!!nombreUsuario && !!apellidoUsuario && !!edadUsuario) {
    ocultarFormulario();
}

console.log(inputNombre, inputApellido);

nombre.value = inputNombre;
apellido.value = inputApellido;

nombre.addEventListener('input', (e) => {
    sessionStorage.setItem('inputNombre', e.target.value);
})

apellido.addEventListener('input', (e) => {
    sessionStorage.setItem('inputApellido', e.target.value);
})

logout.onclick = () => {
  // localStorage.clear();
    localStorage.removeItem('nombreUsuario');
    localStorage.removeItem('apellidoUsuario');
    localStorage.removeItem('edadUsuario');
}


//Ciclo para recorrer las claves almacenadas en el objeto localStorage
for (let i = 0; i < localStorage.length; i++) {
    let clave = localStorage.key(i);
    console.log("Clave: "+ clave);
    console.log("Valor: "+ localStorage.getItem(clave));
}




let preguntas_aleatorias = true;
let mostrar_pantalla_juego_términado = true;
let reiniciar_puntos_al_reiniciar_el_juego = true;

window.onload = function () {
    preguntas = readText("preguntas.json");
    interprete_bp = JSON.parse(preguntas);
    eligePreguntaAleatoria();
};

let pregunta;
let posibles_respuestas;
btn_correspondiente = [
    select_id("btn1"),
    select_id("btn2"),
    select_id("btn3"),
    select_id("btn4")
];
let pregu = [];

let preguntas_hechas = 0;
let preguntas_correctas = 0;

function eligePreguntaAleatoria() {
    let n;
    if (preguntas_aleatorias) {
        n = Math.floor(Math.random() * interprete_bp.length);
    } else {
        n = 0;
    }

    while (pregu.includes(n)) {
    n++;
    if (n >= interprete_bp.length) {
        n = 0;
    }
    if (pregu.length == interprete_bp.length) {
    //Aca el juego se reinicia
    if (mostrar_pantalla_juego_términado) {
        swal.fire({
            title: "Juego finalizado",
            text: "Puntuación: " + preguntas_correctas + "/" + (preguntas_hechas - 1),
            icon: "success"
        });
    }
        if (reiniciar_puntos_al_reiniciar_el_juego) {
            preguntas_correctas = 0
            preguntas_hechas = 0
        }
    pregu = [];
    }
}
pregu.push(n);
preguntas_hechas++;

elegirPregunta(n);
}

function elegirPregunta(n) {
    pregunta = interprete_bp[n];
    select_id("categoria").innerHTML = pregunta.categoria;
    select_id("pregunta").innerHTML = pregunta.pregunta;
    select_id("numero").innerHTML = n;
    let pc = preguntas_correctas;
    if (preguntas_hechas > 1) {
        select_id("puntaje").innerHTML = pc + "/" + (preguntas_hechas - 1);
    } else {
        select_id("puntaje").innerHTML = "";
        }

    style("imagen").objectFit = pregunta.objectFit;
    desordenarRespuestas(pregunta);
    if (pregunta.imagen) {
        select_id("imagen").setAttribute("src", pregunta.imagen);
        style("imagen").height = "200px";
        style("imagen").width = "100%";
        } else {
            style("imagen").height = "0px";
            style("imagen").width = "0px";
            setTimeout(() => {
            select_id("imagen").setAttribute("src", "");
            }, 500);
}
}

function desordenarRespuestas(pregunta) {
    posibles_respuestas = [
    pregunta.respuesta,
    pregunta.incorrecta1,
    pregunta.incorrecta2,
    pregunta.incorrecta3,
    ];
    posibles_respuestas.sort(() => Math.random() - 0.5);

    select_id("btn1").innerHTML = posibles_respuestas[0];
    select_id("btn2").innerHTML = posibles_respuestas[1];
    select_id("btn3").innerHTML = posibles_respuestas[2];
    select_id("btn4").innerHTML = posibles_respuestas[3];
}
let suspender_botones = false;




function apretar_btn(i) {
    if (suspender_botones) {
    return;
    }
    suspender_botones = true;
    if (posibles_respuestas[i] == pregunta.respuesta) {
        preguntas_correctas++;
        btn_correspondiente[i].style.background = "lightgreen";
    } else {
        btn_correspondiente[i].style.background = "pink";
    }
    for (let j = 0; j < 4; j++) {
    if (posibles_respuestas[j] == pregunta.respuesta) {
        btn_correspondiente[j].style.background = "lightgreen";
        break;
    }
}
    setTimeout(() => {
    reiniciar();
    suspender_botones = false;
    }, 3000);
}

// let p = prompt("numero")
/*
//Declaracion de eventos para los botones de respuesta
let boton1 = document.getElementById ( "btn1");
boton1.onclick = () =>{console.log ( "Respuesta 1 ")};

let boton2 = document.getElementById ( "btn2");
boton2.onclick = () =>{console.log ( "Respuesta 2 ")};

let boton3 = document.getElementById ( "btn3");
boton3.onclick = () =>{console.log ( "Respuesta 3 ")};

let boton4 = document.getElementById ( "btn4");
boton4.onclick = () =>{console.log ( "Respuesta 4 ")};
*/

function reiniciar() {
    for (const btn of btn_correspondiente) {
    btn.style.background = "white";
    }
    eligePreguntaAleatoria();
}

function select_id(id) {
    return document.getElementById(id);
}

function style(id) {
    return select_id(id).style;
}

function readText(ruta_local) {
    var texto = null;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", ruta_local, false);
    xmlhttp.send();
    if (xmlhttp.status == 200) {
        texto = xmlhttp.responseText;
}
    return texto;
}

