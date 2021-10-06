class Cart {
    constructor(id, produit, objectif, prix, quantite){
        this.id = id;
        this.produit = produit;
        this.objectif =objectif;
        this.prix = prix;
        this.quantite = quantite;
    }

    /**Ajoute un élément d'identification visuel rapide du nombre d'articles dans le panier */
    static numberOfItemsInCart(){
        if (localStorage.length > 0){
            const tabOfItemsInCart = [];
                for (var i = 0; i < localStorage.length; i++) {
                    const items = JSON.parse(localStorage.getItem(localStorage.key(i)));
                    tabOfItemsInCart.push(parseInt(items.quantite));
                };
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
        const key = item.produit + "_" + item.objectif;
        if ( localStorage.getItem(key) ){
            // Si l'article est déjà présent au sein du localStorage
            const panier = JSON.parse(localStorage.getItem(key));
            if (item.id+"_"+item.objectif === panier.id+"_"+panier.objectif){
                /**
                 * Si les id et l'option de l'article à ajouter et de l'article déjà présent sont identiques
                 * alors seulement la quantité est modifiée dans le panier
                 */
                const nouvelleQuantite =  parseInt(panier.quantite) + parseInt(item.quantite);
                const panierModifie = new Cart(item.id, item.produit, item.objectif, item.prix, nouvelleQuantite);
                localStorage.setItem(key, JSON.stringify(panierModifie));
                Cart.numberOfItemsInCart();
            } 
            // else {
            //     // sinon on ajoute un nouvel article au panier avec l'option + la quantité choisie
            //     console.log("item !== panier");
            //     localStorage.setItem(key, JSON.stringify(item));
            //     Cart.numberOfItemsInCart();
            // }
        } else {
            // Si l'article n'est pas présent au sein du localStorage
            // On ajoute un nouvel article au panier avec toutes ses caractéristiques + l'option + la quantité choisie
            const newItem = item;
            localStorage.setItem(key, JSON.stringify(newItem));
            Cart.numberOfItemsInCart();
        }
    };
}
