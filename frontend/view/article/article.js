console.log('Article is running !');

/**
 * Récupération du paramètre id de l'url
 */
const ID = new URL(location.href).searchParams.get("id");

fetch("http://localhost:3000/api/cameras/"+ID)
    .then( data => data.json())
    .then( jsonListArticle => {
        //console.log(jsonListArticle);
        
            let article = new ArticleManager(jsonListArticle);
            document.querySelector(".page-article").innerHTML += `
                <div class="card m-auto col-10 flex-lg-row col-lg-12">
                    <img src="${article.imageUrl}" class="w-50 img-page-article" />
                    <div class="card-body d-flex flex-column justify-content-evenly">
                        <div>
                            <h3 class="text-center">${article.name}</h3>
                        </div>
                        <div>
                            <p class="card-text text-center p-4">${article.description}</p>
                            <p class="card-text text-center fw-bold fs-3">${article.price / 1000}${0}<sup>€</sup></p>
                            
                            <div class="d-flex justify-content-center">
                                <input class="rounded" type="number" required min="1" max="20" step="1" id="select-number-of-items-to-add-to-cart">
                                <button class="btn" id="add-to-cart-btn">
                                    + Ajouter au panier
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <p class="text-end m-5 card-link">
                    <a class="text-decoration-none text-reset" href="http://127.0.0.1:5500/frontend/view/home/home.html">
                        < Retourner vers l'accueil
                    </a>
                </p>
            `
        const btn = document.querySelector("#add-to-cart-btn");
        const numberOfItemsToAdd = document.querySelector("#select-number-of-items-to-add-to-cart");
        btn.addEventListener("click", () => {
            getElementToAddToCart(
                article._id,
                article.name,
                article.price,
                numberOfItemsToAdd.value
            );
        });
    })
    .catch(err => {
        console.log("Il y a eu une erreur : " + err);
    });
