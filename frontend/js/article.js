/**
 * Représentation du format d'un article et formatage des prix pour affichage
 */

class Article {
    constructor(jsonArticle){
        jsonArticle && Object.assign(this, jsonArticle);
    }

    getFormatedPrice(){
        const formatedPrice = this.price / 1000 + "0";
        const newFormatedPrice = formatedPrice.replace(".",",");
        return newFormatedPrice;
    };

};