<?php
session_start();
session_unset();
session_destroy();

?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Déconnexion</title>
    <link rel="stylesheet" type="text/css" href="../../css/entete.css">
    <link href="https://fonts.googleapis.com/css2?family=Andada+Pro&display=swap" rel="stylesheet">
    <meta http-equiv="refresh" content="25; url='../../' "/>
</head>
<body style='width:100%;text-align: center;'>
    <header>
        <ul class="entetu">
            <li class="entetli"><a class="enteta" onclick = "window.location= '../../'">Accueil</a></li>
            <li class="entetli"><a class="enteta" href="../../View/ingrediants.php">Mercuriale</a></li>
            <li class="entetli"><a class="enteta" href="../../View/liste_recette.php">Liste des fiches techniques</a></li>
            <?php
            session_start();
            if(isset($_SESSION['login'])){
            $adr = '"recette.php"';
            $idFicheRecette = 'idFicheRecette=; path=../../View/';
            $document = 'document.cookie = "'.$idFicheRecette.'"';
            "<div class='bouton' onclick='$document;window.location=$adr'>Créer une fiche technique</div>";
            echo "<li class='entetli'><a class='enteta' onclick='$document;'href=$adr>Créer une fiche technique</a></li>";
            $address1 = "disconnect.php";
            echo "<li style='float:right;'><a class='enteta' href ='$address1'>Deconnexion</a></li>";
            }else{
            $address = "../../View/authentification.php";
            echo "<li style='float:right;'><a class='enteta' href ='$address'>Connexion</a></li>";
            }
            ?>
        </ul>
    </header>
    <main style='margin-top:20%;font-family: "Andada Pro", serif;'>
        <h1>Déconnexion réussie !</h1>
        <br>
        <h2>Vous allez être redirigé vers l'accueil</h2>
    </main>
    <footer style='position: fixed;background-color: #c3b7a4;width: 100%;height: 6%;bottom: 0px;font-family: "Andada Pro", serif;'>
        <div style='display: flex;position: center;margin: 8px;'>
            <div> © </div>
            <div> | </div>
            <div>
                Lycée des métiers de la gastronomie, de l'hôtellerie et des tourismes Georges-Frêche
            </div>
        </div>
    </footer>

</body>
</html>