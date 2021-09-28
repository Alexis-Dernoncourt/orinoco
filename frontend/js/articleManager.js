/**
 * Gestion des articles en objet, gère le tri par prix
 */
class ArticleManager extends Article {
    constructor(jsonArticle){
        super.jsonArticle && Object.assign(this, jsonArticle);
    }

    getArticleById(id){
        id = this.id;
        console.log(id);
    }

    sort(){
        return this.listArticle.sort((a,b) => {
            return (this.listArticle(a.price) < this.listArticle(b.price)) ? 1 : -1;
        })
    }
}