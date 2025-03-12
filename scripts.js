// Función que selecciona el día actual y carga el archivo correspondiente
function obtenerFraseDelDia() {
    const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
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
        document.querySelector('.frase_pc').textContent = `"${fraseAleatoria}"`;
        document.querySelector('.frase_tablets').textContent = `"${fraseAleatoria}"`;
        document.querySelector('.frase_moviles').textContent = `"${fraseAleatoria}"`;
    })
    .catch(error => {
        console.error('Error al cargar el archivo:', error);
        // Mostrar un mensaje por si no se puede cargar el archivo
        document.querySelector('.frase_pc').textContent = "No se pudo cargar la frase.";
        document.querySelector('.frase_tablets').textContent = "No se pudo cargar la frase.";
        document.querySelector('.frase_moviles').textContent = "No se pudo cargar la frase.";
    });
}

// Ejecutar la función cuando se carga la página
window.onload = obtenerFraseDelDia;

// Función para cambiar la frase aleatoria al hacer clic en el botón
function cambiarFraseAleatoria() {
    obtenerFraseDelDia();  // Llama a la misma función para obtener una nueva frase aleatoria
}

// Asignar el evento al botón para generar una nueva frase al hacer clic
document.getElementById('nuevaFrase').addEventListener('click', cambiarFraseAleatoria);
