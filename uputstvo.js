function autoResize() {
	var textarea = document.getElementById("tekst-uputstva");
	textarea.style.height = "auto";
	textarea.style.height = textarea.scrollHeight + 10 + "px";
}

$(document).ready(function () {
	var tekstUputstva =
		"In the vast expanse of the cosmos, galaxies collide and stars are born. Light dances across the universe, painting a canvas of shimmering wonders. On a small blue planet called Earth, life flourishes in diverse forms. From towering forests to sprawling cities, the world teems with activity.midst this vibrant tapestry, human endeavors take shape. Scientists probe the mysteries of quantum mechanics, while artists capture fleeting emotions on canvas. In bustling markets, traders barter goods with a timeless rhythm. Meanwhile, children play in sunlit meadows, their laughter echoing through the air.Across continents, cultures intertwine like threads in a tapestry. Music, with its universal language, unites hearts and minds. From the haunting melodies of distant lands to the rhythmic beats of urban streets, every note tells a story.";

	$("#tekst-uputstva").val(tekstUputstva);
	autoResize();

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
