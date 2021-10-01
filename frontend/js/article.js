/**
 * Représentation du format d'un article et formatage des prix pour affichage
 */

class Article {
    constructor(jsonArticle){
        jsonArticle && Object.assign(this, jsonArticle);
    }
};