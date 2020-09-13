


tamVentana=function tamVentana() {
    var tam = [0, 0];
    if (typeof window.innerWidth != 'undefined')
    {
        tam = [window.innerWidth,window.innerHeight];
    }
    else if (typeof document.documentElement != 'undefined'
        && typeof document.documentElement.clientWidth !=
        'undefined' && document.documentElement.clientWidth != 0)
    {
        tam = [
            document.documentElement.clientWidth,
            document.documentElement.clientHeight
        ];
    }
    else   {
        tam = [
            document.getElementsByTagName('body')[0].clientWidth,
            document.getElementsByTagName('body')[0].clientHeight
        ];
    }
    return tam;
};



linea=function linea(texto,tamlinea) {
 let set=new Array(0);
 let index=0;
 let tamano=0;
 let nombre="";
 let quehacer="nada";
 let chat=new Array(1);
 chat[0]="";
 for(let i=0;i<texto.length;i++){
     let char=texto.charAt(i);

     switch (char) {
         case "[": quehacer="hablante";break;
         case "]": quehacer="cierrohablante";break;
         case "{": quehacer="chat";break;
         case "}":quehacer="cierrochat";break;

         case "¬":quehacer="cierrototal";
         default:{switch (quehacer) {
             case "hablante":nombre+=char;break;

             case "chat":tamano++;
                        chat[index]+=char;
                        break;
             case"cierrochat":chat.push("");index++;break;
             case "cierrototal":set.push(new Nuevoset(nombre,chat,tamano));


         }}
     }




 }
 return set;
};


module.exports={
    "tamVentana":tamVentana,
    "linea":linea,
};
function Nuevoset(hablante,intervencion, tamano) {
    this.hablante=hablante;
    this.intervencion=intervencion;
    this.tamano=tamano;

}