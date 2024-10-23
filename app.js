        //Index
//Calcular total de incidentes
let incidentes = JSON.parse(localStorage.getItem("Incidentes")) || [];
let cantIncidentes = incidentes.length;
let totalIncidentes = document.getElementById("TotalIncidentes");
totalIncidentes && (totalIncidentes.innerHTML = cantIncidentes);
//Calcular total de incidentes por estado
  //Abierto/Pendiente/Cerrado
  let cantIncidentesAbierto = 0;
  let cantIncidentesPendiente = 0;
  let cantIncidentesCerrado = 0;
  function CantIncidentesEstado() {
    let cantIncAbierto = 0;
    let cantIncPendiente = 0;
    let cantIncCerrado = 0;
    let incidentes = JSON.parse(localStorage.getItem("Incidentes")) || [];
    // Recorre los incidentes y cuenta los estados
    for (let i = 0; i < incidentes.length; i++) {
      if (incidentes[i].estado === "Abierto") {
        cantIncAbierto++;
      } else if (incidentes[i].estado === "Pendiente") {
        cantIncPendiente++;
      } else if (incidentes[i].estado === "Cerrado") {
        cantIncCerrado++;
      }
    }
    // Asignar los valores globales
    cantIncidentesAbierto = cantIncAbierto;
    cantIncidentesPendiente = cantIncPendiente;
    cantIncidentesCerrado = cantIncCerrado;
  }
  CantIncidentesEstado();
  // Incidentes abiertos
  let totalIncidentesAbiertos = document.getElementById("IncidentesAbiertos");
  totalIncidentesAbiertos && (totalIncidentesAbiertos.innerHTML = cantIncidentesAbierto);
  // Incidentes pendientes
  let totalIncidentesPendiente = document.getElementById("IncidentesPendientes");
  totalIncidentesPendiente && (totalIncidentesPendiente.innerHTML = cantIncidentesPendiente);
  // Incidentes cerrado
  let totalIncidentesCerrado = document.getElementById("IncidentesCerrados");
  totalIncidentesCerrado && (totalIncidentesCerrado.innerHTML = cantIncidentesCerrado);
  

  //Calcular total de incidentes por prioridad
  let cantIncidentesAlta = 0;
  let cantIncidentesMedia = 0;
  let cantIncidentesBaja = 0;
  function CantIncidentesPrioridad() {
    let cantIncAlta = 0;
    let cantIncMedia = 0;
    let cantIncBaja = 0;
    let incidentes = JSON.parse(localStorage.getItem("Incidentes")) || [];
    // Recorre los incidentes y cuenta segun la prioridad
    for (let i = 0; i < incidentes.length; i++) {
      if (incidentes[i].prioridad === "Alta") {
        cantIncAlta++;
      } else if (incidentes[i].prioridad === "Media") {
        cantIncMedia++;
      } else if (incidentes[i].prioridad === "Baja") {
        cantIncBaja++;
      }
    }
    // Asignar los valores globales
    cantIncidentesAlta = cantIncAlta;
    cantIncidentesMedia = cantIncMedia;
    cantIncidentesBaja = cantIncBaja;
  }
  CantIncidentesPrioridad();
  // Incidentes prioridad Alta
  let totalIncidentesAlta = document.getElementById("IncidentesAlta");
  totalIncidentesAlta && (totalIncidentesAlta.innerHTML = cantIncidentesAlta);
  // Incidentes prioridad Media
  let totalIncidentesMedia = document.getElementById("IncidentesMedia");
  totalIncidentesMedia && (totalIncidentesMedia.innerHTML = cantIncidentesMedia);
  // Incidentes prioridad Baja
  let totalIncidentesBaja = document.getElementById("IncidentesBaja");
  totalIncidentesBaja && (totalIncidentesBaja.innerHTML = cantIncidentesBaja);


            // Gestion
// Mostrar/Ocultar el form para crear incidente
let abrirCrearIncidente = document.getElementById("AbrirCrearIncidente");
let formCrearIncidente = document.getElementById("FormCrearIncidente");
let estadoForm = formCrearIncidente && (getComputedStyle(formCrearIncidente).visibility);
abrirCrearIncidente && (abrirCrearIncidente.addEventListener("click", ()=>{
  let estadoForm = getComputedStyle(formCrearIncidente).visibility;
  if (estadoForm === "hidden") {
    formCrearIncidente.style.visibility = "visible"
    abrirCrearIncidente.textContent = "Cerrar creación"
  } else{
    formCrearIncidente.style.visibility = "hidden"
    abrirCrearIncidente.textContent = "Crear incidente"
  }
}))
//Crear incidente
formCrearIncidente && (formCrearIncidente.addEventListener("submit", (event)=>{
  /* Extra para cancelar el evento default del form el cual actualiza la pagina
  event.preventDefault();*/
  //Se define incidentes y se toman los valores del local storage, si no existen, se forma un array vacio
  let incidentes = JSON.parse(localStorage.getItem("Incidentes")) || [];
  //Se toman los valores de los input del HTML
  let ultimoIncidente = incidentes[incidentes.length - 1];
  let incidenteID = ultimoIncidente ? ultimoIncidente.id + 1 : 1;
  let nombreIncidente = document.getElementById("NombreIncidente").value;
  let detalleIncidente = document.getElementById("DetalleIncidente").value;
  let prioridadIncidente = document.getElementById("PrioridadIncidente").value;
  //Se almacenan los valores del incidente a crear
  let nuevoIncidente = {
    id: incidenteID,
    nombre: nombreIncidente,
    detalle: detalleIncidente,
    prioridad: prioridadIncidente
  };
  //Se agrega al array de incidentes los datos del nuevo incidente
  incidentes.push(nuevoIncidente);
  //Se actualiza los datos del localStorage con el nuevo incidente creado
  localStorage.setItem("Incidentes", JSON.stringify(incidentes));
  // Se muestran los valores del ultimo incidente agregado
  console.log(nombreIncidente);
  console.log(detalleIncidente);
  console.log(prioridadIncidente);
}));



// Mapping de los incidentes
function mostrarIncidentes(){
  //Trae los incidentes del localStorage
  let incidentes = JSON.parse(localStorage.getItem("Incidentes")) || [];
  // Busca y define la tabla donde registrar los incidentes y la deja vacia
  let tablaIncidentes = document.getElementById("TablaIncidentes")?.getElementsByTagName("tbody")[0];
  tablaIncidentes && (tablaIncidentes.innerHTML = "");
  // Se recorre el array de incidentes y para cada uno se inserta una fila en la tabla
  incidentes.forEach((incidente, index) => {
    let fila = tablaIncidentes?.insertRow();
    let celdaID = fila?.insertCell(0);
    let celdaNombre = fila?.insertCell(1);
    let celdaDetalle = fila?.insertCell(2);
    let celdaPrioridad = fila?.insertCell(3);
    let celdaAcciones = fila?.insertCell(4);
  // Se definen los datos que debe tener cada celda
  celdaID && (celdaID.textContent = incidente.id);
  celdaNombre && (celdaNombre.textContent = incidente.nombre);
  celdaDetalle && (celdaDetalle.textContent = incidente.detalle);
  celdaPrioridad && (celdaPrioridad.textContent = incidente.prioridad);
  //Se define el icono de borrar y se agrega como ultimo elemento dentro de la celda de acciones
  let iconoBorrar = document.createElement("span");
  iconoBorrar.classList.add("iconoBorrar"); // Agregar la clase
  iconoBorrar.innerHTML = "🗑️"; // Icono de borrar
  let iconoEditar = document.createElement("span");
  iconoEditar.classList.add("iconoEditar"); // Agregar la clase
  iconoEditar.innerHTML = "✏️"; // Icono de borrar

  iconoBorrar.addEventListener("click", () => {
    // Función para borrar el incidente
    borrarIncidente(index);
  });

  iconoEditar.addEventListener("click",()=>{
    editarIncidente(index);
  });

  celdaAcciones?.appendChild(iconoBorrar);
  celdaAcciones?.appendChild(iconoEditar);
  });
}



// Funcion Callback para borrar incidentes
function borrarIncidente(index) {
  // Recuperar los incidentes del localStorage
  let incidentes = JSON.parse(localStorage.getItem("Incidentes")) || [];
  // Eliminar el incidente del array
  incidentes.splice(index, 1); // Elimina el incidente en la posición 'index'
  // Actualizar el localStorage
  localStorage.setItem("Incidentes", JSON.stringify(incidentes));
  // Volver a mostrar los incidentes en la tabla
  mostrarIncidentes();
}
window.onload = mostrarIncidentes;