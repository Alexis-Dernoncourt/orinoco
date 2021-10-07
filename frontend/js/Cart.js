class Cart {
    constructor(elementIdentifier, id, produit, objectif, prix, quantite){
        this.elementIdentifier = elementIdentifier;
        this.id = id;
        this.produit = produit;
        this.objectif =objectif;
        this.prix = prix;
        this.quantite = quantite;
    }

    /**Ajoute un élément d'identification visuel rapide du nombre d'articles dans le panier */
    static numberOfItemsInCart(){
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

    /**
     * Récupère et retourne la valeur du select
     */
     static getSelectionnedLense(selectId){
        // Récupère l'élement html select
        let selectElmt = document.getElementById(selectId);
        /**
        selectElmt.options = tableau des balises <option> du select
        selectElmt.selectedIndex = index du tableau options qui est sélectionné
        */
        return selectElmt.options[selectElmt.selectedIndex].value;
    };

    

    static addItemToCart(item){
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
                            const panierModifie = new Cart(item.id+item.objectif, item.id, item.produit, item.objectif, item.prix, nouvelleQuantite);
                            cart.splice(itemToRemove, 1, panierModifie);
                            localStorage.setItem("Panier", JSON.stringify(cart));
                            Cart.numberOfItemsInCart();
                        }
                    });
                } else {
                    // L'article n'est PAS présent dans le panier, on l'y ajoute
                    cart.push(item);
                    localStorage.setItem("Panier", JSON.stringify(cart));
                    Cart.numberOfItemsInCart();
                }
        } else {
            // Si le panier n'est pas présent au sein du localStorage
            // On créé le panier et y ajoute le nouvel article désiré avec toutes ses caractéristiques
            cart.push(item);
            localStorage.setItem("Panier", JSON.stringify(cart));
            Cart.numberOfItemsInCart();
        }
    };
}
