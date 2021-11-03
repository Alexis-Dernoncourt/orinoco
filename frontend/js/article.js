const backendURLorigin = "http://localhost:3000";
/** 
 * Représentation du format d'un article et méthodes de gestion de l'objet
 *  (affichage de la liste des articles, récupération d'un article unique, formatage des prix...)
 */

class Article {
    constructor(jsonArticle) {
        jsonArticle && Object.assign(this, jsonArticle);
    };

    getAllArticles() {
        fetch(`${backendURLorigin}/api/cameras`)
            .then( data => data.json())
            .then(jsonListArticle => {
                for (let jsonArticle of jsonListArticle) {
                    const article = new Article(jsonArticle);
                    document.querySelector(".main-div").innerHTML += `
                    <a  id="linkToArticle"
                        data-id="${article._id}"
                        href="${window.location.href}?id=${article._id}"
                        class="my-4 m-lg-5 col-lg-4 text-decoration-none text-reset"
                    >
                        <div class="card border-0 shadow rounded list-item">
                            <div class="card-header bg-title-cards-home">
                                <h3 class="card-title d-flex justify-content-center main-font-family text-white">${article.name}</h3>
                            </div>
                                <img src="${article.imageUrl}" class="card-img-top" />
                            <div class="card-body">
                                <p class="card-text text-center p-md-4">${article.description}</p>
                                <p class="card-text text-center fw-bold fs-3 main-font-family">${getFormatedPrice(article.price)}<sup>€</sup></p>
                                <p class="text-end card-link">
                                    Voir l'article
                                </p>
                            </div>
                        </div>
                    </a>
                    `                    
                    const linksToArticle = document.querySelectorAll("#linkToArticle");
                    for (let link of linksToArticle) {
                        link.addEventListener("click", function(e) {
                            e.preventDefault();
                            article.getArticleById(this.dataset.id);
                        });
                    };
                };
                goToHomeBtns();
            })
            .catch(err => {
                console.log("Il y a eu une erreur : " + err);
            });
    };

    getArticleById(articleId) {
        fetch(`${backendURLorigin}/api/cameras/${articleId}`)
        .then(data => data.json())
        .then(article => {
            history.pushState(null, null, `?id=${articleId}`);
            const homeBtn = document.querySelector("#home-btn");
            homeBtn.classList.contains("active") && homeBtn.classList.remove("active");
            const idInUrl = getIdInUrl();
            // Affiche l'article sélectionné :
            if (idInUrl) {
                // Cache la liste des articles sur la homepage :
                const divToHide = document.querySelector(".main-div");
                const cartContainer = document.querySelector(".cart-body");
                if (cartContainer) {cartContainer.remove()};   
                if (divToHide) {divToHide.classList.add("d-none");};  
                 
                changeMetaTitle("Orinoco - appareil photo " + article.name);
                changeTitleContentOfPage("Decouvrez le " + article.name);

                document.querySelector(".second-div").classList.remove("d-none");
                document.querySelector(".second-div").innerHTML = `
                <div id="article-unique">
                    <div class="card border-0 m-auto col-10 flex-lg-row col-lg-12">
                        <img src="${article.imageUrl}" class="w-50 img-page-article" />
                        <div class="card-body d-flex flex-column justify-content-evenly align-items-center">
                            <div>
                                <h3 class="text-center main-font-family main-font-family">${article.name}</h3>
                            </div>
                            <div>
                                <p class="card-text text-center p-4">${article.description}</p>
                                <p class="card-text text-center fw-bold fs-3 main-font-family">${getFormatedPrice(article.price)}<sup>€</sup></p>
                                
                                <div class="d-flex flex-column align-items-center">
                                    <div class="d-block m-3">
                                        <label for="select-lense"></label>
                                        <select required id="select-lense" name"lense" type="select" class="form-select">
                                            <option value=""> > Choisissez une option </option>
                                            ${showOptions(article.lenses)}
                                        </select>
                                    </div>
                                    <div class="d-flex flex-column align-items-center justify-content-center m-3">
                                        <div>
                                            <label for="select-number-of-items-to-add-to-cart">Quantité : </label>
                                                <input class="rounded" type="number" required min="1" max="20" step="1" id="select-number-of-items-to-add-to-cart" />
                                        </div>
                                        <button class="btn shadow rounded-pill mt-5 text-uppercase fs-6 p-3 main-background-color cartBtnHover" id="add-to-cart-btn">
                                            Ajouter au panier
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div id="alert-message" role="alert"></div>
                        </div>
                    </div>
                    <p class="text-end m-5 card-link">
                        <a data-link="home" class="text-decoration-none text-reset go-to-home-btn" href="${localURLorigin}/frontend/view/index.html">
                            < Retourner vers l'accueil
                        </a>
                    </p>
                </div>
                `

                // Gestion des boutons d'ajout au panier
                const btn = document.querySelector("#add-to-cart-btn");
                const numberOfItemsToAddToCart = document.querySelector("#select-number-of-items-to-add-to-cart");
                btn.addEventListener("click", () => {
                    const lense = getSelectionnedLense("select-lense");
                    const uniqueIdentifier = article._id + lense;
                    getElementToAddToCart(
                        uniqueIdentifier,
                        article._id,
                        article.name,
                        lense,
                        article.price,
                        numberOfItemsToAddToCart.valueAsNumber
                    );
                });

                goToHomeBtns();
            };
        })
        .catch(err => {
            console.log("Il y a eu une erreur : " + err);
        });
    };
};
