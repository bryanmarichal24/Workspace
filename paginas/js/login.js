//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

function saveUser(usuario){
    localStorage.clear();
    localStorage.setItem("user",usuario);
    //window.location.href="paginas/inicio.html";
    console.log("hola");
}

document.addEventListener("DOMContentLoaded", function(e){
    localStorage.clear();
    localStorage.removeItem("user");
    
});

/*document.getElementById("botonIniciar").addEventListener("click", function(e){
    saveUser();
})*/