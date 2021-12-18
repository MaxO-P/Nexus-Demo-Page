const mainsheet = document.getElementById("mainsheet");
const templates = document.getElementById("sheets");
const prev = document.getElementById("pButton");
const next = document.getElementById("nButton");
var sheets = Array.from(templates.content.children);
console.log(sheets)
var sheetIndex = 0;

/**
 * Cycles through the sheets
 * @param {boolean} [isBackwards] - if true, the sheet index will be moved backwards.
 */
function cycle(isBackwards = false) {
    // This is 2:00 AM code. I'm sorry.
    sheetIndex += (isBackwards ? -1 : 1);
    if (sheetIndex < 0) {
        sheetIndex = sheets.length - 1;
    } else if (sheetIndex >= sheets.length) {
        sheetIndex = 0;
    }
    mainsheet.href = sheets[sheetIndex].href;
}

prev.onclick = () => { cycle(true); };
next.onclick = () => { cycle(false); };