console.log('Article is running !');

/**
 * Récupération du paramètre id de l'url
 */

let ID = window.location.search.substr(1).split("=");
console.log(ID[1]);

fetch("http://localhost:3000/api/cameras/"+ID[1])
    .then( data => data.json())
    .then( jsonListArticle => {
        console.log(jsonListArticle);
        
            let article = new ArticleManager(jsonListArticle);
            document.querySelector(".page-article").innerHTML += `
                <div class="card m-5 col-6">
                    <div class="card-header">
                        <h3 class="card-title d-flex justify-content-center">${article.name}</h3>
                    </div>
                    <img src="${article.imageUrl}" class="card-img-top" />
                    <div class="card-body">
                        <p class="card-text text-center p-4">${article.description}</p>
                        <p class="card-text text-center">${article.price / 1000}${0}<sup>€</sup></p>
                        <a href="http://127.0.0.1:5500/frontend/view/home/home.html">Retour vers l'accueil</a>
                    </div>
                </div>
            `
        
    })
    .catch(err => {
        console.log("Il y a eu une erreur : " + err);
    })