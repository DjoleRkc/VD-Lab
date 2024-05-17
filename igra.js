document.addEventListener("DOMContentLoaded", function () {
	var canvas = document.getElementById("igraPolje");
	var odabraniOblici = JSON.parse(localStorage.getItem("selectedBlocks"));
	var tezina = localStorage.getItem("selectedDifficulty");
	var trenutniOblik = null;
	var intervall = null;
	var stariOblik = null;
	var blkSz = 25;
	var brzina = tezina === "Lako" ? 1500 : tezina === "Srednje" ? 1000 : 700;
	var touchedDown = true;

	var redovi = canvas.height / blkSz;
	var kolone = canvas.width / blkSz;
	var board = Array.from({ length: redovi }, () => Array(kolone).fill(null));

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

	nacrtajRandom();

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

	function rotiraj(trenutniOblik, smer) {
		if (smer === "SK") {
			allY = [];
			allX = [];
			for (
				let index = 0;
				index < trenutniOblik.oblik.length - 2;
				index++
			) {
				const y = trenutniOblik.oblik[index][1];
				allY.push(y);
			}

			visina = Math.max(...allY) - Math.min(...allY);
			let noveKoordinate = [];

			for (let i = 0; i < trenutniOblik.oblik.length - 2; i++) {
				novoY = trenutniOblik.oblik[i][0];
				novoX = visina - trenutniOblik.oblik[i][1];
				allX.push(novoX);
				noveKoordinate.push([novoX, novoY]);
			}

			let maxX = Math.max(...allX);
			if ((maxX + trenutniOblik.x) * blkSz >= canvas.width)
				return trenutniOblik;

			noveKoordinate.push(trenutniOblik.oblik[4]);
			noveKoordinate.push(trenutniOblik.oblik[5]);

			wipe();

			noviOblik = {
				oblik: noveKoordinate,
				x: trenutniOblik.x,
				y: trenutniOblik.y,
				boja: trenutniOblik.boja,
			};

			nacrtaj(
				noviOblik.oblik,
				noviOblik.x,
				noviOblik.y,
				blkSz,
				noviOblik.boja
			);
			stariOblik = { ...noviOblik };

			return noviOblik;
		} else if (smer === "SSK") {
			allX = [];
			allNewX = [];
			for (
				let index = 0;
				index < trenutniOblik.oblik.length - 2;
				index++
			) {
				const x = trenutniOblik.oblik[index][0];
				allX.push(x);
			}

			visina = Math.max(...allX) - Math.min(...allX);
			let noveKoordinate = [];

			for (let i = 0; i < trenutniOblik.oblik.length - 2; i++) {
				novoX = trenutniOblik.oblik[i][1];
				allNewX.push(novoX);
				novoY = visina - trenutniOblik.oblik[i][0];
				noveKoordinate.push([novoX, novoY]);
			}

			let maxX = Math.max(...allX);
			if ((maxX + trenutniOblik.x) * blkSz >= canvas.width)
				return trenutniOblik;

			noveKoordinate.push(trenutniOblik.oblik[4]);
			noveKoordinate.push(trenutniOblik.oblik[5]);

			wipe();

			noviOblik = {
				oblik: noveKoordinate,
				x: trenutniOblik.x,
				y: trenutniOblik.y,
				boja: trenutniOblik.boja,
			};

			nacrtaj(
				noviOblik.oblik,
				noviOblik.x,
				noviOblik.y,
				blkSz,
				noviOblik.boja
			);
			stariOblik = { ...noviOblik };

			return noviOblik;
		}
	}

	function kolizija() {
		for (let index = 0; index < trenutniOblik.oblik.length - 2; index++) {
			if (
				isBlockColored(
					trenutniOblik.oblik[index][0] + trenutniOblik.x,
					trenutniOblik.oblik[index][1] + 1 + trenutniOblik.y
				)
			) {
				return true;
			}
		}

		return false;
	}

	function isBlockColored(x, y) {
		if (x < 0 || x >= kolone || y < 0 || y >= redovi) {
			return false;
		}
		return board[x][y] !== null;
	}

	function pomeri() {
		if (trenutniOblik != null) {
			if (stariOblik != null) wipe(stariOblik);

			nacrtaj(
				trenutniOblik.oblik,
				trenutniOblik.x,
				trenutniOblik.y,
				blkSz,
				trenutniOblik.boja
			);

			stariOblik = {
				...trenutniOblik,
			};

			if (
				trenutniOblik.y + maxYCoord(trenutniOblik) >=
					canvas.height / blkSz - 1 ||
				kolizija()
			) {
				clearInterval(intervall);
				console.log(board);
				for (
					let index = 0;
					index < trenutniOblik.oblik.length - 2;
					index++
				) {
					console.log(trenutniOblik.oblik[index][0]);
					console.log(trenutniOblik.oblik[index][1]);
					console.log(trenutniOblik.x);
					console.log(trenutniOblik.y);
					board[trenutniOblik.oblik[index][0] + trenutniOblik.x][
						trenutniOblik.oblik[index][1] + trenutniOblik.y
					] = trenutniOblik.boja;
				}
				intervall = null;
				trenutniOblik = null;
				touchedDown = true;
				stariOblik = null;
				nacrtajRandom();
			}
			trenutniOblik.y += 1;
		}
	}

	function pomeriDole() {
		wipe();

		if ((trenutniOblik.y + 1) * blkSz < canvas.height) {
			trenutniOblik.y += 1;
		}

		nacrtaj(
			trenutniOblik.oblik,
			trenutniOblik.x,
			trenutniOblik.y,
			blkSz,
			trenutniOblik.boja
		);

		stariOblik = {
			...trenutniOblik,
		};
	}

	function pomeriLevo(trenutniOblik) {
		wipe();
		if ((trenutniOblik.x - 1) * blkSz >= 0) {
			trenutniOblik.x -= 1;
		}
		nacrtaj(
			trenutniOblik.oblik,
			trenutniOblik.x,
			trenutniOblik.y,
			blkSz,
			trenutniOblik.boja
		);
		stariOblik = { ...trenutniOblik };
	}

	function pomeriDesno(trenutniOblik) {
		wipe();
		let maxX = -Infinity;
		for (let index = 0; index < trenutniOblik.oblik.length - 2; index++) {
			if (trenutniOblik.oblik[index][0] > maxX)
				maxX = trenutniOblik.oblik[index][0];
		}
		if ((trenutniOblik.x + maxX + 1) * blkSz < canvas.width) {
			trenutniOblik.x += 1;
		}
		nacrtaj(
			trenutniOblik.oblik,
			trenutniOblik.x,
			trenutniOblik.y,
			blkSz,
			trenutniOblik.boja
		);
		stariOblik = { ...trenutniOblik };
	}

	document.addEventListener("keydown", function (event) {
		if (event.key == "z") {
			trenutniOblik = rotiraj(trenutniOblik, "SSK");
		} else if (event.key == "ArrowUp") {
			trenutniOblik = rotiraj(trenutniOblik, "SK");
		} else if (event.key == "ArrowLeft") {
			pomeriLevo(trenutniOblik);
		} else if (event.key == "ArrowRight") {
			pomeriDesno(trenutniOblik);
		} else if (event.key == "ArrowDown") {
			pomeriDole();
		}
	});

	function nacrtajRandom() {
		touchedDown = false;

		while (true) {
			trenutniOblik = null;
			let randomNum = Math.floor(Math.random() * odabraniOblici.length);

			let randomOblik = odabraniOblici[randomNum];

			oblici.forEach((element) => {
				if (element.includes(randomOblik)) {
					trenutniOblik = {
						oblik: element,
						x: Math.floor(Math.random() * 22),
						y: 0,
						boja: element[5],
					};
				}
			});

			if (trenutniOblik != null) break;
		}
		if (!intervall) {
			intervall = setInterval(pomeri, brzina);
		}
	}

	function wipe() {
		if (stariOblik != null)
			for (let index = 0; index < stariOblik.oblik.length - 2; index++) {
				context.clearRect(
					(stariOblik.x + stariOblik.oblik[index][0]) * blkSz - 1,
					(stariOblik.y + stariOblik.oblik[index][1]) * blkSz - 1,
					blkSz + 2,
					blkSz + 2
				);
			}
	}
});
