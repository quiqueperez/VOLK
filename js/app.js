window.onload = function() {
    btnRegistrar = document.getElementById("btnRegistrar");
    ingreso = document.getElementById("ingreso");
    registro = document.getElementById("registro");
    principal = document.getElementById("principal");
    txtCorreo = document.getElementById("correoR");
    txtNombre = document.getElementById("nombreR");
    txtContrasena = document.getElementById("contrasenaR");
    txtConfirmacion = document.getElementById("confirmacionR");
    txtFecha = document.getElementById("fechaR");
    btnRegistro = document.getElementById("btnRegistro");
    btnIngresar = document.getElementById("btnIngresar");
    txtCorreoI = document.getElementById("correoI");
    txtContrasenaI = document.getElementById("contrasenaI");
    nombreP = document.getElementById("nombreP");
    MensajeM = document.getElementById("mensajeM");
    correoM = document.getElementById("correoM");
    enviarM = document.getElementById("enviarM");
    redactar = document.getElementById("redactar");
    photo = document.getElementById("photo");
    camera = document.getElementById("camera");
    open = document.getElementById("open");
    /*localStorage.setItem("login", 1);
    localStorage.setItem("nombre", "Enrique");
    localStorage.setItem("correo", "enrique@gmail.com");
    */

    if (localStorage.getItem("login")!== "1") {
        ingreso.style.display = "block";
        principal.style.display = "none";
        redactar.style.display = "none";
        document.getElementById("camara").style.display = "none";

    }
    else{
        ingreso.style.display = "none";
        principal.style.display = "block";
        redactar.style.display = "block";
        nombre = localStorage.getItem("nombre");
        correo = localStorage.getItem("correo");
        document.getElementById("nombreP").innerHTML = nombre;
        //leerM();
    }
    
}

btnRegistrar.addEventListener("click", function() 
{
    ingreso.style.display = "none";
    registro.style.display = "block";
});



btnRegistro.addEventListener("click", function() {
    if (txtCorreo.value == ""){
        alert("Debe escribir el correo");
        txtCorreo.classList.add("errorCampo");
        return false;
    }
    else{
        txtCorreo.classList.remove("errorCampo");
    }
    if (txtNombre.value == ""){
        alert("Debes agregar un nombre");
        txtNombre.classList.add("errorCampo");
        return false;
    }
    else{
        txtNombre.classList.remove("errarCampo");
    }
    if (txtConfirmacion.value == ""){
        alert("Debes confirmar la contraseña");
        txtConfirmacion.classList.add("errorCampo");
        return false;
    }
    else{
        txtConfirmacion.classList.remove("errorCampo");
    }
    if (txtContrasena.value !== txtConfirmacion.value){
        alert("Las contraseñas no coinciden");
        txtContrasena.classList.add("errorCampo");
        txtConfirmacion.classList.add("errorCampo");
        return false;
    }
    else{
        txtContrasena.classList.remove("errorCampo");
        txtConfirmacion.classList.remove("errorCampo");
    }
    if (txtFecha.value == ""){
        alert("Debes de colocar una fecha de nacimiento");
        txtFecha.classList.add("errorCampo");
        return false;
    }
    else{
        txtFecha.classList.remove("errorCampo");
    }
   

    let datos = new FormData();
    datos.append("correoR", txtCorreo.value);
    datos.append("nombreR", txtNombre.value);
    datos.append("contrasenaR", txtContrasena.value);
    datos.append("fechaR", txtFecha.value);

    fetch ("http://tdpjepp.orgfree.com/registro.php", {
        method: 'POST',
        body: datos
    })
    .then(function (response){
        if (response.ok) {
            alert("Usuario registrado");
        }
        else {
            alert("Ocurrio un error al registrar");
            console.log(response);
        }
    })
    .catch(function(err) {
        alert("Ocurrio un error inesperado");
        console.log(err);
    });
});

btnIngresar.addEventListener("click", function (){
    if (txtCorreoI.value == ""){
        alert("Debe escribir el correo");
        txtCorreoI.classList.add("errorCampo");
        return false;
    }
    else{
        txtCorreo.classList.remove("errorCampo");
    }
    if (txtContrasenaI.value == ""){
        alert("Debe escribir el correo");
        txtCorreo.classList.add("errorCampo");
        return false;
    }
    else{
        txtCorreo.classList.remove("errorCampo");
    }

    let datosI = new FormData();
    datosI.append("correoI", txtCorreoI.value);
    datosI.append("contrasenaI", txtContrasenaI.value);

    fetch ("http://tdpjepp.orgfree.com/ingreso.php", {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        body: datosI
    })
    .then(function (response){
        return response.json();
    })
    .then (function(data){
        if (data.fallo == "contrasena"){
            alert ("Debe escribir la contraseña correcta");
        }
        else if (data.fallo == "usuario") {
            alert("Debe ingresar su usuario");
        }
        else {
            nombre = data.nombre;
            correo = data.correo;
            ingreso.style.display = "none";
            principal.style.display = "block";
            nombreP.innerHTML = nombre;
            localStorage.setItem("login", 1);
            localStorage.setItem("nombre", nombre);
            localStorage.setItem("correo", correo);
            leerM();
        }
    })
    .catch(function(err) {
        alert("Ocurrio un error inesperado");
        console.log(err);
    });

});

enviarM.addEventListener("click", function(){
    if(correoM.value == ""){
        alert ("Debes escribir usuario");
        correoM.classList.add("errorCampo");
        return false;
    }
    else {
        correoM.classList.remove("errorCampo");
    }
    if(MensajeM.value == ""){
        alert ("Debes escribir el mensaje");
        MensajeM.classList.add("errorCampo");
        return false;
    }
    else {
        correoM.classList.remove("errorCampo");
    }
    let metaMensaje = new FormData();
    metaMensaje.append("correoM", correoM.value);
    metaMensaje.append("mensajeM", mensajeM.value);

    fetch ("http://tdpjepp.orgfree.com/registrarMensaje.php", {
        method: 'POST',
        body: metaMensaje
    })
    .then (function(response){
        if (response.ok) {
            alert ("Mensaje Enviado");
        }
        else {
            alert("Ocurrio un error");
            console.log(response);
        }
        })
        .catch(function(err) {
            alert("ocurrio un error");
            console.log(err);
        }); 
});

function cerrarSesion () {
    cerrarBarra();
    localStorage.removeItem("nombre");
    localStorage.removeItem("correo");
    localStorage.setItem("login", 0);
    redactar.style.display = "none";
    document.getElementById("pincipal").style.display = "none";
    document.getElementById("mensajes").style.display = "none";
    document.getElementById("camara").style.display = "none";
    document.getElementById("ingreso").style.display = "block";
}

function mensajes() {
    redactar.style.display = "block";
    document.getElementById("mensajes").style.display = "block";
    document.getElementById("camara").style.display = "none";
    cerrarBarra();
}

function abrirBarra(){
    document.getElementById("barraMenu").style.width = "250px";
}

function cerrarBarra() {
    document.getElementById("barraMenu").style.width = "0";
}

function leerM() {
    let datosLM = new FormData();
    datosLM.append("correoUsuario", correo);
    fetch ("http://tdpjepp.orgfree.com/leerMensajes.php", {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        body: datosLM
    })
    .then(function (response){
        return response.json();
    })
    .then (function(data){
        for (let x = 0; x < data.length; x++){
            document.getElementById("mensajes").innerHTML = 
            document.getElementById("mensajes") + data[x].mensaje + "<br>" + 
            data[x].fechahora + "<br>";
        }
    });
}

function tomarFoto(){
    redactar.style.display = "none";
    document.getElementById("mensajes").style.display = "none";
    document.getElementById("camara").style.display = "block";
    cerrarBarra();
}

document.getElementById("open").addEventListener("click", function(){
    camera.click();
});

camera.addEventListener("change", function(e){
    ruta = URL.createObjectURL(e.target.files[0]);
    obtenerLugar();
    photo.src = ruta;
    if (obtenerSO() == "IOS"){
        let link = document.createElement('a');
        link.download = "test.png";
        link.href = ruta;
        link.click();
        alert("Foto Capturada")
    }
    
});

function obtenerSO(){
    let so = null;
    let plataform = window.navigator.platform,
        iosPlataform = ['iPhone', 'iPad', 'iPod'];
    if (iosPlataform.includes(plataform)){
        so ='IOS';
    }
    return so;
}

function obtenerLugar(){
    coordenadas ={lat: 0, lon: 0};
    navigator.geolocation.getCurrentPosition(function(position){
        coordenadas = {lat: position.coords.latitude, lon: position.coords.longitude}

        fetch("https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=" + coordenadas.lat + "&lon" + coordenadas.lon)
        .then(response => response.json())
        .then(data =>{
            document.getElementById("lugar").value = data.address.country + " " + data.address.state;
        })
        .catch(error =>{
            console.log(error);
            coordenadas = {lat: 0, lon: 0};
        });
    });

}

mapa.addEventListener('click', function(){
    window.open("http://www.openstreetmap.org/?mlat=" + coordenadas.lat + "&mlon" + coordenadas.lon + "&zoom=20");
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('../sw.js').then( () => {
        console.log('Service Worker Registered')
      });
    });
  }
  