//class Cart {

    /**Ajoute un élément d'identification visuel rapide du nombre d'articles dans le panier */
    // static numberOfItemsInCart(){
    //     const panier = JSON.parse(localStorage.getItem("Panier"));
    //     if (panier !== null && panier.length > 0){
    //         const tabOfItemsInCart = [];
    //         panier.map(el => {
    //             tabOfItemsInCart.push(parseInt(el.quantite));
    //         });
    //         const totalOfItemsInCart = tabOfItemsInCart.reduce((previousValue, currentValue) => previousValue + currentValue);
    //             document.querySelector("#total-number-in-cart-container").classList.remove("display-none");
    //             document.querySelector("#total-number-in-cart").textContent = totalOfItemsInCart;
    //     } else {
    //         //console.log("Le panier est vide.");
    //         document.querySelector("#total-number-in-cart").textContent = "";
    //         document.querySelector("#total-number-in-cart-container").classList.add("display-none");
    //     }
    // };

    /**
     * Récupère et retourne la valeur du select
     */
    //  static getSelectionnedLense(selectId){
    //     // Récupère l'élement html select
    //     let selectElmt = document.getElementById(selectId);
    //     /**
    //     selectElmt.options = tableau des balises <option> du select
    //     selectElmt.selectedIndex = index du tableau options qui est sélectionné
    //     */
    //     return selectElmt.options[selectElmt.selectedIndex].value;
    // };

    

    // static addItemToCart(item){
    //     // Initialisation du panier (tableau vide)
    //     let cart = [];
    //     // Si le panier existe déjà dans le localStorage
    //     if ( localStorage.getItem("Panier") ){
    //         // Le panier existe
    //         const uniqueIdentifierOfArticleToAdd = item.elementIdentifier;
    //         const articlesInCart = JSON.parse(localStorage.getItem("Panier"));
    //         cart.push(...articlesInCart);

    //         // Si l'article est déjà présent au sein du panier
    //         // (+ vérifie si identiques : si oui modifier la quantité; si non : ajouter un nouvel élément)
    //             if ( cart.some(el => el.elementIdentifier === uniqueIdentifierOfArticleToAdd) ){
    //                 const itemToRemove = cart.findIndex(el => el.elementIdentifier === uniqueIdentifierOfArticleToAdd);
    //                 cart.map(i => {
    //                     if (i.elementIdentifier === uniqueIdentifierOfArticleToAdd){
    //                         const previousQuantity = i.quantite;
    //                         const nouvelleQuantite = previousQuantity + item.quantite;
    //                         const panierModifie = {"elementIdentifier" : item.id+item.objectif, "id" : item.id, "produit" : item.produit, "objectif" : item.objectif, "prix" : item.prix, "quantite" : nouvelleQuantite};
    //                         cart.splice(itemToRemove, 1, panierModifie);
    //                         localStorage.setItem("Panier", JSON.stringify(cart));
    //                         numberOfItemsInCart();
    //                     }
    //                 });
    //             } else {
    //                 // L'article n'est PAS présent dans le panier, on l'y ajoute
    //                 cart.push(item);
    //                 localStorage.setItem("Panier", JSON.stringify(cart));
    //                 numberOfItemsInCart();
    //             }
    //     } else {
    //         // Si le panier n'est pas présent au sein du localStorage
    //         // On créé le panier et y ajoute le nouvel article désiré avec toutes ses caractéristiques
    //         cart.push(item);
    //         localStorage.setItem("Panier", JSON.stringify(cart));
    //         numberOfItemsInCart();
    //     }
    // };
//}

function getElementToAddToCart(elt, id, name, lense, price, numberOfItemsToAdd){
    const errorMessage = document.querySelector("#alert-message");
    errorMessage.classList.remove("alert", "alert-warning");
    errorMessage.textContent = "";
    if(elt && id && name && lense && price && numberOfItemsToAdd) {
        //const itemToAddToCart = {"elementIdentifier" : item.id+item.objectif, "id" : item.id, "produit" : item.produit, "objectif" : item.objectif, "prix" : item.prix, "quantite" : numberOfItemsToAdd};
        const itemToAddToCart = {"elementIdentifier" : elt, "id" : id, "produit" : name, "objectif" : lense, "prix" : price, "quantite" : numberOfItemsToAdd};
        addItemToCart(itemToAddToCart);
        errorMessage.classList.add("alert", "alert-success");
        errorMessage.textContent = "L'élément à bien été ajouté au panier !";
    } else {
        errorMessage.classList.add("alert", "alert-warning");
        errorMessage.textContent = "Il y a eu une erreur, veillez à choisir une option et une quantité."
    }
};

function addItemToCart(item){
    // Initialisation du panier (tableau vide)
    let cart = [];
    // Si le panier existe déjà dans le localStorage
    if ( localStorage.getItem("Panier") ){
        // Le panier existe
        const uniqueIdentifierOfArticleToAdd = item.elementIdentifier;
        const articlesInCart = JSON.parse(localStorage.getItem("Panier"));
        cart.push(...articlesInCart);
 
        // Si l'article est déjà présent au sein du panier
        // (+ vérifie si identiques : si oui modifier la quantité; si non : ajouter un nouvel élément)
            if ( cart.some(el => el.elementIdentifier === uniqueIdentifierOfArticleToAdd) ){
                const itemToRemove = cart.findIndex(el => el.elementIdentifier === uniqueIdentifierOfArticleToAdd);
                cart.map(i => {
                    if (i.elementIdentifier === uniqueIdentifierOfArticleToAdd){
                        const previousQuantity = i.quantite;
                        const nouvelleQuantite = previousQuantity + item.quantite;
                        const panierModifie = {"elementIdentifier" : item.id+item.objectif, "id" : item.id, "produit" : item.produit, "objectif" : item.objectif, "prix" : item.prix, "quantite" : nouvelleQuantite};
                        cart.splice(itemToRemove, 1, panierModifie);
                        localStorage.setItem("Panier", JSON.stringify(cart));
                        numberOfItemsInCart();
                    }
                });
            } else {
                // L'article n'est PAS présent dans le panier, on l'y ajoute
                cart.push(item);
                localStorage.setItem("Panier", JSON.stringify(cart));
                numberOfItemsInCart();
            }
    } else {
        // Si le panier n'est pas présent au sein du localStorage
        // On créé le panier et y ajoute le nouvel article désiré avec toutes ses caractéristiques
        cart.push(item);
        localStorage.setItem("Panier", JSON.stringify(cart));
        numberOfItemsInCart();
    }
 };

 function numberOfItemsInCart() {
    const panier = JSON.parse(localStorage.getItem("Panier"));
    if (panier !== null && panier.length > 0){
        const tabOfItemsInCart = [];
        panier.map(el => {
            tabOfItemsInCart.push(parseInt(el.quantite));
        });
        const totalOfItemsInCart = tabOfItemsInCart.reduce((previousValue, currentValue) => previousValue + currentValue);
            document.querySelector("#total-number-in-cart-container").classList.remove("display-none");
            document.querySelector("#total-number-in-cart").textContent = totalOfItemsInCart;
    } else {
        //console.log("Le panier est vide.");
        document.querySelector("#total-number-in-cart").textContent = "";
        document.querySelector("#total-number-in-cart-container").classList.add("display-none");
    }
 };