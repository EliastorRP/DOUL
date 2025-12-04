// Mot de passe attendu : VI.02-140
// Hash SHA-256 de "VI.02-140"
const PASSWORD_HASH_HEX = "6c9b49ccaebb88f5a80fe10f1a3d255ccb282d7317d4102e2da7d9b3ec6f6c38";

// Convertit un ArrayBuffer en string hex
function bufferToHex(buffer) {
    const bytes = new Uint8Array(buffer);
    let hex = "";
    for (let i = 0; i < bytes.length; i++) {
        const h = bytes[i].toString(16).padStart(2, "0");
        hex += h;
    }
    return hex;
}

// Hash SHA-256 d'une chaîne
async function sha256(text) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const digest = await crypto.subtle.digest("SHA-256", data);
    return bufferToHex(digest);
}

document.addEventListener("DOMContentLoaded", () => {
    // --- Effet "lettres qui vibrent" sur la devinette ---
    const riddleEl = document.querySelector(".riddle");
    if (riddleEl) {
        const text = riddleEl.textContent.trim();
        riddleEl.textContent = "";

        // On découpe en caractères pour animer chaque lettre
        text.split("").forEach((ch, index) => {
            const span = document.createElement("span");
            span.textContent = ch;
            span.style.setProperty("--char-index", index);
            if (ch === " ") {
                span.classList.add("space");
            }
            riddleEl.appendChild(span);
        });
    }

    // --- Logique du formulaire de mot de passe ---
    const form = document.getElementById("login-form");
    const passwordInput = document.getElementById("password");
    const errorBox = document.getElementById("error-message");

    if (!form || !passwordInput) return;

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const pwd = passwordInput.value.trim();

        if (!pwd) {
            errorBox.textContent = "Veuillez entrer le mot de passe.";
            return;
        }

        try {
            const hash = await sha256(pwd);

            if (hash === PASSWORD_HASH_HEX) {
                // Succès → on pourrait faire un petit effet ici (glitch etc.)
                window.location.href = "secret.html";
            } else {
                errorBox.textContent = "Mot de passe incorrect.";
                passwordInput.value = "";
                passwordInput.focus();
            }
        } catch (e) {
            console.error(e);
            errorBox.textContent = "Erreur interne. Réessayez.";
        }
    });
});
