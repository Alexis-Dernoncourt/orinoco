console.log('Home is running !');

fetch("http://localhost:3000/api/cameras")
    .then( data => data.json())
    .then( jsonListArticle => {
        console.log(jsonListArticle);
        for (let jsonArticle of jsonListArticle){
            let article = new ArticleManager(jsonArticle);
            document.querySelector(".articles-home").innerHTML += `
                <div class="card m-5 col-md-4 shadow rounded">
                    <div class="card-header bg-title-cards-home">
                        <a href="http://127.0.0.1:5500/frontend/view/article/article.html?id=${article._id}">
                            <h3 class="card-title d-flex justify-content-center">${article.name}</h3>
                        </a>
                    </div>
                    <a href="http://127.0.0.1:5500/frontend/view/article/article.html?id=${article._id}">
                        <img src="${article.imageUrl}" class="card-img-top" />
                    </a>
                    <div class="card-body">
                        <p class="card-text text-center p-md-4">${article.description}</p>
                        <p class="card-text text-center fw-bold fs-3">${article.price / 1000}${0}<sup>€</sup></p>
                        <p class="text-end card-link">
                            <a  href="http://127.0.0.1:5500/frontend/view/article/article.html?id=${article._id}"
                                class="text-decoration-none text-reset">
                                Voir l'article
                            </a>
                        </p>
                    </div>
                </div>
            `
        }
    })
    .catch(err => {
        console.log("Il y a eu une erreur : " + err);
    })

    