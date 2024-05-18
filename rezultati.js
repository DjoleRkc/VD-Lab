let ime = localStorage.getItem("ime");
let rezultat = localStorage.getItem("rezultat");

$(document).ready(function () {
	$("#najnoviji-rez").text(ime + " : " + rezultat);

	$("#pocetnaBtn").on("click", function () {
		window.location.href = "tetris-uputstvo.html";
	});
});
