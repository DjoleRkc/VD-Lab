function autoResize(textarea) {
	textarea.style.height = "auto";
	textarea.style.height = textarea.scrollHeight + 10 + "px";
}

window.onload = function () {
	var textarea = document.getElementById("tekst-uputstva");
	var tekstUputstva =
		"In the vast expanse of the cosmos, galaxies collide and stars are born. Light dances across the universe, painting a canvas of shimmering wonders. On a small blue planet called Earth, life flourishes in diverse forms. From towering forests to sprawling cities, the world teems with activity.midst this vibrant tapestry, human endeavors take shape. Scientists probe the mysteries of quantum mechanics, while artists capture fleeting emotions on canvas. In bustling markets, traders barter goods with a timeless rhythm. Meanwhile, children play in sunlit meadows, their laughter echoing through the air.Across continents, cultures intertwine like threads in a tapestry. Music, with its universal language, unites hearts and minds. From the haunting melodies of distant lands to the rhythmic beats of urban streets, every note tells a story.";
	textarea.value = tekstUputstva;
	autoResize(textarea);
};

function handleSelection() {
	const selectedButtons = document.querySelectorAll(
		'input[type="radio"]:checked'
	);

	const zapocniIgruBtn = document.getElementById("zapocniIgruBtn");

	zapocniIgruBtn.addEventListener("click", function () {
		window.location.href = "tetris-igra.html";
	});

	const buttonGroup = document.querySelector(".btn-group");

	const selectedDiff = buttonGroup.querySelectorAll(".btn input:checked");

	if (selectedButtons.length < 2 || selectedDiff.length != 1) {
		alert("Morate odabrati barem dve vrste blokova i tačno jednu težinu");
	}
}
