// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.


const funciones=require("./scripts/funciones");
const anime=require("animejs");



const {electron,ipcRenderer}=require("electron");
let entrar;
let pCom ;
let salir;

window.addEventListener('DOMContentLoaded', () => {
    entrar = document.getElementById('entrar');

    pCom = document.getElementById('pCompleta');
    salir=document.getElementById('salir');
    let inicio=document.getElementById('inicio');
    inicio.style.height=(80/100*funciones.tamVentana()[1])+"px";
    inicio.style.width=(20/100*funciones.tamVentana()[0]+"px");

    botones();


});

function botones() {


    entrar.addEventListener('click', () => {
    entramiento(()=>{
        ipcRenderer.send('asynchronous-message','entrar');


    });





    });

    pCom.addEventListener('click', function () {
        ipcRenderer.send('asynchronous-message','pCompleta');


    });

    salir.addEventListener('click',function (){
        ipcRenderer.send('asynchronous-message','salir');

    })
}
ipcRenderer.on('asynchronous-reply',(event,arg)=>{

    switch (arg) {


        case true:
            pCom.innerHTML = "Ventana";
            var inicio=document.getElementById('inicio');
            inicio.style.height=(70/100*tamVentana()[1])+"px";
            inicio.style.width=(15/100*tamVentana()[0]+"px");

            break;
        case false:
            pCom.innerHTML = "Pantalla Completa";
            var inicio=document.getElementById('inicio');
            inicio.style.height=(80/100*tamVentana()[1])+"px";
            inicio.style.width=(20/100*tamVentana()[0]+"px");
            break;

    }
});

function entramiento(_callback) {
    let blanco=anime({
        targets: "#blancocentral",
        keyframes:[
            {background:" radial-gradient(ellipse at center, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 24%, rgba(255,255,255,0) 100%)"},
            { background: "radial-gradient(ellipse at center, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 13%, rgba(255,255,255,0) 71%, rgba(255,255,255,0) 100%)"},
            { background: "radial-gradient(ellipse at center, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 66%, rgba(255,255,255,0) 76%, rgba(255,255,255,1) 100%)"},
        ],
        borderRadius:"100%",
        duration: 2000,
       scale:2000,
        easing: 'cubicBezier(.5, .05, .1, .3)'


    });
    let lobo = anime({
        float:"top",
        targets: '.lobo',
        left:"20%",
        top:80/100*funciones.tamVentana()[1]+"px",
        scale: 10,
       // width: "300%",
        duration:3000,
        autoplay: false,
        easing: 'linear',

    });
    let loboimg=anime({
        targets:".loboimg",
        opacity:[
            {value:1,duration:1500},
            {value: 0.5,duration: 500},
            {value: 0, duration:500}],
        easing:"linear"

    });
    loboimg.play();
    lobo.play();
    blanco.restart();
    lobo.finished.then(_callback)


}








