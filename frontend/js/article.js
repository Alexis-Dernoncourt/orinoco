/**
 * Représentation du format d'un article et méthodes de gestion de l'objet
 *  (affichage de la liste des articles, récupération d'un article unique, formatage des prix...)
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

    // getElementToAddToCart(elt, id, name, lense, price, numberOfItemsToAdd){
    //     const errorMessage = document.querySelector("#alert-message");
    //     errorMessage.classList.remove("alert", "alert-warning");
    //     errorMessage.textContent = "";
    //     if(elt && id && name && lense && price && numberOfItemsToAdd) {
    //         const itemToAddToCart = {"elementIdentifier" : item.id+item.objectif, "id" : item.id, "produit" : item.produit, "objectif" : item.objectif, "prix" : item.prix, "quantite" : numberOfItemsToAdd};
    //         addItemToCart(itemToAddToCart);
    //         errorMessage.classList.add("alert", "alert-success");
    //         errorMessage.textContent = "L'élément à bien été ajouté au panier !";
    //     } else {
    //         errorMessage.classList.add("alert", "alert-warning");
    //         errorMessage.textContent = "Il y a eu une erreur, veillez à choisir une option et une quantité."
    //     }
    // };

    static getAllArticles(){
        fetch("http://localhost:3000/api/cameras")
            .then( data => data.json())
            .then(jsonListArticle => {
                for (let jsonArticle of jsonListArticle){
                    let article = new Article(jsonArticle);

                    document.querySelector(".main-div").innerHTML += `
                        <div class="card border-0 my-4 m-lg-5 col-lg-4 shadow rounded list-item">
                            <div class="card-header bg-title-cards-home">
                                <a  data-id="${article._id}"
                                    data-lenses="${article.lenses}"
                                    data-name="${article.name}"
                                    data-img="${article.imageUrl}"
                                    data-desc="${article.description}"
                                    data-price="${article.getFormatedPrice()}"
                                    href="${window.location.href}/${updateHrefLinkAndUrlParam(article.name)}"
                                >
                                    <h3 class="card-title d-flex justify-content-center main-font-family">${article.name}</h3>
                                </a>
                            </div>
                            <a  data-id="${article._id}"
                                data-lenses="${article.lenses}"
                                data-name="${article.name}"
                                data-img="${article.imageUrl}"
                                data-desc="${article.description}"
                                data-price="${article.getFormatedPrice()}"
                                href="${window.location.href}/${updateHrefLinkAndUrlParam(article.name)}"
                            >
                                <img src="${article.imageUrl}" class="card-img-top" />
                            </a>
                            <div class="card-body">
                                <p class="card-text text-center p-md-4">${article.description}</p>
                                <p class="card-text text-center fw-bold fs-3 main-font-family">${article.getFormatedPrice()}<sup>€</sup></p>
                                
                                <p class="text-end card-link">
                                    <a  data-id="${article._id}"
                                        data-lenses="${article.lenses}"
                                        data-name="${article.name}"
                                        data-img="${article.imageUrl}"
                                        data-desc="${article.description}"
                                        data-price="${article.getFormatedPrice()}"
                                        href="${window.location.href}/${updateHrefLinkAndUrlParam(article.name)}"
                                        class="text-decoration-none text-reset"
                                    >
                                        Voir l'article
                                    </a>
                                </p>
                            </div>
                        </div>
                    `
                    changeTitleContentOfPage("Decouvrez tous nos appareils photo");
                    changeMetaTitle("Orinoco - Découvrez tous nos appareils photo");

                    const linkToArticle = document.querySelectorAll("a[data-id");
                    for (let i of linkToArticle){
                        i.addEventListener('click', function(e){
                            e.preventDefault();
                            Article.getArticleById(this.dataset);
                        });
                    }
                };
            })
            .catch(err => {
                console.log("Il y a eu une erreur : " + err);
            });
    };

    static getArticleById(article){
        /**
         * Ajoute un paramètre à l'url (nom de l'article) sans recharger la page :
         */
        let url = window.location.href;
        let paramUrl = article.id;
        //paramUrl = paramUrl.replace(/ /g, '-');
        const newUrl = url + "/" + paramUrl;
        history.pushState({}, null, newUrl);
        //let searchParam = new URLSearchParams();
        //searchParam.append("article", paramUrl);
        //console.log(searchParam.getAll("article"));

        /**
         * Cache la liste des articles sur la homepage :
         */
        const divToHide = document.querySelector(".main-div");
        divToHide.classList.add("display-none");        
            
        /**
         * Affiche l'article sélectionné :
         */
        const urlOfArticle = window.location.origin + window.location.pathname;
        if (urlOfArticle === newUrl){
            changeMetaTitle("Orinoco - appareil photo " + article.name);
            changeTitleContentOfPage("Decouvrez le " + article.name);

            document.querySelector(".second-div").classList.remove("display-none");
            document.querySelector(".second-div").innerHTML += `
            <div id="article-unique">
                <div class="card border-0 m-auto col-10 flex-lg-row col-lg-12">
                    <img src="${article.img}" class="w-50 img-page-article" />
                    <div class="card-body d-flex flex-column justify-content-evenly align-items-center">
                        <div>
                            <h3 class="text-center main-font-family main-font-family">${article.name}</h3>
                        </div>
                        <div>
                            <p class="card-text text-center p-4">${article.desc}</p>
                            <p class="card-text text-center fw-bold fs-3 main-font-family">${article.price}<sup>€</sup></p>
                            
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
                    <a data-link="home" class="text-decoration-none text-reset" href="http://127.0.0.1:5500/frontend/view/index.html">
                        < Retourner vers l'accueil
                    </a>
                </p>
            </div>
            `
            /**
             * Gestion des boutons d'ajout au panier
             */
            const btn = document.querySelector("#add-to-cart-btn");
            const numberOfItemsToAddToCart = document.querySelector("#select-number-of-items-to-add-to-cart");
            btn.addEventListener("click", () => {
                const lense = getSelectionnedLense("select-lense");
                const revertFormatedPrice = article.price.replace(",",".") * 1000;
                getElementToAddToCart(
                    article.id+lense,
                    article.id,
                    article.name,
                    lense,
                    revertFormatedPrice,
                    numberOfItemsToAddToCart.valueAsNumber
                );
            });
    

            /**
             * Gestion des boutons de navigation
             */

            const backHome = document.querySelectorAll("a[data-link=home]");
            const cartBtn = document.querySelector("a[data-link=cart]");

            backHome.forEach(element => {
                element.addEventListener("click", (e) => {
                    e.preventDefault(); 
                    backToHome();
                });
            });
            cartBtn.addEventListener("click", (e) => {
                e.preventDefault();
                goToCart();
            });
        };
    };
};
