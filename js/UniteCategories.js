//On recupère les divs des 4 élements afin de pouvoir y placer les elements nécessaires
let liste_unite = document.getElementById("liste_unite");
let liste_categorie_ingredient = document.getElementById("liste_categorie_ingredient");
let liste_categorie_recette = document.getElementById("liste_categorie_recette");
let liste_categorie_tva = document.getElementById("liste_categorie_tva");

//Création et mise en place de l'input et du bouton d'ajout pour les unités
let inputUnite = document.getElementById("inputUnite");
inputUnite.placeholder = "Nom d\'unité";
let btnAjouterUnite = document.getElementById("btnAjouterUnite");
btnAjouterUnite.classList.add("Erase");
//Création de l'eventlistener permettant de créer un élément si l'input n'est pas vide et remet à zero le champ de l'input
btnAjouterUnite.addEventListener("click",function () {
    if (inputUnite.value.length > 0){
        ajouterUnite(inputUnite.value);
        inputUnite.value = "";
    }
});

//Création et mise en place de l'input et du bouton d'ajout pour les catégories d'ingrédients
let inputCategorie = document.getElementById("inputCategorie");
inputCategorie.placeholder = "Nom de catégorie";
let btnAjouterCategorie = document.getElementById("btnAjouterCategorie");
btnAjouterCategorie.classList.add("Erase");
//Création de l'eventlistener permettant de créer un élément si l'input n'est pas vide et remet à zero le champ de l'input
btnAjouterCategorie.addEventListener("click",function () {
    if (inputCategorie.value.length > 0){
        ajouterCategorie(inputCategorie.value);
        inputCategorie.value = "";
    }
});

//Création et mise en place de l'input et du bouton d'ajout pour les catégories de recettes
let inputCategorieRecette = document.getElementById("inputCategorieRecette");
inputCategorieRecette.placeholder = "Nom de catégorie de recette";
let btnAjouterCategorieRecette = document.getElementById("btnAjouterCategorieRecette");
btnAjouterCategorieRecette.classList.add("Erase");
//Création de l'eventlistener permettant de créer un élément si l'input n'est pas vide et remet à zero le champ de l'input
btnAjouterCategorieRecette.addEventListener("click",function () {
    if (inputCategorieRecette.value.length > 0){
        ajouterCategorieRecette(inputCategorieRecette.value);
        inputCategorieRecette.value = "";
    }
});

//Création et mise en place de l'input et du bouton d'ajout pour les catégories de TVA
let inputCategorieTVA = document.getElementById("inputCategorieTVA");
inputCategorieTVA.placeholder = "Nom de catégorie de TVA";
let inputValeurTVA = document.getElementById("inputValeurTVA");
inputValeurTVA.placeholder = "Valeur de TVA";
inputValeurTVA.classList.add('Erase');
let btnAjouterCategorieTVA = document.getElementById("btnAjouterCategorieTVA");
btnAjouterCategorieTVA.classList.add("Erase");
//Création de l'eventlistener permettant de créer un élément si l'input n'est pas vide et remet à zero le champ des deux input
btnAjouterCategorieTVA.addEventListener("click",function () {
    if (inputCategorieTVA.value.length > 0 && inputValeurTVA.value.length > 0){
        ajouterCategorieTVA(inputCategorieTVA.value,inputValeurTVA.value);
        inputCategorieTVA.value = "";
        inputValeurTVA.value = "";
    }
});

//Fonction pour créer un th ou un td et le mettre dans le bon element tout en lui donnant un innerText approprié
//tag -> String ; innerText -> string, parentElement -> DOMElement
function th_td_creator(tag,innerText,parentElement){
    let element = document.createElement(tag);//nom_ingrediant
    element.innerText=innerText;
    parentElement.appendChild(element);
    //return element;
}

//Cette fonction fait la meme chose que celle au dessus, seulement elle crée plusieurs th ou td grâce a une liste qui renseigne
//tous les innerText a mettre dans chacun des th/td
//listInnerText -> list of String
function th_td_multiple_creator(tag,listInnerText,ParentElement){
    Array.prototype.forEach.call(listInnerText, el =>{
        th_td_creator(tag,el,ParentElement);
    });
}

//Cette fonction permet d'envoyer une requête pour modifier une unité, puis recharger la liste des éléments
//id_unite -> int ; nom_unite -> string
function modifierUnite(id_unite,nom_unite){
    let url = "../API/modifierUnite.php?id_unite=" + encodeURIComponent(id_unite) + "&nom_unite=" + encodeURIComponent(nom_unite);
    let requete = new XMLHttpRequest();
    requete.open("GET", url, true);
    requete.send(null);
    requete.addEventListener("load", function () {
        loadLists()
    });
}

//Cette fonction permet d'envoyer une requête pour modifier une catégorie d'ingrédient, puis recharger la liste des éléments
//id_categorie -> int ; nom_categorie -> string
function modifierCategorie(id_categorie,nom_categorie){
    let url = "../API/modifierCategorie.php?id_categorie=" + encodeURIComponent(id_categorie) + "&nom_categorie=" + encodeURIComponent(nom_categorie);
    let requete = new XMLHttpRequest();
    requete.open("GET", url, true);
    requete.send(null);
    requete.addEventListener("load", function () {
        loadLists()
    });
}

//Cette fonction permet d'envoyer une requête pour modifier une catégorie de recette, puis recharger la liste des éléments
//id_categorie -> int ; nom_categorie -> string
function modifierCategorieRecette(id_categorie,nom_categorie){
    let url = "../API/modifierCategorieRecette.php?id_categorie=" + encodeURIComponent(id_categorie) + "&nom_categorie=" + encodeURIComponent(nom_categorie);
    let requete = new XMLHttpRequest();
    requete.open("GET", url, true);
    requete.send(null);
    requete.addEventListener("load", function () {
        loadLists()
    });
}

//Cette fonction permet d'envoyer une requête pour modifier une catégorie de TVA, puis recharger la liste des éléments
//id_categorie -> int ; list -> list avec list[0] = nom_tva et list[1] = valeur_tva
function modifierCategorieTva(id_tva,list){
    let url = "../API/modifierCategorieTVA.php?id_tva=" + encodeURIComponent(id_tva) + "&nom_tva=" + encodeURIComponent(list[0].value) + "&valeur=" + encodeURIComponent(list[1].value);
    let requete = new XMLHttpRequest();
    requete.open("GET", url, true);
    requete.send(null);
    requete.addEventListener("load", function () {
        loadLists()
    });
}

//Permet de changer les elements d'une ligne de tableau en input pour pouvoir modifier les elements de cette ligne
//Elle prend en parametre un bouton modifier a partir duquel on retrouve la ligne sur lequel il se trouve, grace a l'id
//de l'element a modifier, on peut récuperer l'entrée de l'utilisateur dans l'input et envoyer l'id et la valeur dans la
//fonctions func qui est passé en paramètre pour changer l'élément voulu
function formModifier(btn,id,func) {
    btn.innerText = "Valider";
    Array.prototype.forEach.call(btn.parentElement.parentElement.children, el =>{
        if(el.innerText!== "Modifier" && el.innerText!== "Valider" && el.innerText!== "Supprimer"){
            let input = document.createElement("input");
            input.value=el.innerText;
            el.innerText = "";
            el.appendChild(input);
            btn.removeEventListener("click",arguments.callee);
            btn.addEventListener("click", function () {
                btn.innerText = "Modifier";
                func(id,input.value);
            });
        }
    });
}

//Création d'une lite générique pour la fonction suivante
let list = [];
//fais la même chose que la fonction générique du dessus mais pour la catégorie TVA qui prend deux paramètres et a donc
//Besoin d'avoir une liste qui stocke les deux valeurs et qui les renvoie dans la fonction appropriée
function formModifierTVA(btn,id,func) {
    btn.innerText = "Valider";
    Array.prototype.forEach.call(btn.parentElement.parentElement.children, el => {
        if (el.innerText !== "Modifier" && el.innerText !== "Valider" && el.innerText !== "Supprimer") {
            let input = document.createElement("input");
            input.value = el.innerText;
            el.innerText = "";
            list.push(input);
            el.appendChild(input);
        }
    });
    btn.removeEventListener("click",arguments.callee);
    btn.addEventListener("click", function () {
        btn.innerText = "Modifier";
        func(id,list);
        list = [];
    });
}

//Cette fonction permet de créer les th ou les td (principalement les td) en créant génériquement les boutons supprimer
//et modifier lorsqu'il y en a besoin et en les parametrants pour pouvoir fonctionner correctement
/**params
 *
 * @param tag -> td ou th
 * @param listInnerText -> Liste des noms des éléments a créer
 * @param ParentElement -> DOMElement
 * @param listInnerTextButton -> Liste des boutons a créer par nom
 * @param table -> table sql concerné
 * @param primary_key -> clé primaire de la table
 * @param id -> id de l'élément pour lequel on crée le th/td
 */
function th_td_multiple_creator_with_buttons(tag,listInnerText,ParentElement,listInnerTextButton,table,primary_key,id){
    let buttonCpt = 0;
    Array.prototype.forEach.call(listInnerText, el =>{
        if(el===""){
            let td = document.createElement("td");
            ParentElement.appendChild(td);
            let btn = document.createElement("button");
            btn.innerText=listInnerTextButton[buttonCpt];
            btn.classList.add("Erase");
            if (btn.innerText==="Supprimer"){
                btn.onclick = function(){
                    let url = "../API/supprimerGenerique.php?table=" + encodeURIComponent(table) + "&fieldname=" + encodeURIComponent(primary_key) + "&id_generique=" + encodeURIComponent(id);
                    let requete = new XMLHttpRequest();
                    requete.open("GET", url, true);
                    requete.send(null);
                    requete.addEventListener("load",function () {
                        loadLists();
                    });
                };
            }
            else if (btn.innerText==="Modifier"){
               if(table==="Unite"){
                   btn.addEventListener("click", function () {
                       formModifier(this,id,modifierUnite);
                   });
               }
               else if (table==="Categorie"){
                   btn.addEventListener("click", function () {
                       formModifier(this,id,modifierCategorie);
                   });
               }
               else if (table==="categorie_recette"){
                   btn.addEventListener("click", function () {
                       formModifier(this,id,modifierCategorieRecette);
                   });
               }
               else{
                   btn.addEventListener("click", function () {
                       formModifierTVA(this,id,modifierCategorieTva);
                   });
               }
                //btn.addEventListener("click",function ());
            }
            buttonCpt++;
            td.appendChild(btn);
        }
        else{
            for(let elem in el) {
                let re = new RegExp('^id');
                if(!re.test(elem)){
                    th_td_creator(tag, el[elem], ParentElement);
                }
            }
        }
    });
}

//Cette fonction permet de récupérer de manière générique la liste des éléments d'une table, crée un tableau (en ajoutant
//les boutons demandés) et place ce tableau dans l'élément du dom passé en paramètre
/**params
 *
 * @param name -> 1 pour selectionner tous les elements ou début du nom de l'element que nous cherchons (utilisé dans les barres de recherches)
 * @param order -> ordre par lequel on trie en sql (ex : nom_categorie ASC)
 * @param tab -> nom de la table sql
 * @param reg -> colonne sql du nom de l'élément (ex : nom_categorie_recette)
 * @param listButtons -> Liste des boutons que l'on veut ajouter lors de l'affichage de la liste
 * @param parentDiv -> la div dans laquelle on veut placer la liste
 * @param primary_key -> nom de la clé primaire de la table
 */
function getAllGeneric(name,order,tab,reg,listButtons,parentDiv,primary_key) {
    parentDiv.innerHTML = "";
    let url = "../API/getAllGenericWithOrder.php?name="+ encodeURIComponent(name)+ "&order="+encodeURIComponent(order)+"&table="+encodeURIComponent(tab) + "&regexpel="+encodeURIComponent(reg);
    let requete = new XMLHttpRequest();
    requete.open("GET", url, true);
    requete.addEventListener("load", function () {
        let result = JSON.parse(requete.responseText);
        let table = document.createElement("table");
        parentDiv.appendChild(table);
        let tr = document.createElement("tr");
        table.appendChild(tr);
        th_td_multiple_creator("th",["Nom "+tab,"",""],tr);
        Array.prototype.forEach.call(result, val =>{
            let tr_val = document.createElement("tr");
            table.appendChild(tr_val);
            th_td_multiple_creator_with_buttons("td",[val,"",""],tr_val,listButtons,tab,primary_key,parseInt(val[primary_key]));
        });
        //Envoie une requête à la page API/authentification/is_connected.php pour savoir si l'on est connecté
        let url_2 = "../API/authentification/is_connected.php";
        let requete_2 = new XMLHttpRequest();
        requete_2.open("GET", url_2, true);
        requete_2.addEventListener("load", function () {
            var res = JSON.parse(requete_2.response);
            var bool_move_page = res['Response'];
            //si l'on est pas connecté on efface les bouttons
            if (!bool_move_page) {
                var tab_delete = document.getElementsByClassName('Erase');
                while(tab_delete[0]){
                    tab_delete[0].remove();
                }
            }
        });
        requete_2.send(null);
    });
    requete.send(null);

}

//Envoie la requete AJAX pour ajouter une nouvelle Unité à partir du nom de l'unité
function ajouterUnite(nom){
    let url = "../API/ajouterUnite.php?nom=" + encodeURIComponent(nom);
    let requete = new XMLHttpRequest();
    requete.open("GET", url, true);
    requete.send(null);
    requete.addEventListener("load", function () {
        loadLists()
    });
}

//Envoie la requete AJAX pour ajouter une categorie d'ingrédient à partir du nom et de la valeur de la categorie
function ajouterCategorie(nom){
    let url = "../API/ajouterCategorie.php?nom=" + encodeURIComponent(nom);
    let requete = new XMLHttpRequest();
    requete.open("GET", url, true);
    requete.send(null);
    requete.addEventListener("load", function () {
        loadLists()
    });
}

//Envoie la requete AJAX pour ajouter une categorie de recette à partir du nom de la categorie
function ajouterCategorieRecette(nom){
    let url = "../API/ajouterCategorieRecette.php?nom=" + encodeURIComponent(nom);
    let requete = new XMLHttpRequest();
    requete.open("GET", url, true);
    requete.send(null);
    requete.addEventListener("load", function () {
        loadLists()
    });
}

//Envoie la requete AJAX pour ajouter une categorie TVA à partir du nom et de la valeur de la categorie TVA
function ajouterCategorieTVA(nom,valeur){
    let url = "../API/ajouterCategorieTva.php?nom=" + encodeURIComponent(nom) + "&valeur=" + encodeURIComponent(valeur);
    let requete = new XMLHttpRequest();
    requete.open("GET", url, true);
    requete.send(null);
    requete.addEventListener("load", function () {
        loadLists()
    });
}

//Cette fonction permet de générer toutes les listes des éléments à l'aide de la fonction générique getAllGeneric
function loadLists(){
    getAllGeneric(1,"nom_unite ASC","Unite","nom_unite",["Modifier","Supprimer"],liste_unite,"id_unite");
    getAllGeneric(1,"nom_categorie ASC","Categorie","nom_categorie",["Modifier","Supprimer"],liste_categorie_ingredient,"id_categorie");
    getAllGeneric(1,"categorie_tva ASC","tva","categorie_tva",["Modifier","Supprimer"],liste_categorie_tva, "id_tva");
    getAllGeneric(1,"nom_categorie_recette ASC","categorie_recette","nom_categorie_recette",["Modifier","Supprimer"],liste_categorie_recette, "id_categorie_recette");
}

//On initialise toutes les listes pendant le chargement initial de la page.
window.addEventListener("load",function () {
    loadLists();
});

