const NUM_MIN = 1023;
const NUM_MAX = 9876;
let numerosApostados = [];
let cuerpoTabla = document.getElementById("cuerpoTabla");
let inputNumeroApostado = document.getElementById("inputNumeroApostado");
let numeroPensado;
let digitosPensados;
let intentos = 0;

function aleatorioEntre(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

function nuevoNumeroPensado() {
	let x = aleatorioEntre(NUM_MIN, NUM_MAX + 1).toString(10);
	while (tieneDigitosIguales(x)) {
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
	digitosPensados = numeroPensado.split("");
	console.log(numeroPensado);
}

function adivinar() {
	let numeroApostado = inputNumeroApostado.value;
	comprobarNumeroApostado(numeroApostado);
	intentos++;
	numerosApostados.push(numeroApostado);
	let resultados = analizar(numeroApostado);
	colocarFila(intentos, numeroApostado, resultados);
}

function analizar(numeroApostado) {
	let resultados = [0, 0, 0]; // [B, R, M]
	let digitos = numeroApostado.split("");
	for (let d = 0; d < digitos.length; d++) {
		const digito = digitos[d];
		if (esBueno(digito, d)) {
			resultados[0]++;
		} else if (esta(digito)) {
			resultados[1]++;
		} else {
			resultados[2]++;
		}
	}
	return resultados;
}

function esta(digitoApostado) {
	let found = false;
	let i = 0;
	while (!found && i < digitosPensados.length) {
		if (digitoApostado == digitosPensados[i]) {
			found = true;
		}
		i++;
	}
	return found;
}

function esBueno(digitoApostado, posicion) {
	return digitoApostado == digitosPensados[posicion];
}

function comprobarNumeroApostado(num) {
	if (empiezaConCero(num)) {
		throw "El número " + num + " empieza con cero.";
	}
	let pos = existeNumeroApostado(num);
	if (pos != -1) {
		throw "El número " + num + " ya fue apostado en el intento " + (pos + 1) + ".";
	}
	if (tieneDigitosIguales(num)) {
		throw "El número " + num + " tiene dígitos iguales.";
	}
	if (!esNumero(num)) {
		throw num + " no representa un número entero de 4 dígitos.";
	}
}

function esNumero(num) {
	let reg = new RegExp("^[0-9]+$");
	return reg.test(num);
}

function existeNumeroApostado(num) {
	let i = numerosApostados.length - 1;
	let existe = false;
	while (i >= 0 && !existe) {
		if (numerosApostados[i] == num) {
			existe = true;
		} else {
			i--;
		}
	}
	return i;
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

function tieneDigitosIguales(numStr) {
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
