const config = {
  dayNode: 'pDay',
  monthNode: 'pMonth',
  fullDate: 'fullDateInput',
  finalOutput: 'pFinal',
  searchingName: 'searchingName',
  maxMonthValue: 12,
  maxDayValue: 31,
  maxDatePartStringLength: 2
};

const dataConfig = {
  den: '0',
  SK: 'SK',
  SKd: 'SKd',
  CZ: 'CZ',
  HU: 'HU',
  PL: 'PL',
  AT: 'AT',
}

var xhttp;
var meninyXML;
var zaznam;

/**************************************************************************/

function setNode(node, message) {
  var textnode = document.createTextNode(message);
  node.appendChild(textnode);
  node.style.color = "red";
}

function makeString(dayString, dayNumber) {
  var finalString = dayString;
  if (dayString.length < config.maxDatePartStringLength && dayNumber < 10) {
    finalString = "0" + dayString;
    return finalString;
  }
  return finalString;
}

function checkDateValues(dateMonth, dateDay) {
  var monthNode = document.getElementById(config.monthNode);
  var dayNode = document.getElementById(config.dayNode);
  var message;
  if (dateMonth > config.maxMonthValue) {
    if (!monthNode.hasChildNodes()) {
      message = "*You have invalid Month!!!";
      setNode(monthNode, message);
    }
  } else if (monthNode.hasChildNodes()) {
    monthNode.removeChild(monthNode.childNodes[0]);
  }
  if (dateDay > config.maxDayValue) {
    if (!dayNode.hasChildNodes()) {
      message = "*You have invalid Day!!!";
      setNode(dayNode, message);
    }
  } else if (dayNode.hasChildNodes()) {
    dayNode.removeChild(dayNode.childNodes[0]);
  }
}

function getDate() {
  var searchingDate = '';
  var dateString = document.getElementById(config.fullDate).value;
  var dateDayString = dateString.split(".")[0];
  var dateMonthString = dateString.split(".")[1];

  checkDateValues(parseInt(dateMonthString), parseInt(dateDayString));

  searchingDate += makeString(dateMonthString, parseInt(dateMonthString));
  searchingDate += makeString(dateDayString, parseInt(dateDayString));

  return searchingDate;
}

function getName() {
  var name = document.getElementById(config.searchingName).value;
  return name.toLowerCase();
}

/**************************************************************************/

function findNamesAtDay() {
  var finalNamesOutputP = document.getElementById("pFinalNames");
  finalNamesOutputP.textContent = '';
  var dateString = getDate();
  for (var i = 0; i < zaznam.length; i++) {
    if (zaznam[i].children[dataConfig.den].textContent == dateString) {
      for (var j = 1; j < zaznam[i].children.length; j++) {
        if (zaznam[i].children[j].nodeName == dataConfig.SK) {
          //console.log("SK " + zaznam[i].children[j].textContent);
          finalNamesOutputP.innerHTML += "Nasli sa mena pre SK: " + zaznam[i].children[j].textContent + "<br>";
          continue;
        }
        if (zaznam[i].children[j].nodeName == dataConfig.SKd) {
          //console.log("SKd " + zaznam[i].children[j].textContent);
          finalNamesOutputP.innerHTML += "Nasli sa mena pre SKd: " + zaznam[i].children[j].textContent + "<br>";
          continue;
        }
        if (zaznam[i].children[j].nodeName == dataConfig.CZ) {
          //console.log("CZ " + zaznam[i].children[j].textContent);
          finalNamesOutputP.innerHTML += "Nasli sa mena pre CZ: " + zaznam[i].children[j].textContent + "<br>";
          continue;
        }
        if (zaznam[i].children[j].nodeName == dataConfig.HU) {
          //console.log("HU " + zaznam[i].children[j].textContent);
          finalNamesOutputP.innerHTML += "Nasli sa mena pre HU: " + zaznam[i].children[j].textContent + "<br>";
          continue;
        }
        if (zaznam[i].children[j].nodeName == dataConfig.PL) {
          //console.log("PL " + zaznam[i].children[j].textContent);
          finalNamesOutputP.innerHTML += "Nasli sa mena pre PL: " + zaznam[i].children[j].textContent + "<br>";
          continue;
        }
        if (zaznam[i].children[j].nodeName == dataConfig.AT) {
          //console.log("AT " + zaznam[i].children[j].textContent);
          finalNamesOutputP.innerHTML += "Nasli sa mena pre AT: " + zaznam[i].children[j].textContent + "<br>";
          continue;
        }
      }
    }
  }
}

function findDatesAtName() {
  var finalDatesOutputP = document.getElementById("pFinalDates");
  finalDatesOutputP.textContent = '';
  var nameString = getName();
  for (var i = 0; i < zaznam.length; i++) {
    for (var j = 1; j < zaznam[i].children.length; j++) {
      var compareString = zaznam[i].children[j].textContent.toLowerCase();
      var finalCompareNames = compareString.split(",");
      for (var index = 0; index < finalCompareNames.length; index++) {
        var finalString = finalCompareNames[index].replace(" ","");
        if (zaznam[i].children[j].nodeName == dataConfig.SK) {
          if (finalString == nameString) {
            //console.log("Nasiel sa den pre SK vo vhodnom formate " + makeDate(zaznam[i].children[dataConfig.den].textContent));
            finalDatesOutputP.innerHTML += "Nasiel sa den pre SK vo vhodnom formate " + makeDate(zaznam[i].children[dataConfig.den].textContent) + "<br>";
          }
        }
        if (zaznam[i].children[j].nodeName == dataConfig.SKd) {
          if (finalString == nameString) {
            //console.log("Nasiel sa den pre SKd vo vhodnom formate " + makeDate(zaznam[i].children[dataConfig.den].textContent));
            finalDatesOutputP.innerHTML += "Nasiel sa den pre SKd vo vhodnom formate " + makeDate(zaznam[i].children[dataConfig.den].textContent) + "<br>";
          }
        }
        if (zaznam[i].children[j].nodeName == dataConfig.CZ) {
          if (finalString == nameString) {
            //console.log("Nasiel sa den pre CZ vo vhodnom formate " + makeDate(zaznam[i].children[dataConfig.den].textContent));
            finalDatesOutputP.innerHTML += "Nasiel sa den pre CZ vo vhodnom formate " + makeDate(zaznam[i].children[dataConfig.den].textContent) + "<br>";
          }
        }
        if (zaznam[i].children[j].nodeName == dataConfig.HU) {
          if (finalString == nameString) {
            //console.log("Nasiel sa den pre HU vo vhodnom formate " + makeDate(zaznam[i].children[dataConfig.den].textContent));
            finalDatesOutputP.innerHTML += "Nasiel sa den pre HU vo vhodnom formate " + makeDate(zaznam[i].children[dataConfig.den].textContent) + "<br>";
          }
        }
        if (zaznam[i].children[j].nodeName == dataConfig.PL) {
          if (finalString == nameString) {
            //console.log("Nasiel sa den pre PL vo vhodnom formate " + makeDate(zaznam[i].children[dataConfig.den].textContent));
            finalDatesOutputP.innerHTML += "Nasiel sa den pre PL vo vhodnom formate " + makeDate(zaznam[i].children[dataConfig.den].textContent) + "<br>";
          }
        }
        if (zaznam[i].children[j].nodeName == dataConfig.AT) {
          if (finalString == nameString) {
            //console.log("Nasiel sa den pre AT vo vhodnom formate " + makeDate(zaznam[i].children[dataConfig.den].textContent));
            finalDatesOutputP.innerHTML += "Nasiel sa den pre AT vo vhodnom formate " + makeDate(zaznam[i].children[dataConfig.den].textContent) + "<br>";
          }
        }
      }
    }
  }
}

function makeDate(contentString){
  var dayFinal = contentString.substring(2,4);
  var monthFinal = contentString.substring(0,2);
  return dayFinal + "." + monthFinal;
}

function init() {
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      myFunction(this);
    }
  };
  xhttp.open("GET", "meniny.xml", true);
  xhttp.send();
}

function myFunction(xml) {
  meninyXML = xml.responseXML;
  zaznam = meninyXML.getElementsByTagName("zaznam");
}

window.onload = init();