const {ipcRenderer,electronservice}=require("electron");
const anime=require("animejs");
const funciones=require("./scripts/funciones");
const fs=require("fs");
let barraArriba;
let barraAbajo;
let historieta;
let barraIzquierda;
let barraDerecha;
let imghist;
let archivo;


window.addEventListener('DOMContentLoaded', () => {
    archivo = fs.readFileSync('texto/historia1.txt', 'utf-8');
    redimensionarelem();

    animarlaterales();


});



function redimensionarelem() {
    barraArriba=document.getElementById('barra_negra-arriba');
    barraAbajo=document.getElementById('barra_negra-abajo');
    historieta=document.getElementById('historieta');
    barraIzquierda=document.getElementById('barra_negra-izquierda');
    barraDerecha=document.getElementById('barra_negra-derecha');
    imghist=document.getElementById('imgbox');

    barraArriba.style.height=(30/100*funciones.tamVentana()[1])+"px";
    barraArriba.style.width=(1.01*funciones.tamVentana()[0]+"px");


    barraAbajo.style.height=(31/100*funciones.tamVentana()[1])+"px";
    barraAbajo.style.width=(1.1*funciones.tamVentana()[0]+"px");


    historieta.style.height=(41/100*funciones.tamVentana()[1])+"px";
    historieta.style.width=1.01*funciones.tamVentana()[0]+"px";


    barraIzquierda.style.height=(41/100*funciones.tamVentana()[1])+"px";

    barraDerecha.style.height=(41/100*funciones.tamVentana()[1])+"px";


}


window.addEventListener('resize',()=>{

    redimensionarelem();
});


function animarlaterales(){

    laterales=anime({
        targets:[barraDerecha,barraIzquierda,barraAbajo,barraArriba],
        background:"#000",
        duration:2000,
        easing:"linear"

    });
    centro=anime({
        targets:[historieta],
        background:"#295a10",
        duration:2000,
        autoplay:false,
        easing:"linear"
    });
    centro.restart();
    laterales.restart();
    centro.finished.then(texto);
}


function texto() {

    let texto=archivo.toString();





    let intervalo=3000;

    let i=0;




    let textHist1=document.getElementById("texto_historia");
    let stilo=window.getComputedStyle(textHist1);
//alert((stilo.getPropertyValue("font-size").split("px")[0]));
    //alert(textHist1.clientWidth)
    let tamlinea=Math.round(stilo.getPropertyValue("width").split("px")[0]*100/parseInt(stilo.getPropertyValue("font-size").split("px")[0]*45));
    let textHist2=document.getElementById("texto_historia2");
    let lineas=linea(texto,tamlinea);
    let textoanime=anime.timeline({

        autoplay: true,
        easing:"linear",




    });

    textoanime.add({
        opacity: 1,
       targets:textHist2,
        duration:2000,
        begin:function () {
            textHist2.innerHTML=lineas[i++]

        }


    });
    textoanime.add({
        targets:textHist2,
        duration:2000,
        translateY: -2*stilo.getPropertyValue("font-size")
    });
    textoanime.add({
        targets:textHist1,
        translateY: 2*stilo.getPropertyValue("font-size").split("px")[0],
        duration:2000,


    });
    textoanime.add({
        opacity:1,
        targets:textHist1,
        duration:2000,
        begin:function () {
            textHist1.innerHTML=lineas[i++];
        }

    });
//textoanime.play();


   /* let proceso=setInterval(()=>{
        if(i===lineas.length-1)
            clearInterval(proceso);
        textHist1.innerHTML=lineas[i];

        i++;





    }, intervalo);*/



}

function linea(texto,tamlinea) {
    let i=0;
    let iniciolinea=0;
    let finlinea=tamlinea;
    let lineas=[texto.length%tamlinea];
    let condicion=true;
    for (i=0;condicion;i++){
        if(finlinea>texto.length) {
            condicion=false;
            finlinea = texto.length-1;
        }

        if(texto.toString().charAt(finlinea)!==" "&&condicion){
            finlinea--;
            i--

        }
        else {
            lineas[i] = texto.substring(iniciolinea,finlinea);
            iniciolinea=finlinea+1;
            finlinea+=tamlinea;
        }


    }
    return lineas;
}
