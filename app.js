// Mostrar/Ocultar el form para crear incidente
let abrirCrearIncidente = document.getElementById("AbrirCrearIncidente");
abrirCrearIncidente.addEventListener("click", ()=>{
  let formCrearIncidente = document.getElementById("FormCrearIncidente");
  let estadoForm = getComputedStyle(formCrearIncidente).visibility;
  if (estadoForm == "hidden") {
    formCrearIncidente.style.visibility = "visible"
    abrirCrearIncidente.textContent = "Cerrar creación"
  } else{
    formCrearIncidente.style.visibility = "hidden"
    abrirCrearIncidente.textContent = "Crear incidente"
  }
})



//Crear incidente
let incidentes = JSON.parse(localStorage.Incidentes);
let formCrearIncidente = document.getElementById("FormCrearIncidente");
formCrearIncidente.addEventListener("submit", (event)=>{
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
});



// Mapping de los incidentes
function mostrarIncidentes(){
  //Trae los incidentes del localStorage
  let incidentes = JSON.parse(localStorage.getItem("Incidentes")) || [];
  // Busca y define la tabla donde registrar los incidentes y la deja vacia
  let tablaIncidentes = document.getElementById("TablaIncidentes").getElementsByTagName("tbody")[0];
  tablaIncidentes.innerHTML = ""; 
  // Se recorre el array de incidentes y para cada uno se inserta una fila en la tabla
  incidentes.forEach((incidente, index) => {
    let fila = tablaIncidentes.insertRow();
    let celdaID = fila.insertCell(0);
    let celdaNombre = fila.insertCell(1);
    let celdaDetalle = fila.insertCell(2);
    let celdaPrioridad = fila.insertCell(3);
    let celdaAcciones = fila.insertCell(4);
  // Se definen los datos que debe tener cada celda
  celdaID.textContent = incidente.id;
  celdaNombre.textContent = incidente.nombre;
  celdaDetalle.textContent = incidente.detalle;
  celdaPrioridad.textContent = incidente.prioridad;
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

  celdaAcciones.appendChild(iconoBorrar);
  celdaAcciones.appendChild(iconoEditar);
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



//Funcion callback para editar incidentes (En proceso)
function editarIncidente(index) {
 /* // Recuperar los incidentes del localStorage
  let incidentes = JSON.parse(localStorage.getItem("Incidentes")) || [];
  // Eliminar el incidente del array
  incidentes.splice(index, 1); // Elimina el incidente en la posición 'index'
  // Actualizar el localStorage
  localStorage.setItem("Incidentes", JSON.stringify(incidentes));
  // Volver a mostrar los incidentes en la tabla
  mostrarIncidentes();*/
}



// Carga los incidentes al cargar la pagina
window.onload = mostrarIncidentes;




