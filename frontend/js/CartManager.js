/**
 * Récupération des id des articles sélectionnés et ajout au panier (localstorage)
*/
console.log("CartManager is running !");

function getElementToAddToCart(elt, name, price, numberOfItemsToAdd){
    if(elt !== "" && elt !== undefined && name !== "" && price !== NaN && price > 0 && numberOfItemsToAdd !== NaN && numberOfItemsToAdd > 0){
        const itemsToAddToCart = {"id" : elt, "produit" : name, "prix" : price, "quantite" : numberOfItemsToAdd};
        addItemToCart(itemsToAddToCart);
    } else {
        console.log("Il y a eu une erreur, veuillez réessayer.");
    }
    //console.log(elt, name, price, numberOfItemsToAdd);
}

function addItemToCart(item){
    //console.log("2 " + item[3]);
    if ( localStorage.getItem(item.produit) ){
        console.log("OK1");
        const panier = JSON.parse(localStorage.getItem(item.produit));
        if( panier !== null){
            //console.log(panier.id);
            if (item.id === panier.id){
                console.log("les id sont égaux");
                let nouvelleQuantite =  parseInt(panier.quantite) + parseInt(item.quantite);
                //console.log(nouvelleQuantite);
                //panier.quantite = nouvelleQuantite;
                //console.log(panier);
                const panierModifie = {"id" : item.id, "produit" : item.produit, "prix" : item.prix, "quantite" : nouvelleQuantite}
                //localStorage.removeItem(item.produit);
                localStorage.setItem(item.produit, JSON.stringify(panierModifie));
            } else {
                console.log("les id ne sont pas égaux");
                localStorage.setItem(item.produit, JSON.stringify(item));
            }
        } else {
            console.log("OK3");
            localStorage.setItem(item.produit, JSON.stringify(item));
        }
    } else {
        console.log("OK2");
        localStorage.setItem(item.produit, JSON.stringify(item));
    }
};