document.addEventListener("DOMContentLoaded", function () {
	var canvas = document.getElementById("igraPolje");
	var odabraniOblici = JSON.parse(localStorage.getItem("selectedBlocks"));
	var tezina = localStorage.getItem("selectedDifficulty");
	var trenutniOblik = null;
	var intervall = null;
	var blkSz = 25;
	var brzina = tezina === "Lako" ? 1500 : tezina === "Srednje" ? 1000 : 500;

	var context = canvas.getContext("2d");

	oblici = [
		[
			//I
			[0, 0],
			[0, 1],
			[0, 2],
			[0, 3],
			"i-block",
			"cyan",
		],
		[
			//O
			[0, 0],
			[0, 1],
			[1, 0],
			[1, 1],
			"o-block",
			"yellow",
		],
		[
			//J
			[0, 2],
			[1, 0],
			[1, 1],
			[1, 2],
			"j-block",
			"blue",
		],
		[
			//T
			[0, 0],
			[1, 0],
			[1, 1],
			[2, 0],
			"t-block",
			"purple",
		],
		[
			//L
			[0, 0],
			[0, 1],
			[0, 2],
			[1, 2],
			"l-block",
			"orange",
		],
		[
			//Z
			[0, 0],
			[1, 0],
			[1, 1],
			[2, 1],
			"z-block",
			"red",
		],
		[
			//S
			[0, 1],
			[1, 0],
			[1, 1],
			[2, 0],
			"s-block",
			"green",
		],
	];

	function nacrtaj(oblik, stX, stY, blkSz, boja) {
		context.fillStyle = boja;

		oblik.forEach(([x, y]) => {
			context.fillRect(
				(stX + x) * blkSz,
				(stY + y) * blkSz,
				blkSz,
				blkSz
			);
			context.strokeRect(
				(stX + x) * blkSz,
				(stY + y) * blkSz,
				blkSz,
				blkSz
			);
		});
	}

	function maxYCoord(trenOblik) {
		let maxY = -Infinity;
		for (let index = 0; index < trenOblik.oblik.length - 2; index++) {
			const [, y] = trenOblik.oblik[index];
			if (y > maxY) maxY = y;
		}

		return maxY;
	}

	function pomeri() {
		if (trenutniOblik != null) {
			wipe();
			nacrtaj(
				trenutniOblik.oblik,
				trenutniOblik.x,
				trenutniOblik.y,
				blkSz,
				trenutniOblik.boja
			);
			trenutniOblik.y += 1;

			if (
				trenutniOblik.y + maxYCoord(trenutniOblik) >=
				canvas.height / blkSz
			) {
				clearInterval(intervall);
				trenutniOblik = null;
			}
		}
	}

	function nacrtajRandom() {
		let randomNum = Math.floor(Math.random() * odabraniOblici.length);

		let randomOblik = odabraniOblici[randomNum];

		oblici.forEach((element) => {
			if (element.includes(randomOblik)) {
				trenutniOblik = {
					oblik: element,
					x: Math.floor(Math.random() * 8),
					y: 0,
					boja: element[5],
				};
			}

			if (!intervall) {
				intervall = setInterval(pomeri, brzina);
			}
		});
	}

	function wipe() {
		context.clearRect(0, 0, canvas.width, canvas.height);
	}

	nacrtajRandom();
});

/*document.addEventListener("keydown", function (event) {
			if (event.key === "ArrowLeft") {
				console.log("Up arrow");
			}
		});*/
