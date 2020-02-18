const NUM_MIN = 1023;
const NUM_MAX = 9876;
let numeroPensado;

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

function reiniciar() {}
function adivinar() {}

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

for (let index = 0; index < 5; index++) {
	const element = nuevoNumeroPensado();
	console.log(element);
	console.log("tieneCifrasIguales " + tieneCifrasIguales(element));
}

console.log();

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
