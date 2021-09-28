/**
 * Gestion des articles en objet, gère le tri par prix
 */
class ArticleManager {
    constructor(jsonArticle){
        jsonArticle && Object.assign(this, jsonArticle);
    }

    getArticleById(){
        return this._id;
    }

    sort(){
        return this.listArticle.sort((a,b) => {
            return (this.listArticle(a.price) < this.listArticle(b.price)) ? 1 : -1;
        })
    }
}