const {ipcRenderer,electronservice}=require("electron");
const anime=require("animejs");
const funciones=require("../scripts/funciones");
const fs=require("fs");
let barraArriba;
let barraAbajo;
let historieta;
let barraIzquierda;
let barraDerecha;
let imghist;
let archivo;


window.addEventListener('DOMContentLoaded', () => {
    archivo = fs.readFileSync('./texto/historia1.txt', 'utf-8');
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






    let intervalo=4000;
    let textHist1=document.getElementById("texto_historia");

    let i=0;

    let stilo=window.getComputedStyle(textHist1);

    let tamlinea=Math.round(stilo.getPropertyValue("width").split("px")[0]*100/parseInt(stilo.getPropertyValue("font-size").split("px")[0]*40));
    let lineas=extraerlineas(texto,tamlinea);
    let textoanime;
    let proceso;

    textodesplazar(lineas,i,textoanime);

 proceso=setInterval(()=>{
     if(i+1>=lineas.length){
         ipcRenderer.send('terminahistorieta',"iniciojuego");
         clearInterval(proceso);
     }

     i+=4;
     textodesplazar(lineas,i,textoanime)



 },intervalo);




}

function textodesplazar(lineas,i,textoanime) {
    let textohtml=document.getElementById("texto_historia");

    let animacion=anime.timeline({
        easing:'linear'
    });
    animacion.add({

        targets:textohtml,

        duration: 800,

        opacity:1,
        begin:()=>{
            textohtml.innerText="";
            for(let x=0;x<4;x++){
                if(lineas[i+x]===undefined)
                    break;
                textohtml.innerHTML+=lineas[i+x]+"\n"

            }

        }


    }).add({
        targets:textohtml,

        duration: 800,
        opacity:0




    },3000)

}



function textodesplazar2(lineas,i,textoanime) {
    let textHist2=document.getElementById("texto_historia2");
    let textHist1=document.getElementById("texto_historia");
    let textHist3=document.getElementById("texto_historia3");
    let textos=[textHist3,textHist2,textHist1];
    let stilo=window.getComputedStyle(textHist1);
    let pos2={top:80};
    let pos1={top:50};
    let pos3={top: 110};
    let poss=[pos1,pos2,pos3];
//textHist2.getBoundingClientRect().top



    textoanime=anime.timeline({

        easing:"linear",

    });
   textoanime

       .add({
      targets:textos[i%3],
      duration:800,
      opacity:1,
      begin:()=>{

          textos[(i)%3].innerHTML=lineas[i++];

      }
   }).add({
       duration:800,
       targets:textos[(i+1)%3],
       opacity:0
   },"+=200")


       .add({
           duration:800,
           targets:poss[(i+1)%3],
            top:poss[(i)%2].top,
           update:function () {
            textos[0].style.top=poss[(i)%3].top+"px";
           },



       },"+=200")
       .add({
           duration:800,
           targets:poss[(i)%3],
           top:poss[(i+1)%3].top,
           update:function () {
               textos[1].style.top=poss[(i+1)%3].top+"px";
           }

       },"-=1200")







}




function extraerlineas(texto,tamlinea) {
    let lineas=[];
    let aux='';
    let char;
    let ishtml=false;
    for(let i=0;i<texto.length;i++){

        char=texto.charAt(i);

        aux+=char;
        if(char==='<')
            if(char)
            ishtml=true;
        if(char==='/'&&texto.charAt(i-1)==='<') {
            ishtml = false;
        }
        if(char==='\n'||i===texto.length-1&&!ishtml) {

            lineas.push(aux);
            aux='';
            console.log(lineas.length)

        }

    }
return lineas

}
function extraerlineas2(texto,tamlinea) {

    let i=0;
    let iniciolinea=0;
    let finlinea=tamlinea;
    let lineas=[texto.length%tamlinea];
    let condicion=true;
    let ishtml=false;
    let numhtml=0;
    let washtml=false;

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
            let thislinea=texto.substring(iniciolinea,finlinea);
            if(!washtml){
            for(let x=0;x<thislinea.length;x++){

                if(thislinea.charAt(x)==="<"){
                    ishtml=true;
                    washtml=true;


                }
                if(ishtml){
                    numhtml++;
                    if(thislinea.charAt(x)===">"){
                        ishtml=false;
                    }


                }
            }}else washtml=false;



            if(washtml){
                finlinea+=numhtml;
                i--;
                numhtml=0;


            }
            else{
            lineas[i] = texto.substring(iniciolinea,finlinea);
            iniciolinea=finlinea+1;
            finlinea+=tamlinea;
        }}


    }


    return lineas;
}
