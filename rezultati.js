var ime = localStorage.getItem("ime");
var rezultat = localStorage.getItem("rezultat");
var tabela = localStorage.getItem("tabela");
tabela = tabela.split(";")
var dobraTabela = []

tabela.forEach(element => {
	newElem = element.split(":")
	dobraTabela.push(newElem)
});

document.addEventListener("DOMContentLoaded", function () {
	dobraTabela.sort(function (a, b) {
		return b[1] - a[1];
	});
});

$(document).ready(function () {
	let duzina = (dobraTabela.length >= 5) ? 5 : dobraTabela.length
	for (let index = 0; index < duzina; index++) {
		$("#" + (index + 1)).text(
			"" +
				(index + 1) +
				". " +
				dobraTabela[index][0] +
				" : " +
				dobraTabela[index][1]
		);
	}

	$("#najnoviji-rez").text(ime + " : " + rezultat);

	$("#pocetnaBtn").on("click", function () {
		window.location.href = "tetris-uputstvo.html";
	});
});
