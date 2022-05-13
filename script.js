let arrfiled = [];
let counter = document.querySelector('#counter');

let outputpdfs = document.querySelector('#outputpdfs');
let outdoc = document.querySelector('#outdoc');
let fld = document.querySelector('#fld');
let vl = document.querySelector('#vl');
let chb = document.querySelector('#chb');
let orig = document.querySelector('#orig');
let table1 = document.querySelector("#table1");
let tableStat = document.querySelector("#tableStat");
let fileot = document.querySelector("#fileot");
let status = document.querySelector("#status");
status.classList.add("ots");
let tablescrollbodyb = document.querySelector("#ochm");
let addbuttondelete = document.querySelector("#addbuttondelete");
let statuscsv = document.querySelector("#statuscsv");
let statuschb = document.querySelector("#statuchb");
let buttonorig = document.querySelector("#buttondocorig");
let buttonorig2 = document.querySelector("#buttondocorig2");

const requestURL = 'http://10.3.21.207:8080';

const functFetchDoctypeGet = function () {
	fetch(requestURL + '/doctype')
		.then((response) => response.json())
		.then((json) => {
			console.log(json);
			json.sort(function (objstart2, objend2) {
				return objstart2.id - objend2.id;
			});
			console.log(json);
			json.forEach((el) => {
				const trfirst = document.createElement('tr');
				const divbotton = document.createElement('button');
				divbotton.classList.add("buttontable");
				const divid = document.createElement('td');
				divid.classList.add("tdcolm");
				divid.append(divbotton);
				const divfiled = document.createElement('td');
				const divoriginalLocation = document.createElement('td');
				const divname = document.createElement('td');

				divbotton.textContent = el["id"];
				console.log(divbotton);
				let fldstr = '';
				el["fields"].forEach((item, index, array) => {
					if (el["fields"].length - 1 == index) {
						fldstr += item;
					} else {
						fldstr += item + ', ';
					}
				});
				divfiled.textContent = fldstr;
				divoriginalLocation.textContent = el["originalLocation"];
				divname.textContent = el["name"];

				table1.append(trfirst);
				trfirst.append(divid);
				trfirst.append(divfiled);
				trfirst.append(divoriginalLocation);
				trfirst.append(divname);


				divbotton.addEventListener("click", function () {
					outputpdfs.textContent = "";
					functFetchDocumentGet(el["id"]);
					functFetchStatCsvFigleGet(el["id"]);
					buttonorigfunct(el["id"]);
					downlcsvfile(el["id"]);
				});
			});
		});
}

const functFetchDocumentGet = function (id) {
	fetch(requestURL + '/document?doctypeId=' + id)
		.then((response) => response.json())
		.then((json) => {
			console.log(json);
			let idend = json.length;
			json.sort(function (objstart, objend) {
				return objstart.id - objend.id;
			});
			console.log(json);
			console.log(idend);

			let conpp = 0;
			let con = 0;
			let cn = 1;
			json.forEach((el) => {

				console.log(el["id"]);
				if (con == 0) {
					const trverd = document.createElement('tr');
					const td = document.createElement('td');
					td.textContent = 'Выберите document';
					outputpdfs.append(trverd);
					trverd.append(td);
					const keys = Object.keys(el);
					console.log(keys);
					for (let i = 0; i < keys.length; ++i) {
						const tdaf = document.createElement('td');
						tdaf.textContent = keys[i];
						trverd.append(tdaf);
					}
				}
				con++;

				const values = Object.values(el);
				console.log(values);
				const trad = document.createElement('tr');
				const tdb = document.createElement('td');
				outputpdfs.append(trad);
				const buttonc = document.createElement('button');
				buttonc.classList.add("buttontable");
				buttonc.textContent = cn;
				trad.append(tdb);
				tdb.append(buttonc);
				cn++;
				for (let ii = 0; ii < values.length; ++ii) {
					const tdad = document.createElement('td');
					tdad.textContent = values[ii];

					trad.append(tdad);
				}

				buttonc.addEventListener("click", function () {
					functFetchDocumentIpGet(el["id"]);
					funcchb(el["id"], id);
					oncl(el["id"], id);
					funcchb(el["id"]);
					buttonspdf(el["id"], idend);
					buttonorigfunct2(el["id"]);
				});
			});
		});
}

const functFetchDocumentIpGet = function (iddoc) {
	console.log(iddoc);
	outdoc.textContent = "";
	fetch(requestURL + '/document/' + iddoc)
		.then((response) => response.json())
		.then((json) => {
			console.log(json);
			console.log(json["original"]);
			document.getElementById("formurl").src = json["original"];
			const keys = Object.keys(json);
			const values = Object.values(json);

			for (let b = 0; b < keys.length; ++b) {
				if (keys[b] == "checked") {
					chb.checked = values[b];
					break;
				}
			}

			const tr11 = document.createElement('tr');
			const tr22 = document.createElement('tr');
			outdoc.append(tr11);
			outdoc.append(tr22);

			for (let l = 0; l < keys.length; ++l) {
				const td11 = document.createElement('td');
				const td22 = document.createElement('td');
				outdoc.append(tr11);
				outdoc.append(tr22);
				td11.textContent = keys[l];
				td22.textContent = values[l];
				tr11.append(td11);
				tr22.append(td22);
			}
		});
}

functFetchDoctypeGet();

const functFetchStatCsvFigleGet = function (id) {
	fetch(requestURL + '/statistics?doctypeId=' + id)
		.then((response) => response.json())
		.then((json) => {
			console.log(json);
				tableStat.textContent = "";

				const trcsvstat = document.createElement('tr');
				const uploadedcsv = document.createElement('td');
				const checkedcsv = document.createElement('td');
				const checkedWithErrorscsv = document.createElement('td');

				uploadedcsv.textContent = json["uploaded"];
				checkedcsv.textContent = json["checked"];
				checkedWithErrorscsv.textContent = json["checkedWithErrors"];

				tableStat.append(trcsvstat);
				trcsvstat.append(uploadedcsv);
				trcsvstat.append(checkedcsv);
				trcsvstat.append(checkedWithErrorscsv);
			});
}

let ncon = 0;

buttfiled.onclick = function () {
	var elarr = document.getElementById('elarr').value;

	arrfiled.push(elarr);
	console.log(arrfiled);
	counter.textContent = "[" + arrfiled + "]";
	document.getElementById('elarr').value = '';
	if (arrfiled.length !== 0 && ncon == 0) {
		let buttondelete = document.createElement('button');
		buttondelete.textContent = "↩";
		buttondelete.classList.add('buttondelete');
		buttondelete.id = "buttondelete";

		addbuttondelete.append(buttondelete);
		ncon = 1;
	} else if (ncon == 1 && arrfiled.length == 0) {
		console.log("Удалить кнопку");
		document.querySelector("#buttondelete").parentNode.removeChild(document.querySelector("#buttondelete"));
		ncon = 0;
	}

	buttondelete.onclick = function () {
		arrfiled.pop();
		counter.textContent = "[" + arrfiled + "]";
		if (arrfiled.length == 0) {
			console.log("Удалить кнопку");
			document.querySelector("#buttondelete").parentNode.removeChild(document.querySelector("#buttondelete"));
			return ncon = 0;
		}

	}
};

buttdoctype.onclick = function () {
	if (document.getElementById('el1').value === "" || document.getElementById('el2').value === "" || arrfiled.length == 0) {
		status.textContent = 'Ошибка! Вы не ввели название, ссылку или ни одного поля';
	} else {
		status.textContent = "";
		counter.textContent = "...";

		var el1 = document.getElementById('el1').value;
		var el2 = document.getElementById('el2').value;
		document.getElementById('el1').value = '';
		document.getElementById('el2').value = '';
		document.getElementById('elarr').value = '';
		console.log(el1, el2, arrfiled);

		const headers = {
			'Content-Type': 'application/json'
		}

		const body = {
			name: el1,
			originalLocation: el2,
			fields: arrfiled
		}

		console.log(JSON.stringify(body));

		fetch(requestURL + '/doctype', {
			method: 'POST',
			body: JSON.stringify(body),
			headers: headers
		})
			.then(response => {
				if (response.ok) {
					table1.textContent = "";
					tableStat.textContent = "";
					functFetchDoctypeGet();
					functFetchStatCsvFigleGet();
				}

				console.log(JSON.stringify(body));

				return response.json().then(err => {
					console.log(err);
				})
			})
	}
	arrfiled = [];
}

/* Нач. измененный и оригинальные док */

const functFetchDocumentGetOriginal = function (id) {
	fetch(requestURL + '/document?doctypeId=' + id + '&getOriginal=true')
		.then((response) => response.json())
		.then((json) => {
			console.log(json);
			let idend = json.length;
			json.sort(function (objstart, objend) {
				return objstart.id - objend.id;
			});
			console.log(json);
			console.log(idend);

			let conpp = 0;
			let con = 0;
			let cn = 1;
			json.forEach((el) => {

				console.log(el["id"]);
				if (con == 0) {
					const trverd = document.createElement('tr');
					const td = document.createElement('td');
					td.textContent = 'Выберите document';
					outputpdfs.append(trverd);
					trverd.append(td);
					const keys = Object.keys(el);
					console.log(keys);
					for (let i = 0; i < keys.length; ++i) {
						const tdaf = document.createElement('td');
						tdaf.textContent = keys[i];
						trverd.append(tdaf);
					}
				}
				con++;

				const values = Object.values(el);
				console.log(values);
				const trad = document.createElement('tr');
				const tdb = document.createElement('td');
				outputpdfs.append(trad);
				const buttonc = document.createElement('button');
				buttonc.classList.add("buttontable");
				buttonc.textContent = cn;
				trad.append(tdb);
				tdb.append(buttonc);
				cn++;
				for (let ii = 0; ii < values.length; ++ii) {
					const tdad = document.createElement('td');
					tdad.textContent = values[ii];

					trad.append(tdad);
				}

				buttonc.addEventListener("click", function () {
					functFetchDocumentIpGet(buttonc.textContent);
					oncl(buttonc.textContent, id);
					funcchb(buttonc.textContent);
					buttonspdf(buttonc.textContent, idend);
				});
			});
		});

}

const functFetchDocumentIpGetOriginal = function (id) {
	outdoc.textContent = "";
	fetch(requestURL + '/document/' + id + '?getOriginal=true')
		.then((response) => response.json())
		.then((json) => {
			console.log(json);
			console.log(json["original"]);
			document.getElementById("formurl").src = json["original"];
			const keys = Object.keys(json);
			const values = Object.values(json);

			for (let b = 0; b < keys.length; ++b) {
				if (keys[b] == "checked") {
					chb.checked = values[b];
					break;
				}
			}

			const tr11 = document.createElement('tr');
			const tr22 = document.createElement('tr');
			outdoc.append(tr11);
			outdoc.append(tr22);

			for (let l = 0; l < keys.length; ++l) {
				const td11 = document.createElement('td');
				const td22 = document.createElement('td');
				outdoc.append(tr11);
				outdoc.append(tr22);
				td11.textContent = keys[l];
				td22.textContent = values[l];
				tr11.append(td11);
				tr22.append(td22);
			}
		});

}

const buttonorigfunct = function (id) {

	buttonorig.onclick = function () {
		if (buttonorig.value == "Показать все ориг. док.") {
			outputpdfs.textContent = "";
			functFetchDocumentGetOriginal(id);
			buttonorig.value = "Показать все измен. док.";
		} else {
			outputpdfs.textContent = "";
			buttonorig.value = "Показать все ориг. док.";
			functFetchDocumentGet(id);
		}
	}
}

const buttonorigfunct2 = function (id) {
	buttonorig2.onclick = function () {
		if (buttonorig2.value == "Показать оригинальный док.") {
			functFetchDocumentIpGetOriginal(id);
			buttonorig2.value = "Показать измененный док.";
		} else {
			functFetchDocumentIpGet(id);
			buttonorig2.value = "Показать оригинальный док.";
		}
	}
}

/* Конец */

$(document).on('click', '#btn', function () {
	var iddoctype = document.getElementById('iddoctype').value;
	console.log(iddoctype);
	var formData = new FormData();
	formData.append("file", document.getElementById("file").files[0]);
	var xhr = new XMLHttpRequest();
	xhr.open("POST", requestURL + '/upload?doctypeId=' + iddoctype);
	xhr.send(formData);
	if (xhr.status !== 200) {
		alert("Error! Reload the page");
	}
});


/* чекбокс */

const funcchb = function (idout, id) {

	$("#chb").change(function () {
		if (this.checked) {

			fetch(requestURL + '/document/' + idout)
				.then((response) => response.json())
				.then((json) => {
					console.log(json);
					let ind = 0;
					const keys = Object.keys(json);
					const values = Object.values(json);

					for (let b = 0; b < keys.length; ++b) {
						if (keys[b] == "checked") {
							values[b] = "true";
							console.log(values[b]);
							break;
						}
					}

					var body = new Object();

					for (let d = 0; d < keys.length; ++d) {
						body[keys[d]] = values[d]
					}

					console.log(body);

					const headers = {
						'Content-Type': 'application/json'
					}

					fetch(requestURL + '/document/' + idout, {
						method: 'POST',
						body: JSON.stringify(body),
						headers: headers
					})
						.then(response => {
							if (response.ok) {
									outputpdfs.textContent = "";
									functFetchDocumentIpGet(idout);
									functFetchDocumentGet(id);
									buttonorig.value = "Показать все ориг. док.";
									buttonorig2.value = "Показать оригинальный док.";
							}

							return response.json().then(err => {
								console.log(err);
							})
						})
				});

		} else {
			fetch(requestURL + '/document/' + idout)
				.then((response) => response.json())
				.then((json) => {
					console.log(json);
					let ind = 0;
					const keys = Object.keys(json);
					const values = Object.values(json);

					for (let b = 0; b < keys.length; ++b) {
						if (keys[b] == "checked") {
							values[b] = "false";
							console.log(values[b]);
							break;
						}
					}

					var body = new Object();

					for (let d = 0; d < keys.length; ++d) {
						body[keys[d]] = values[d]
					}

					console.log(body);

					const headers = {
						'Content-Type': 'application/json'
					}

					fetch(requestURL + '/document/' + idout, {
						method: 'POST',
						body: JSON.stringify(body),
						headers: headers
					})
						.then(response => {
							if (response.ok) {
									outputpdfs.textContent = "";
									functFetchDocumentIpGet(idout);
									functFetchDocumentGet(id);
									buttonorig.value = "Показать все ориг. док.";
									buttonorig2.value = "Показать оригинальный док.";
							}

							return response.json().then(err => {
								console.log(err);
							})
						})
				});
		}
	});
}

const oncl = function (idout, id) {
	let connach = 0;
	butfld.onclick = function () {
		console.log(idout);
		var fld = document.getElementById('fld').value;
		var vl = document.getElementById('vl').value;
		if (fld === "" || vl === "") {
			if (connach !== 0) {
				statuschb.textContent = 'Ошибка! Вы не ввели название или значение поля';
			} else {
				connach++;
			}
		} else {
			if (fld == "id") {
				statuschb.textContent = 'Ошибка! Изменить значение поля "id" нельзя';
			} else if (fld == "checked") {
				statuschb.textContent = 'Ошибка! Чтобы изменить поле "checked" используйте чекбокс';
			} else if (fld == "checksum") {
				statuschb.textContent = 'Ошибка! Изменить значение поля "checksum" нельзя';
			} else if (fld == "changed") {
				statuschb.textContent = 'Ошибка! Изменить значение поля "changed" нельзя';
			} else if (fld == "doctypeName") {
				statuschb.textContent = 'Ошибка! Изменить значение поля "doctypeName" нельзя';
			} else {
				statuschb.textContent = '';
				fetch(requestURL + '/document/' + idout)
					.then((response) => response.json())
					.then((json) => {
						console.log(json);
						let ind = 0;
						const keys = Object.keys(json);
						const values = Object.values(json);

						for (let b = 0; b < keys.length; ++b) {
							if (keys[b] == fld) {
								ind = b;
								break;
							}
						}

						values[ind] = vl;
						console.log(values[ind]);

						var body = new Object();

						for (let d = 0; d < keys.length; ++d) {
							body[keys[d]] = values[d]
						}

						console.log(body);

						const headers = {
							'Content-Type': 'application/json'
						}

						fetch(requestURL + '/document/' + idout, {
							method: 'POST',
							body: JSON.stringify(body),
							headers: headers
						})
							.then(response => {
								if (response.ok) {
									functFetchDocumentIpGet(idout);
									outputpdfs.textContent = "";
									functFetchDocumentGet(id);
									buttonorig.value = "Показать все ориг. док.";
									buttonorig2.value = "Показать оригинальный док.";
								}

								return response.json().then(err => {
									alert("Ошибка! Кто-то уже изменяет значение полей. Перезагрузите страницу");
								})
							})
					});
			}
		}
	}
}

// Скрипт поиска

function myFunction() {

	var input, filter, table, tr, td, i;
	input = document.getElementById("myInput");
	filter = input.value.toUpperCase();
	table = document.getElementById("outputpdfs");
	tr = table.getElementsByTagName("tr");

	for (i = 0; i < tr.length; i++) {
		td = tr[i].getElementsByTagName("td")[0];
		if (td) {
			if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
				tr[i].style.display = "";
			} else {
				tr[i].style.display = "none";
			}
		}
	}
}

function myFunction2() {
	var input, filter, table, tr, td, i;
	input = document.getElementById("myInput2");
	filter = input.value.toUpperCase();
	table = document.getElementById("table1");
	tr = table.getElementsByTagName("tr");

	for (i = 0; i < tr.length; i++) {
		td = tr[i].getElementsByTagName("td")[0];
		if (td) {
			if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
				tr[i].style.display = "";
			} else {
				tr[i].style.display = "none";
			}
		}
	}
}

/* Стрелки пдф */

const buttonspdf = function (idd, iddend) {
	let id = Number(idd);
	let idend = Number(iddend);
	buttonpdf1.onclick = function () {
		if (id !== 1) {
			id = id - 1;
			buttonorigfunct2(id);
			buttonorig2.value = "Показать оригинальный док."
			functFetchDocumentIpGet(id);
		}
	}
	buttonpdf2.onclick = function () {
		if (id !== idend) {
			id = id + 1;
			buttonorigfunct2(id);
			buttonorig2.value = "Показать оригинальный док."
			functFetchDocumentIpGet(id);
		}
	}
}

/* Скачать csv файл */

const downlcsvfile = function (id) {
	$('.download').on('click', function () {
		var link = document.createElement('a');
		link.setAttribute('href', 'http://10.3.21.207:8080/download?doctypeId=' + id);
		link.setAttribute('download', '.csv');
		link.click();
		return false;
	});
}