/**
 * Gestion de la récupération des id des articles sélectionnés et de l'ajout au panier (localstorage)
*/
console.log("CartManager is running !");

function getElementToAddToCart(elt, name, lense, price, numberOfItemsToAdd){
    const errorMessage = document.querySelector("#alert-message");
    errorMessage.classList.remove("alert", "alert-warning");
    errorMessage.textContent = "";
    if(elt !== "" && elt !== undefined && name !== "" && name != undefined && lense !== "" && lense !== undefined && price !== undefined && price > 0 && numberOfItemsToAdd !== undefined && numberOfItemsToAdd !== NaN && numberOfItemsToAdd > 0){
        const itemsToAddToCart = {"id" : elt, "produit" : name, "objectif" : lense, "prix" : price, "quantite" : numberOfItemsToAdd};
        addItemToCart(itemsToAddToCart);
        errorMessage.classList.add("alert", "alert-success");
        errorMessage.textContent = "L'élément à bien été ajouté au panier !";
    } else {
        errorMessage.classList.add("alert", "alert-warning");
        errorMessage.textContent = "Il y a eu une erreur, veillez à choisir une option et une quantité."
    }
};

function addItemToCart(item){
    const key = item.produit + "_" + item.objectif;
    if ( localStorage.getItem(key) ){
        const panier = JSON.parse(localStorage.getItem(key));
        if( panier !== null){
            if (item.id+"_"+item.objectif === panier.id+"_"+panier.objectif){
                const nouvelleQuantite =  parseInt(panier.quantite) + parseInt(item.quantite);
                const panierModifie = {"id" : item.id, "produit" : item.produit, "objectif" : item.objectif, "prix" : item.prix, "quantite" : nouvelleQuantite}
                localStorage.setItem(key, JSON.stringify(panierModifie));
                numberOfItemsInCart();
            } else {
                localStorage.setItem(key, JSON.stringify(item));
                numberOfItemsInCart();
            }
        } else {
            localStorage.setItem(key, JSON.stringify(item));
            numberOfItemsInCart();
        }
    } else {
        localStorage.setItem(key, JSON.stringify(item));
        numberOfItemsInCart();
    }
};

/**Récupère et retourne la valeur du select*/
function getSelectionnedLense(selectId){
	// Récupère l'élement html select
	let selectElmt = document.getElementById(selectId);
	/**
	selectElmt.options = tableau des balises <option> du select
	selectElmt.selectedIndex = index du tableau options qui est sélectionné
	*/
	return selectElmt.options[selectElmt.selectedIndex].value;
};

/**Ajoute un élément d'identification visuel rapide du nombre d'articles dans le panier */
function numberOfItemsInCart(){
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
