const {ipcRenderer,electronservice}=require("electron");
const anime=require("animejs");
const funciones=require("../scripts/funciones");
const fs=require("fs");
let body;
let barrachat;
let nombrechat;
let textochat;
let personajederecha;
let personajeizquierda;
let personajecentro;
let imagenderecha;
let imagenizquierda;
let imagencentro;
let idextexto=0;
let indextotal=0;
let proceso;
let estaescribiendo=false;
let stringchat;
let chattotal;
let archivo = fs.readFileSync('texto/introinstituto.txt', 'utf-8');
let set;
let finalhtml="";
let numfinalhtml=0;
window.addEventListener('DOMContentLoaded', () => {
    body=document.body;
    body.style.height=funciones.tamVentana()[1]+"px";
    barrachat=document.getElementById("barrachatinicio");
    nombrechat=document.getElementById("hablanteinicio");
    textochat=document.getElementById("chatinicio");
    personajederecha=document.getElementById("personaje-derecha");
    personajeizquierda=document.getElementById("personaje-izquierda");
    personajecentro=document.getElementById("personaje-centro");
    imagenderecha=document.getElementById("imagen_derecha");
    imagenizquierda=document.getElementById("imagen_derecha");
    imagencentro=document.getElementById("imagen_centro");
    set=funciones.linea(archivo.toString(),1000);
    inicio();
    barrachat.addEventListener("click",clickenchat);



});
window.addEventListener('resize',()=>{
    body=document.body;
    body.style.height=funciones.tamVentana()[1]+"px"

});
function inicio(){

imagencentro.src="../fotos/lionxd.png";
    personajecentro.style.visibility="visible";
    personajecentro.style.opacity=0;
    barrachat.style.visibility="visible";
        barrachat.style.opacity=0;

let animcentroaparece=anime({
    targets:personajecentro,
    opacity: 1,
    duration:1000,
    autoplay:true,
    easing:"linear"
});
    let animchataparece=anime({
        targets:barrachat,
        opacity:1,
        duration:1000,
        autoplay:true,
        easing: "linear"
    });
textochat.innerHTML="";
nombrechat.innerHTML=set[0].hablante;
stringchat=set[0].intervencion[0];


  proceso=setInterval(()=>{
      estaescribiendo=true;
      sacarletrastexto(stringchat)}, 50

 );





}
function clickenchat(){
    if(estaescribiendo){
        clearInterval(proceso);
        textochat.innerHTML+=stringchat.substring(idextexto,stringchat.length-1);
        estaescribiendo=false;
    }




}

function sacarletrastexto(texto) {
    let char =texto.charAt(idextexto++);

    if(char==="<"){
        let html="";
        while(char!==">"){
            html+=char;
            char =texto.charAt(idextexto++);
        }

        html+=char;
        textochat.innerHTML+=html;
        let cierrehtml=textochat.innerHTML.charAt(textochat.innerHTML.length-1);
        let int=2;
        while(cierrehtml.charAt(1)!=="/"){
            cierrehtml=textochat.innerHTML.charAt(textochat.innerHTML.length-int)+cierrehtml;
            int++;
        }


        alert(html);
        char =texto.charAt(idextexto++);
        finalhtml=cierrehtml;
        numfinalhtml=cierrehtml.length
    }
    textochat.innerHTML=textochat.innerHTML.substring(0,textochat.innerHTML.length-numfinalhtml);
    textochat.innerHTML+=char+finalhtml;
    if(idextexto>texto.length) {
        clearInterval(proceso);
    }

}