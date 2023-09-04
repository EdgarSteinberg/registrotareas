const formulario = document.querySelector("#formulario")
const listaNotas = document.querySelector("#lista-notas")
let notas = []


const eventListeners = () => {
formulario.addEventListener("submit" , agregarNota)

document.addEventListener("DOMContentLoaded" , () => {
    notas = JSON.parse(localStorage.getItem("notas")) || []
    crearHTML()
})
}


const agregarNota = (e) => {
    e.preventDefault()

    const nota = document.querySelector("#nota").value

    nota === "" ? mostrarError("No se puede agregar una nota vacia") : !isNaN(nota) ? mostrarError("solo se permite ingresar texto en la nota") : notaProcessing(nota)
}


const notaProcessing = (nota) => {
    const notaObj = {
        id: Date.now(),
        nota : nota
    }

    notas = [...notas, notaObj]

    crearHTML()

    formulario.reset()
}

const mostrarError = (error) => {
    const mensajeError = document.createElement("p")
    mensajeError.textContent = error
    mensajeError.classList.add("error")

    const contenido = document.querySelector("#contenido")
    contenido.appendChild(mensajeError)

    setTimeout(() => {
        mensajeError.remove()
    }, 3000)

}


const crearHTML = () => {
    limpiaHTML()

    notas.length > 0
        ? notas.forEach(({ nota, id }) => {
            const btnEliminar = document.createElement("a");
            btnEliminar.classList.add("borrar-nota")
            btnEliminar.textContent = "X"
            btnEliminar.onclick = () => {
                borrarNota(id)
            }

            const li = document.createElement("li")
            li.textContent = nota
            li.appendChild(btnEliminar)
            listaNotas.appendChild(li)
        })
        : null
    sincronizarStorage()
}

const sincronizarStorage = () => {
localStorage.setItem("notas", JSON.stringify(notas))
}

const borrarNota = (id) => {
notas = notas.filter(nota => nota.id !== id)
crearHTML()
}

const limpiaHTML = () => {
listaNotas.innerHTML = ""
}

eventListeners()