let sheet = document.getElementById("sheet");

function cycle() {
    sheet.setAttribute("href", "style2.css");
}

function cycleNext() {
    sheet.setAttribute("href", "style3.css");
}

function cycleBack() {
    sheet.setAttribute("href", "style.css");
}
