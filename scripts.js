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
    const tamanoMaximo = 9; // Unidades en vw para frases cortas
    const tamanoMinimo = 5; // Unidades en vw para frases largas
    const longitudMaxima = 150; // Umbral para considerar que una frase es "larga"

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

// Ejecutar la función cuando se carga la página
window.onload = obtenerFraseDelDia;
