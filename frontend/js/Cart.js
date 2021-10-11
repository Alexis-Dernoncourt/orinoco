// Gestion du panier

function getElementToAddToCart(elt, id, name, lense, price, numberOfItemsToAdd) {
    const errorMessage = document.querySelector("#alert-message");
    errorMessage.classList.remove("alert", "alert-warning");
    errorMessage.textContent = "";
    if (elt && id && name && lense && price && numberOfItemsToAdd) {
        const itemToAddToCart = {"elementIdentifier" : elt, id, "produit" : name, "objectif" : lense, "prix" : price, "quantite" : numberOfItemsToAdd};
        addItemToCart(itemToAddToCart);
        errorMessage.classList.add("alert", "alert-success");
        errorMessage.textContent = "L'élément à bien été ajouté au panier !";
    } else {
        errorMessage.classList.add("alert", "alert-warning");
        errorMessage.textContent = "Il y a eu une erreur, veillez à choisir une option et une quantité."
    }
};

function addItemToCart(item) {
    // Initialisation du panier (tableau vide)
    let cart = [];
    if (localStorage.getItem("Panier")) {
        const uniqueIdentifierOfArticleToAdd = item.elementIdentifier;
        const articlesInCart = JSON.parse(localStorage.getItem("Panier"));
        cart.push(...articlesInCart);
 
        // Si l'article est déjà présent au sein du panier
        // (vérifie si identiques : si oui met à jour le localStorage en modifiant la quantité; si non : ajoute un nouvel élément)
            if (cart.some(el => el.elementIdentifier === uniqueIdentifierOfArticleToAdd)) {
                const itemToRemove = cart.findIndex(el => el.elementIdentifier === uniqueIdentifierOfArticleToAdd);
                cart.map(i => {
                    if (i.elementIdentifier === uniqueIdentifierOfArticleToAdd) {
                        const previousQuantity = i.quantite;
                        const nouvelleQuantite = previousQuantity + item.quantite;
                        const elementIdentifier = item.id + item.objectif;
                        const panierModifie = {elementIdentifier, "id" : item.id, "produit" : item.produit, "objectif" : item.objectif, "prix" : item.prix, "quantite" : nouvelleQuantite};
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
    if (panier !== null && panier.length > 0) {
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