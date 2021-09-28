console.log('Home is running !');

fetch("http://localhost:3000/api/cameras")
    .then( data => data.json())
    .then( jsonListArticle => {
        console.log(jsonListArticle);
        for (let jsonArticle of jsonListArticle){
            let article = new ArticleManager(jsonArticle);
            document.querySelector(".hey").innerHTML += `
                <div class="card m-5 col-4">
                    <div class="card-header">
                        <a href="http://127.0.0.1:5500/frontend/view/article/article.html?id=${article._id}">
                            <h3 class="card-title d-flex justify-content-center">${article.name}</h3>
                        </a>
                    </div>
                    <img src="${article.imageUrl}" class="card-img-top" />
                    <div class="card-body">
                        <p class="card-text text-center p-4">${article.description}</p>
                        <p class="card-text text-center">${article.price / 1000}${0}<sup>€</sup></p>
                        <a href="http://127.0.0.1:5500/frontend/view/article/article.html?id=${article._id}">lien vers l'article</a>
                    </div>
                </div>
            `
        }
    })
    .catch(err => {
        console.log("Il y a eu une erreur : " + err);
    })

    