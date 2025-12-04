// Mot de passe choisi : "MonSuperMdp123!"
// On ne le stocke pas en clair : on stocke son SHA-256 en hex.
const PASSWORD_HASH_HEX = "6c9b49ccaebb88f5a80fe10f1a3d255ccb282d7317d4102e2da7d9b3ec6f6c38";

// Fonction utilitaire : convertir ArrayBuffer -> string hex
function bufferToHex(buffer) {
    const bytes = new Uint8Array(buffer);
    let hex = "";
    for (let i = 0; i < bytes.length; i++) {
        const h = bytes[i].toString(16).padStart(2, "0");
        hex += h;
    }
    return hex;
}

// Hash une chaîne en SHA-256 (Web Crypto API)
async function sha256(text) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const digest = await crypto.subtle.digest("SHA-256", data);
    return bufferToHex(digest);
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("login-form");
    const passwordInput = document.getElementById("password");
    const errorBox = document.getElementById("error-message");

    if (!form || !passwordInput) return;

    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // empêche le rechargement de la page

        const pwd = passwordInput.value.trim();

        if (!pwd) {
            errorBox.textContent = "Veuillez entrer le mot de passe.";
            return;
        }

        try {
            const hash = await sha256(pwd);

            if (hash === PASSWORD_HASH_HEX) {
                // Succès → redirection vers la page secrète
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
