const NUM_MIN = 1023;
const NUM_MAX = 9876;
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
	console.log(x);
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
	intentos++;
	let numeroApostado = inputNumeroApostado.value;
	console.log(numeroApostado);

	let tds = [];
	for (let index = 0; index < 5; index++) {
		let nodo = document.createElement("td");
		nodo.innerText = "hola";
		console.log(nodo);
		tds.push(nodo);
	}
	let nuevaFila = document.createElement("tr");
	for (let index = 0; index < 5; index++) {
		nuevaFila.appendChild(tds[index]);
	}

	cuerpoTabla.appendChild(nuevaFila);
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
