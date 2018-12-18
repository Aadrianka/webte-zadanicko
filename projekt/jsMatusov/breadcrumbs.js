var breadcrumbsQueue = [];

function breadcrumbs() {
	var fileName = getFileName();
	if (!(sessionStorage.breadcrumbs)) { //pri prvom nacitani stranky na tabe
		breadcrumbsQueue.push({ title: document.title, href: fileName });
		sessionStorage.setItem("breadcrumbs", JSON.stringify(breadcrumbsQueue));
		printBreadcrumbs();
	}
	else { //pri dalsich nacitaniach
		breadcrumbsQueue = JSON.parse(sessionStorage.getItem("breadcrumbs"));
		if (breadcrumbsQueue.length == 5) {
			breadcrumbsQueue.shift(); //vyhodi prvý prvok v poli, aby sa zachovala veľkosť 5
		}
		breadcrumbsQueue.push({ title: document.title, href: fileName });
		sessionStorage.setItem("breadcrumbs", JSON.stringify(breadcrumbsQueue));
		printBreadcrumbs();
	}
}

function printBreadcrumbs() {
	var i = 0;
	breadcrumbsQueue.forEach(function (element) {
		var link = document.createElement('a');
		link.href = element.href;
		link.innerHTML = element.title;
		document.getElementById("breadcrumbsSpan").appendChild(link);
		if (i != 4) {
			document.getElementById("breadcrumbsSpan").innerHTML += " > ";
		}
		i++;
	});
}

function getFileName() { //funguje správne ak sú všetky *.html súbory v jednom adresári
	var path = window.location.pathname;
	var page = path.split("/").pop();
	return page;
}

/*
-----ZDROJE-----
Queue in JS
	https://stackoverflow.com/questions/1590247/how-do-you-implement-a-stack-and-a-queue-in-javascript
sessionStorage
	https://www.w3schools.com/html/html5_webstorage.asp
Array to sessionStorage
	https://stackoverflow.com/questions/3357553/how-do-i-store-an-array-in-localstorage
For each
	https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
Get file name
	https://stackoverflow.com/questions/16611497/how-can-i-get-the-name-of-an-html-page-in-javascript
*/