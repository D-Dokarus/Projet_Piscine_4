
document.getElementById('formulaire').addEventListener("submit",function(e){
   e.preventDefault();
   var erreur;
   var bool_move_page ;

   if(document.getElementById('id_identifiant').value == ""){
      erreur = "Veuillez renseigner votre identifiant";
   }
   if(document.getElementById('id_mdp').value == ""){
      erreur = "Veuillez renseigner votre mot de passe";
   }
   if(document.getElementById('id_mdp').value == "" && document.getElementById('id_identifiant').value == ""){
      erreur = "Veuillez renseigner les deux champs de connexion";
   }
   if(erreur){
      document.getElementById("erreur").innerHTML = erreur;

   }
   else{
      identifiant = document.getElementById('id_identifiant').value;
      mdp = document.getElementById('id_mdp').value;
      let url = "../API/authentification/connect.php?Identifiant="+identifiant+"&MDP="+mdp;
      let requete = new XMLHttpRequest();
      requete.open("GET", url, true);
      requete.addEventListener("load", function (){
         res = JSON.parse(requete.response);
         bool_move_page = res['Response'];
         if(bool_move_page){
            window.location = "../";
         }
         else{
            document.getElementById("erreur").innerHTML = "Mot de passe ou identifiant incorrect !";
         }

      });
      requete.send(null);

   }

});

