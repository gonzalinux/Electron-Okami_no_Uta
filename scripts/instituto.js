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
let archivo = fs.readFileSync('texto/introinstituto.txt', 'utf-8');
let set;
let clickchat;

let htmldondeseescribe=new Array(0);


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






intervalchat()





}


function intervalchat() {
    textochat.innerHTML="";
    cambiarhablante()

    stringchat=set[indextotal].intervencion[0];
    htmldondeseescribe.push(textochat);
    proceso=setInterval(()=>{
    estaescribiendo=true;
    sacarletrastexto()}, 50

);


}

function clickenchat(){
    if(estaescribiendo){
        clearInterval(proceso);

        textochat.innerHTML+=set[indextotal].intervencion[0].substring(idextexto,stringchat.length);
        estaescribiendo=false;
         clickchat=setTimeout(()=>{clickenchat()},1000)


    }
    else {

        clearTimeout(clickchat);
        indextotal++;
        idextexto=0;
        htmldondeseescribe=new Array([textochat])
        intervalchat();


    }





}

function sacarletrastexto() {
    let texto=stringchat;
    let char =texto.charAt(idextexto++);
    let dondeseescribira=htmldondeseescribe[htmldondeseescribe.length-1];

//comprobamos si el char abre una etiqueta html
    if(char==="<"){


        //si la abre tenemos que meterlo directamente sin esperar
        let html="";
        //hasta que no termine seguimos
        while(char!==">"){

            html+=char;
            char =texto.charAt(idextexto++);
        }
        //se le añade un id para escribir dentro
        html+='id="sub'+htmldondeseescribe.length+'"';
        //se le cierra con el >
        html+=char;
        //se añade de golpe para que se aplique la etiqueta html
        dondeseescribira.innerHTML+=html;
        //se recupera ese elemento html
        let htmldondeescribeestavex=document.getElementById("sub"+htmldondeseescribe.length);
        htmldondeseescribe.push(htmldondeescribeestavex);



        char =texto.charAt(idextexto++);

        }

    if(char==="|") {
        htmldondeseescribe.pop();
        return


        }

    dondeseescribira=htmldondeseescribe[htmldondeseescribe.length-1];
    dondeseescribira.innerHTML+=char;
    if(idextexto>texto.length) {
        clearInterval(proceso);
        estaescribiendo=false;
        idextexto=0;
        indextotal++;

        setTimeout(()=>{intervalchat()},1000)

    }


}
function cambiarhablante() {
    let imagen=set[indextotal].hablante;
    switch (imagen) {
        case "Gala": imagen="../fotos/galadeloschinos.png";break;
        case "Masu": imagen="../fotos/masudeloschinos.png";break;
        case "Lion": imagen="../fotos/lionxd.png"
    }
    imagencentro.src=imagen;
    nombrechat.innerHTML=set[indextotal].hablante;

}
