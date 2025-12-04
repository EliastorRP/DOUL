<?php
// --- Configuration ---
$MOT_DE_PASSE_CORRECT = "VI.02-140";

$erreur = "";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $mdp_saisi = $_POST["password"] ?? "";

    if ($mdp_saisi === $MOT_DE_PASSE_CORRECT) {
        header("Location: secret.php");
        exit;
    } else {
        $erreur = "Mot de passe incorrect.";
    }
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Accès protégé</title>
    <link rel="stylesheet" href="style.css">
</head>
<body class="login-body">

<div class="card">
    <h1>Zone protégée</h1>

    <form method="post" action="">
        <label for="password">Mot de passe</label>
        <input type="password" id="password" name="password" required>

        <button type="submit">Entrer</button>

        <?php if (!empty($erreur)) : ?>
            <div class="error"><?= htmlspecialchars($erreur) ?></div>
        <?php endif; ?>
    </form>
</div>

<script src="script.js"></script>
</body>
</html>
