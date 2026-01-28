const input = document.getElementById("input-field");
const keyboard = document.querySelector(".key-board");
const buttons = document.querySelectorAll(".key-board button");

let capsLockOn = false;

/*VIRTUAL KEYBOARD CLICK*/
keyboard.addEventListener("click", function (event) {
    if (event.target.tagName !== "BUTTON") return;

   
    let key = event.target.dataset.key || event.target.innerText;

    /* CapsLock Toggle */
    if (event.target.id === "caps-lock") {
        capsLockOn = !capsLockOn;
        event.target.classList.toggle("active", capsLockOn);
        return;
    }

    if (
        key === "Shift" ||
        key === "Ctrl" ||
        key === "Alt" ||
        key === "Win" ||
        key === "fn"
    ) return;

    if (key === "Backspace") {
        input.value = input.value.slice(0, -1);
        return;
    }

    if (key === "Enter") {
        input.value += "\n";
        return;
    }

    if (key === "Tab") {
        input.value += "\t";
        return;
    }

    if (key === "Space") {
        input.value += " ";
        return;
    }

    if (/^[a-zA-Z]$/.test(key)) {
        input.value += capsLockOn
            ? key.toUpperCase()
            : key.toLowerCase();
    } else {
        input.value += key;
    }
});

/* PHYSICAL KEYBOARD KEYDOWN */
document.addEventListener("keydown", function (event) {
    let pressedKey = event.key;

    if (pressedKey === " ") pressedKey = "Space";

    if (pressedKey === "CapsLock") {
        capsLockOn = !capsLockOn;
    }

    buttons.forEach(btn => {
        if (
            btn.dataset.key === pressedKey ||
            btn.dataset.key === pressedKey.toUpperCase() ||
            btn.innerText === pressedKey
        ) {
            btn.classList.add("active");
        }

        if (btn.id === "caps-lock") {
            btn.classList.toggle("active", capsLockOn);
        }
    });

    /* Typing logic */
    if (/^[a-zA-Z]$/.test(event.key)) {
        input.value += capsLockOn
            ? event.key.toUpperCase()
            : event.key.toLowerCase();
    } else if (event.key === "Backspace") {
        input.value = input.value.slice(0, -1);
    } else if (event.key === "Enter") {
        input.value += "\n";
    } else if (event.key === " ") {
        input.value += " ";
    }
});

/*PHYSICAL KEYBOARD KEYUP*/
document.addEventListener("keyup", function (event) {
    let releasedKey = event.key;
    if (releasedKey === " ") releasedKey = "Space";

    buttons.forEach(btn => {
        if (
            btn.dataset.key === releasedKey ||
            btn.dataset.key === releasedKey?.toUpperCase() ||
            btn.innerText === releasedKey
        ) {
            btn.classList.remove("active");
        }
    });
});
