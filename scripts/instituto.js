const {ipcRenderer,electronservice}=require("electron");
const anime=require("animejs");
const funciones=require("../scripts/funciones");
const fs=require("fs");

window.addEventListener('DOMContentLoaded', () => {
    let body=document.getElementById("body");
    body.style.height=funciones.tamVentana()[1]+"px"


});