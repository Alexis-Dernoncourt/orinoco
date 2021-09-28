/**
 * Représentation du format d'un article et formatage des prix pour affichage
 */

class Article {
    constructor(jsonArticle){
        jsonArticle && Object.assign(this, jsonArticle);
    }

    getArticleById(id){
        return id;
    }

    getFormatedPrice(price){
        let formatedPrice = price / 1000;
        return formatedPrice;
    }
}