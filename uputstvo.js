function autoResize() {
	var textarea = document.getElementById("tekst-uputstva");
	textarea.style.height = "auto";
	textarea.style.height = textarea.scrollHeight + 10 + "px";
}

$(document).ready(function () {
	var tekstUputstva =
		"Cilj ove igre je, koristeci tastere, pomerati blokove koji padaju sa vrha prostora za igru sa ciljem da ih slozite na nacin tako da izmedju blokova ostane sto manje praznog prostora. Kada se jedan ceo red popuni, ceo taj red nestaje, a svi blokovi iznad se spustaju za jedan nivo i time ostvarujete poene. Kako tok igre napreduje, blokovi padaju sve brze te imate sve manje vremena za razmisljanje i slaganje. Kada se blokovi nagomilaju do vrha polja za igru, bez mogucnosti da se novi blok pojavi, igra je gotova. Nivo igre utice na pocetnu brzinu padanja blokova. U svakom trenutku igre pada jedan blok na koji moze da se utice tako sto se on pomera levo-desno, brze spusta na dno, ili rotira. Kada blok padne na dno table ili na drugi blok, on se zaustavlja, a na vrhu table se generise nov blok.";

	$("#tekst-uputstva").val(tekstUputstva);
	autoResize();

	$("#rezultatiBtn").on("click", function () {
		window.location.href = "tetris-rezultati.html";
	});

	$(".tezina-btn").click(function () {
		var isActive = $(this).attr("data-active") === "true";
		$(this).attr("data-active", !isActive);

		if (!isActive) {
			$(this).addClass("active");
		} else {
			$(this).removeClass("active");
		}
	});

	$("#rezultatiBtn").click(function () {
		window.location.href = "tetris-rezultati.html";
	});
});

function handleSelection() {
	const selectedButtons = document.querySelectorAll(
		'input[type="checkbox"]:checked'
	);

	selectedButtons.forEach((button) => {
		button.addEventListener("click", function () {
			console.log(this.checked);
			this.checked = !this.checked;
		});
	});

	const buttonGroup = document.querySelector(".btn-group");

	const selectedDiff = buttonGroup.querySelectorAll(".btn input:checked");

	if (selectedButtons.length < 2 || selectedDiff.length != 1) {
		alert("Morate odabrati barem dve vrste blokova i tačno jednu težinu");
	} else {
		let selectedBlocks = [];
		selectedButtons.forEach((button) => {
			let imgSrc = button.id.replace("-radio", "");
			selectedBlocks.push(imgSrc);
			localStorage.setItem(
				"selectedBlocks",
				JSON.stringify(selectedBlocks)
			);
			localStorage.setItem("selectedDifficulty", selectedDiff[0].value);
		});

		window.location.href = "tetris-igra.html";
	}
}
