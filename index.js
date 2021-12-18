const mainsheet = document.getElementById("mainsheet");
const templates = document.getElementById("sheets");
var sheets = templates.content.children;
var sheetIndex = 0;

/**
 * Cycles through the sheets
 * @param {boolean} [isBackwards] - if true, the sheet index will be moved backwards.
 */
function cycle(isBackwards) {
    sheetIndex += isBackwards ? -1 : 1;
    if (sheetIndex < 0) sheetIndex = sheets.length - 1; else if (sheetIndex >= sheets.length) sheetIndex = 0;
    mainsheet.href = sheets[sheetIndex].href;
}

console.log(sheets);