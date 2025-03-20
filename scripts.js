// Función que selecciona el día actual y carga el archivo correspondiente
function obtenerFraseDelDia() {
    const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const hoy = new Date();
    const diaSemana = hoy.getDay(); // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado

    // Solo tomamos los días de la semana que corresponden a Lunes-Viernes
    if (diaSemana === 0) return; // Si es domingo no hacemos nada
    const diaActual = dias[diaSemana - 1]; // Ajustamos para que 1 = Lunes, 2 = Martes, etc.

    // Cargar el archivo correspondiente al día
    fetch(`${diaActual}.txt`)
    .then(response => response.text())
    .then(texto => {
        // Limpiar el texto eliminando saltos de línea extra
        const frases = texto.split('\n').map(frase => frase.trim()).filter(frase => frase !== '');
        const fraseAleatoria = frases[Math.floor(Math.random() * frases.length)];

        // Mostrar la frase en los contenedores correspondientes
        const fraseElementos = [
            document.querySelector('.frase_pc'),
            document.querySelector('.frase_tablets'),
            document.querySelector('.frase_moviles')
        ];

        // Asignamos la frase al contenido de los contenedores
        fraseElementos.forEach(elemento => {
            elemento.textContent = `"${fraseAleatoria}"`;
        });

        // Ajustamos el tamaño de la fuente solo si la frase es muy larga
        ajustarTamanoFuente(fraseAleatoria);
    })
    .catch(error => {
        console.error('Error al cargar el archivo:', error);
        // Mostrar un mensaje por si no se puede cargar el archivo
        const fraseElementos = [
            document.querySelector('.frase_pc'),
            document.querySelector('.frase_tablets'),
            document.querySelector('.frase_moviles')
        ];

        fraseElementos.forEach(elemento => {
            elemento.textContent = "No se pudo cargar la frase.";
        });
    });
}

// Función para ajustar el tamaño de la fuente según la longitud de la frase
function ajustarTamanoFuente(frase) {
    // Obtenemos los elementos de las frases
    const fraseElementos = [
        document.querySelector('.frase_pc'),
        document.querySelector('.frase_tablets'),
        document.querySelector('.frase_moviles')
    ];

    // Tamaño máximo de la fuente para frases cortas
    const tamanoMaximo = 5; // Unidades en vw para frases cortas
    const tamanoMinimo = 3; // Unidades en vw para frases largas
    const longitudMaxima = 50; // Umbral para considerar que una frase es "larga"

    // Calculamos el tamaño de la fuente basado en la longitud de la frase
    let tamañoFuente;

    // Si la frase es corta, aplicamos un tamaño más grande
    if (frase.length <= longitudMaxima) {
        tamañoFuente = tamanoMaximo;
    } else {
        // Si la frase es larga, reducimos el tamaño
        tamañoFuente = tamanoMinimo;
    }

    // Aplicamos el tamaño de la fuente a los elementos
    fraseElementos.forEach(elemento => {
        elemento.style.fontSize = `${tamañoFuente}vw`;
    });
}

// Para hacer funcionar el modal (Ventana flotante)
const modal = document.getElementById("miModal");
const btnMasInformacion = document.querySelector(".btn-info");
const btnCerrar = document.querySelector(".cerrar");
const cuadros = document.querySelectorAll(".cuadro");
const flechaIzquierda = document.querySelector(".flecha.izquierda");
const flechaDerecha = document.querySelector(".flecha.derecha");
let indiceActual = 0;

// Mostrar el modal cuando se hace clic en el botón de "Más Información"
btnMasInformacion.addEventListener("click", () => {
    modal.style.display = "block";
    mostrarCuadro(indiceActual);
});

// Cerrar el modal
btnCerrar.addEventListener("click", () => {
    modal.style.display = "none";
});

// Función para mostrar el cuadro actual
function mostrarCuadro(indice) {
    cuadros.forEach((cuadro) => {
        cuadro.style.display = "none";
    });
    cuadros[indice].style.display = "block";
}

// Deshabilitar la propagación del clic cuando se hace clic en los botones dentro del modal
document.querySelectorAll('.btn-enlace').forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();  // Evita que el clic se propague al carrusel
    });
});

// Agregar el manejo de los clics de las flechas
flechaIzquierda.addEventListener("click", (e) => {
    // Prevenir la propagación para evitar que se activen los clics en el modal
    e.stopPropagation();
    indiceActual = (indiceActual - 1 + cuadros.length) % cuadros.length;
    mostrarCuadro(indiceActual);
});

flechaDerecha.addEventListener("click", (e) => {
    // Prevenir la propagación para evitar que se activen los clics en el modal
    e.stopPropagation();
    indiceActual = (indiceActual + 1) % cuadros.length;
    mostrarCuadro(indiceActual);
});

// Evitar que cualquier clic fuera de las flechas activen el cambio de información
modal.addEventListener("click", (e) => {
    // Comprobamos si el clic ocurrió en el modal, pero no en las flechas
    if (e.target !== flechaIzquierda && e.target !== flechaDerecha) {
        // Prevenir cualquier acción si el clic no es en las flechas
        e.stopPropagation();
    }
});

// Detecta el deslizamiento para móviles y computadoras
let touchStartX = 0;
let touchEndX = 0;

function handleSwipe() {
    if (touchEndX < touchStartX) {
        // Deslizar hacia la izquierda
        indiceActual = (indiceActual + 1) % cuadros.length;
        mostrarCuadro(indiceActual);
    }

    if (touchEndX > touchStartX) {
        // Deslizar hacia la derecha
        indiceActual = (indiceActual - 1 + cuadros.length) % cuadros.length;
        mostrarCuadro(indiceActual);
    }
}

// Detecta el inicio del deslizamiento (touchstart)
modal.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
});

// Detecta el movimiento del dedo (touchmove)
modal.addEventListener('touchmove', (e) => {
    touchEndX = e.touches[0].clientX;
});

// Detecta el final del deslizamiento (touchend)
modal.addEventListener('touchend', handleSwipe);

// Soporte para computador el mouse
let mouseStartX = 0;
let mouseEndX = 0;

modal.addEventListener('mousedown', (e) => {
    mouseStartX = e.clientX;
});

modal.addEventListener('mousemove', (e) => {
    mouseEndX = e.clientX;
});

modal.addEventListener('mouseup', () => {
    if (mouseEndX < mouseStartX) {
        // Deslizar hacia la izquierda
        indiceActual = (indiceActual + 1) % cuadros.length;
        mostrarCuadro(indiceActual);
    }

    if (mouseEndX > mouseStartX) {
        // Deslizar hacia la derecha
        indiceActual = (indiceActual - 1 + cuadros.length) % cuadros.length;
        mostrarCuadro(indiceActual);
    }
});

// Ejecutar la función cuando se carga la página
window.onload = obtenerFraseDelDia;
