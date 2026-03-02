const area = document.querySelector('#tweets');
const ul = document.querySelector('.mis-tweets__lista');

let tweets = JSON.parse(localStorage.getItem('tweet')) || [];

document.addEventListener('DOMContentLoaded', cargarTweets);

function cargarTweets() {
    agregarHtml();
    leerEventos();
}

function leerEventos(){
    btnSubmit();
    btnCerrar();
}

function btnSubmit() {
    const btnSubmit = document.querySelector('#submit');

    btnSubmit.addEventListener('click', e => {
        e.preventDefault();
        if (area.value.trim() === '') {
            crearAlerta('Este campo no puede ir vacio');
            return;
        }
        existeTweet(area.value);
    });
}

function btnCerrar() {
    ul.addEventListener('click',(e) =>{
        if(e.target.classList.contains('borrar')) {
            const id = Number(e.target.closest('li').id);
            eliminarTweetSeleccionado(id);
            return;
        }
    });
}


function quitarTweetSeleccionado(entrada) {
    const tweetsActualizados = tweets.filter( tweet => entrada !== tweet.id);
    tweets = tweetsActualizados;

    localStorage.setItem('tweet', JSON.stringify(tweets));///////////
}

 
function capturarTweet(entrada) {
    const tweetActual = {
        valor: entrada,
        id: Date.now()
    }
    tweets = [...tweets, tweetActual];

    localStorage.setItem('tweet', JSON.stringify(tweets));////////////
}

function eliminarTweetSeleccionado(e){
    quitarTweetSeleccionado(e);
    limpiarLi(e);
}

function crearAlerta(texto) {
    const existe = document.querySelector('.error');
    if(existe) return;
    
    const campo = area.closest('.campo');
    const alerta = document.createElement('P');
    alerta.classList.add('error');
    alerta.textContent = texto;
    campo.appendChild(alerta);
    area.closest('.form').reset();

    setTimeout(() => {
        alerta.remove();
    }, 3000);
}

function existeTweet(entrada){
    const existe = tweets.some( tweet => entrada.toLowerCase() === tweet.valor.toLowerCase());
    if (existe) {
        crearAlerta('Ya existe un tweet similar')
        return;
    }
    capturarTweet(entrada);
    limpiarFormulario();
    agregarNuevoTweet(tweets[tweets.length-1]);
}

function limpiarFormulario() {
    area.value = '';
}

function agregarHtml() {
    tweets.forEach( tweet =>{
        agregarNuevoTweet(tweet);
    });
}

function agregarNuevoTweet(entrada) {
    const {valor, id} = entrada;
    const li = document.createElement('LI');
    const span = document.createElement('SPAN');
    const a = document.createElement('A');

    span.textContent = valor;
    li.setAttribute('id', id);
    a.textContent = 'X'
    a.classList.add('borrar');

    span.appendChild(a)
    li.appendChild(span)
    ul.appendChild(li);
}

function limpiarLi(id) {
    const elemento = document.getElementById(id);
    elemento.remove();
}