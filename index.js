// Define constant HTML element variables
const mainsheet = document.getElementById("mainsheet");
const templates = document.getElementById("sheets");
const prev = document.getElementById("pButton");
const next = document.getElementById("nButton");
const fadeout = document.getElementById("fadeout")

var isFading = false;
var sheets = Array.from(templates.content.children);
var sheetIndex = 0;

/**
 * Cycles through the page-wide (non-layout) sheets.
 * @param {boolean} [isBackwards] - if true, the sheet index will be moved backwards instead of forwards. Defaults to false.
 */
function cycle(isBackwards = false) {
    // BEWARE TO ALL YE WHO ENTER HERE:
    // THIS CODE IS REALLY GOOD BUT NOT USER FRIENDLY.
    // I HIGHLY RECOMMEND YOU NOT TO LOOK AT IT.
    // If you try to spam click, the animation will not stop. Every time you click, the *destination* sheet will change.
    // The code will not stop the animation.

    // What this means is that clicking the buttons does 2 seperate things:
    // 1. The sheetIndex variable changes (the rest of my rant talks about the Next button but still applies to the Previous button)
    // 2. A transition will start if it is not already transitioning. (check the last paragraph for how to improve this)
    // This is intentional, but counterintuitive.
    // If the user clicks the button TWICE while it is fading TO black,
    // the sheet that they will see when it fades back FROM black will be sheet index + (or - for the back button) 2 (including wraps, i.e. 0, 1, 2, 0 or 0, 2, 1, 0)
    // Remember, the sheetIndex is updated seperately from the animation (which actually applies the stylesheets)
    // That means that ONLY when the animation fades in, the sheetIndex is used to set the actual stylesheet.
    // This is good because it accounts for user input but doesn't interrupt the animation.
    
    // That works for fading TO black, but not FROM black.
    // If the user clicks the button TWICE while it is fading FROM black,
    // the next time they hit the button it will fade to same sheet.

    // TO FIX THE ISSUE:

    // This is because the sheetIndex can change once the transition has already finished. That's not great.
    // I'll fix this later, if you want to fix it then add a variable called isFadingIn and rename isFading to isFadingOut,
    // and add an "if (!isFadingIn)" to the increment/decrement/wrap (commented as "2:00 AM code").

    // Or you could just fix it by just not allowing the user to click the button while the animation is happening.
    // It would be way simpler, but also lame.

    // -W

    if (!isFading) fadeout.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 500, fill: 'forwards' });

    // This is 2:00 AM code. I'm sorry.
    sheetIndex += (isBackwards ? -1 : 1);
    if (sheetIndex < 0) {
        sheetIndex = sheets.length - 1;
    } else if (sheetIndex >= sheets.length) {
        sheetIndex = 0;
    }

    if (!isFading) setTimeout(() => {
        mainsheet.href = sheets[sheetIndex].href;
        fadeout.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 500, fill: 'forwards' });
        setTimeout(() => { isFading = false;} , 500);
    }, 500);

    isFading = true;
}

// Set the button onclicks when the JS loads (after the button is created)
// because it's not possible to set the onclick attribute in the HTML without declaring the JS first (which breaks other stuff).
// Also, this is easier. 
prev.onclick = () => { cycle(true); };
next.onclick = () => { cycle(false); };