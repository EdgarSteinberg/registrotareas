const formulario = document.getElementById("formulario")
const listaNotas = document.getElementById("lista-notas")

const notas = []

const eventListeners = () => {
    formulario.addEventListener("submit", agregarNota)

    document.addEventListener("DOMContentLoaded", () => {
        notas = JSON.parse(localStorage.getItem("notas")) || []
        crearHTML()
    })
}

const agregarNota = (e) => {
    e.preventDefault()

    const nota = document.getElementById("notas").value

    nota == "" ? mostrarError ("no se puede agregar una nota vacia")  : !isNan(nota) ? mostrarError ("solo se permite ingresar texto ") : notaProcessing(nota)
}

const notaProcessing = (nota) => {
    const notaObjet = {
        id : Date.now(),
        nota : nota
    }

   notas = {...notas, notaObjet}

   crearHTML()

   formulario.reset()
}

const mostrarError = (error) => {
    const mensajeError = document.createElement("p")
    mensajeError.textContent = error
    mensajeError.classList.add("error")

    const contenido = document.getElementById("cotenido")
    contenido.appendChild(mensajeError)

    setTimeout(() => {
        mensajeError.remove()
    }), 3000

}

const crearHTML = () => {
    limpiaHTML()

    notas.length > 0 
    ? notas.forEach(({nota, id }) => {
        const btnEliminar = document.createElement("a")
        btnEliminar.classList.add("borrar-nota")
        btnEliminar.textContent = "X"
        btnEliminar.onclick = () => {
            borrarNota(id)
        }

        const li= document.createElement("li")
        li.textContent = nota
        li.appendChild(btnEliminar)
        listaNotas.appendChild(li)
    })
    : null
    sincronizarStorage()
}

const sincronizarStorage = () => {
    localStorage.setItem("notas" ,JSON.stringify(notas))
}

const borrarNota = (id) => {
   notas = notas.filter((nota) => nota.id != id )
   crearHTML()
}

const limpiaHTML = () => {
    listaNotas.innerHTML = ""
}

eventListeners()