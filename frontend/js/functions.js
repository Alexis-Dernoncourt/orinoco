function backToHome() {
   /**
    * Modification de l'url
    */
   const homeUrl = "/frontend/view/index.html";
   const articleContainer = document.querySelector("#article-unique");

   const divToHide = document.querySelector(".second-div");
   const divToShow = document.querySelector(".main-div");
   document.querySelector("#title").textContent = "Découvrez tous nos appareils photo";
   document.title = "Orinoco - Découvrez tous nos appareils photo";

   if (window.location.pathname === homeUrl){
      divToHide.classList.add("display-none");
      divToShow.classList.remove("display-none");
   } 
   else {
      let url = homeUrl;
      history.pushState({}, null, url);
      articleContainer.remove();
      divToHide.classList.add("display-none");
      divToShow.classList.remove("display-none");
   }
};

function goToCart() {
   const cartUrl = "/frontend/view/panier.html";
   const putCartUrl = window.location.origin + cartUrl;
   window.location.href = putCartUrl;
   history.pushState({}, null, cartUrl);
};

/**
 * Récupère et retourne la quantité d'articles totale du panier
 */
// function numberOfItemsInCart() {
//    const panier = JSON.parse(localStorage.getItem("Panier"));
//    if (panier !== null && panier.length > 0){
//        const tabOfItemsInCart = [];
//        panier.map(el => {
//            tabOfItemsInCart.push(parseInt(el.quantite));
//        });
//        const totalOfItemsInCart = tabOfItemsInCart.reduce((previousValue, currentValue) => previousValue + currentValue);
//            document.querySelector("#total-number-in-cart-container").classList.remove("display-none");
//            document.querySelector("#total-number-in-cart").textContent = totalOfItemsInCart;
//    } else {
//        //console.log("Le panier est vide.");
//        document.querySelector("#total-number-in-cart").textContent = "";
//        document.querySelector("#total-number-in-cart-container").classList.add("display-none");
//    }
// };

/**
 * Récupère et retourne les options variables pour le select
 */
 function showOptions(options){
   /**
    * Prépare le bouton de selection du choix de la lentille :
    */
   const lenses = options.split(',');
   const showLenses = lenses.map(el => {
       return `<option value="${el}">${el}</option>`;
   });
   return showLenses;
};

/**
 * Récupère et retourne la valeur du select
 */
function getSelectionnedLense(selectId) {
   // Récupère l'élement html select
   let selectElmt = document.getElementById(selectId);
   /**
   selectElmt.options = tableau des balises <option> du select
   selectElmt.selectedIndex = index du tableau options qui est sélectionné
   */
   return selectElmt.options[selectElmt.selectedIndex].value;
};

function updateHrefLinkAndUrlParam(item) {
   let paramUrl = item;
   paramUrl = paramUrl.replace(/ /g, '-');
   return;
};

function changeTitleContentOfPage(string){
   document.querySelector("#title").textContent = string;
   //"Découvrez tous nos appareils photo";
};

function changeMetaTitle(string){
   document.title = string;
   //"Orinoco - Découvrez tous nos appareils photo";
};

// function addItemToCart(item){
//    // Initialisation du panier (tableau vide)
//    let cart = [];
//    // Si le panier existe déjà dans le localStorage
//    if ( localStorage.getItem("Panier") ){
//        // Le panier existe
//        const uniqueIdentifierOfArticleToAdd = item.elementIdentifier;
//        const articlesInCart = JSON.parse(localStorage.getItem("Panier"));
//        cart.push(...articlesInCart);

//        // Si l'article est déjà présent au sein du panier
//        // (+ vérifie si identiques : si oui modifier la quantité; si non : ajouter un nouvel élément)
//            if ( cart.some(el => el.elementIdentifier === uniqueIdentifierOfArticleToAdd) ){
//                const itemToRemove = cart.findIndex(el => el.elementIdentifier === uniqueIdentifierOfArticleToAdd);
//                cart.map(i => {
//                    if (i.elementIdentifier === uniqueIdentifierOfArticleToAdd){
//                        const previousQuantity = i.quantite;
//                        const nouvelleQuantite = previousQuantity + item.quantite;
//                        const panierModifie = {"elementIdentifier" : item.id+item.objectif, "id" : item.id, "produit" : item.produit, "objectif" : item.objectif, "prix" : item.prix, "quantite" : nouvelleQuantite};
//                        cart.splice(itemToRemove, 1, panierModifie);
//                        localStorage.setItem("Panier", JSON.stringify(cart));
//                        numberOfItemsInCart();
//                    }
//                });
//            } else {
//                // L'article n'est PAS présent dans le panier, on l'y ajoute
//                cart.push(item);
//                localStorage.setItem("Panier", JSON.stringify(cart));
//                numberOfItemsInCart();
//            }
//    } else {
//        // Si le panier n'est pas présent au sein du localStorage
//        // On créé le panier et y ajoute le nouvel article désiré avec toutes ses caractéristiques
//        cart.push(item);
//        localStorage.setItem("Panier", JSON.stringify(cart));
//        numberOfItemsInCart();
//    }
// };


/**
 * Récupération, si existant, du nombre d'article(s) ajouté(s) au panier + notification visuelle
 */
numberOfItemsInCart();
