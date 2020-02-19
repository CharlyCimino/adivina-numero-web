const NUM_MIN = 1023;
const NUM_MAX = 9876;
let numerosApostados = [];
let cuerpoTabla = document.getElementById("cuerpoTabla");
let inputNumeroApostado = document.getElementById("inputNumeroApostado");
let numeroPensado;
let intentos = 0;

/*var entrada = document.getElementById("entradaDelUsuario");
var cuadroAzul = document.getElementById("resultado");
var cuadroRojo = document.getElementById("contadorIntentos");
var genio = document.getElementById("imagenGenio");
var boton = document.getElementById("botonAdivinar");*/

function aleatorioEntre(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

function nuevoNumeroPensado() {
	let x = aleatorioEntre(NUM_MIN, NUM_MAX + 1).toString(10);
	while (tieneCifrasIguales(x)) {
		x = aleatorioEntre(NUM_MIN, NUM_MAX + 1).toString(10);
	}
	return x;
}

function empiezaConCero(numStr) {
	return numStr.charAt(0) == "0";
}

function limpiarTabla() {
	let filas = cuerpoTabla.children;
	let cant = filas.length;
	for (let i = 0; i < cant; i++) {
		filas[0].remove();
	}
}

function reiniciar() {
	limpiarTabla();
	numeroPensado = nuevoNumeroPensado();
}

function adivinar() {
	let numeroApostado = inputNumeroApostado.value;
	comprobarNumeroApostado(numeroApostado);
	intentos++;
	numerosApostados.push(numeroApostado);
	let resultados = [aleatorioEntre(0, 4), aleatorioEntre(0, 4), aleatorioEntre(0, 4)];
	colocarFila(intentos, numeroApostado, resultados);
}

function comprobarNumeroApostado(num) {
	let i = 0;
	while (i < numerosApostados.length) {
		if (numerosApostados[i] == num) {
			throw "El número " + numerosApostados[i] + " ya fue apostado en el intento " + (i + 1);
		}
		i++;
	}
}

function colocarFila(nroIntento, numeroApostado, arrayResultados) {
	let tdIntento = nuevoNodo("td", nroIntento);
	let tdNumeroApostado = nuevoNodo("td", numeroApostado);
	let nuevaFila = nuevoNodo("tr", "");
	nuevaFila.appendChild(tdIntento);
	nuevaFila.appendChild(tdNumeroApostado);
	for (let i = 0; i < arrayResultados.length; i++) {
		let res = arrayResultados[i];
		nuevaFila.appendChild(nuevoNodo("td", res));
	}
	cuerpoTabla.appendChild(nuevaFila);
}

function nuevoNodo(tipo, valor) {
	let elemento = document.createElement(tipo);
	elemento.innerText = valor;
	return elemento;
}

function tieneCifrasIguales(numStr) {
	let tiene = false;
	let i = 0;
	let arrNumeros = numStr.split("");
	while (!tiene && i < arrNumeros.length) {
		j = i + 1;
		while (!tiene && j < arrNumeros.length) {
			if (arrNumeros[i] == arrNumeros[j]) {
				tiene = true;
			}
			j++;
		}
		i++;
	}
	return tiene;
}

window.onload = reiniciar;

/*function adivinar() {
	genio.src = "img/desafio.png";
	numeroIngresado = parseInt(entrada.value);
	entrada.value = "";

	if (intentos > 0) {
		// LE QUEDAN INTENTOS
		if (isNaN(numeroIngresado)) {
			// PUSO CUALQUIER COSA
			cuadroAzul.innerText = "Eso no es un número ¬¬";
		} else if (numeroSecreto == numeroIngresado) {
			// ADIVINO
			boton.disabled = true;
			entrada.disabled = true;
			genio.src = "img/triste.png";
			cuadroAzul.innerText = "Me ganaste ! El numero era: " + numeroSecreto;
			cuadroRojo.innerText = "Adivinaste en " + (8 - intentos) + " intentos.";
		} // POR DESCARTE, NO ADIVINO
		else {
			if (intentos == 1) {
				perder();
			} else {
				intentos = intentos - 1; // intentos--;
				cuadroRojo.innerText = "Te quedan " + intentos + " intentos";

				if (numeroSecreto > numeroIngresado) {
					cuadroAzul.innerText = "Te quedaste cortina, pensé un número más alto";
				} else {
					cuadroAzul.innerText = "Te pasaste, pensé un número más bajo";
				}
			}
		}
	} // SE QUEDO SIN INTENTOS
	else {
		perder();
	}
}

function perder() {
	genio.src = "img/feliz.png";
	cuadroAzul.innerText = "Te gané ! El numero era: " + numeroSecreto;
	cuadroRojo.innerText = "Te quedaste sin intentos";
}
*/
