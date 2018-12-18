var partCoorsRelative = [];
var partsLeft = 9;
var seconds = 0;
var minutes = 0;
var hours = 0;
var t;

function makeDraggable() {
    dragElement(document.getElementById("part1"));
    dragElement(document.getElementById("part2"));
    dragElement(document.getElementById("part3"));
    dragElement(document.getElementById("part4"));
    dragElement(document.getElementById("part5"));
    dragElement(document.getElementById("part6"));
    dragElement(document.getElementById("part7"));
    dragElement(document.getElementById("part8"));
    dragElement(document.getElementById("part9"));

    partCoorsRelative.push(
        { top: 1, left: 1 },
        { top: 182, left: 1 },
        { top: 301, left: 1 },
        { top: 1, left: 56 },
        { top: 242, left: 560 },
        { top: 198, left: 333 },
        { top: 1, left: 356 },
        { top: 1, left: 483 },
        { top: 1, left: 610 }
    );

    timer();
}

function dragElement(element) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    document.getElementById(element.id).onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        element.style.top = (element.offsetTop - pos2) + 'px';
        element.style.left = (element.offsetLeft - pos1) + 'px';
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
        checkCoors(element);
    }
}

function checkCoors(element) {
    var partNum = element.id.replace(/^\D+/g, '');
    var puzzleCoors = getCoors("puzzleSection");
    var gameCoors = getCoors("gameSection");
    var partCoors = getCoors(element.id);
    var topDiff = partCoors.top / (puzzleCoors.top + partCoorsRelative[partNum - 1].top);
    var leftDiff = partCoors.left / (puzzleCoors.left + partCoorsRelative[partNum - 1].left);
    if (topDiff >= 0.96 && topDiff <= 1.04 && leftDiff >= 0.96 && leftDiff <= 1.04) {
        element.onmousedown = 0;
        element.style.position = "absolute";
        var newTop = puzzleCoors.top - gameCoors.top + partCoorsRelative[partNum - 1].top;
        var newLeft = puzzleCoors.left - gameCoors.left + partCoorsRelative[partNum - 1].left;
        element.style.top = newTop + 'px';
        element.style.left = newLeft + 'px';
        element.style.zIndex = "1";
        partsLeft--;
        checkComplete();
    }
}

function getCoors(id) {
    var rect = document.getElementById(id).getBoundingClientRect();
    return rect;
}

function checkComplete() {
    if (partsLeft == 0) {
        clearInterval(t);
        alert(
            "Gratulujem, úspešne si ukončil hru!\n\n" +
            "Tvoj čas je " +
            (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" +
            (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" +
            (seconds > 9 ? seconds : "0" + seconds)
        );
    }
}

function showChecklist() {
    alert(
        "8-12 častí - OK (9)\n" +
        "Nepravidelné časti - OK\n" +
        "Ukončiteľné - OK\n" +
        "Uplynulý čas - OK\n" +
        "Demo - Chýba\n\n" +
        "Autor: Jakub Matušov"
    );
}

function reloadPage() {
    location.reload();
}

function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }

    document.getElementById("timer").textContent =
        "Uplynulý čas: " +
        (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" +
        (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" +
        (seconds > 9 ? seconds : "0" + seconds);
}

function timer() {
    t=setInterval(add, 1000);
}

/*
-----ZDROJE-----
getCoors()
    https://stackoverflow.com/questions/442404/retrieve-the-position-x-y-of-an-html-element
Drag and drop, offset
    https://www.w3schools.com/howto/howto_js_draggable.asp
PartNum
    https://stackoverflow.com/questions/10003683/extract-get-a-number-from-a-string
Stopky
    https://jsfiddle.net/Daniel_Hug/pvk6p/
*/