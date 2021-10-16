// Gestion du panier

function getElementToAddToCart(elt, id, name, lense, price, numberOfItemsToAdd) {
    const errorMessage = document.querySelector("#alert-message");
    errorMessage.classList.remove("alert", "alert-warning");
    errorMessage.textContent = "";
    if (elt && id && name && lense && price && numberOfItemsToAdd) {
        const itemToAddToCart = {"elementIdentifier" : elt, id, "produit" : name, "objectif" : lense, "prix" : price, "quantite" : numberOfItemsToAdd};
        addItemToCart(itemToAddToCart);
        errorMessage.classList.add("alert", "alert-success");
        errorMessage.textContent = "L'élément à bien été ajouté au panier !";
    } else {
        errorMessage.classList.add("alert", "alert-warning");
        errorMessage.textContent = "Il y a eu une erreur, veillez à choisir une option et une quantité."
    }
};

function addItemToCart(item) {
    // Initialisation du panier (tableau vide)
    let cart = [];
    if (localStorage.getItem("Panier")) {
        const uniqueIdentifierOfArticleToAdd = item.elementIdentifier;
        let articlesInCart = JSON.parse(localStorage.getItem("Panier"));
        cart.push(...articlesInCart);
 
        // Si l'article est déjà présent au sein du panier
        // (vérifie si identiques : si oui met à jour le localStorage en modifiant la quantité; si non : ajoute un nouvel élément)
            if (cart.some(el => el.elementIdentifier === uniqueIdentifierOfArticleToAdd)) {
                //const itemToRemove = cart.findIndex(el => el.elementIdentifier === uniqueIdentifierOfArticleToAdd);
                cart.map((element, key) => {
                    if (element.elementIdentifier === uniqueIdentifierOfArticleToAdd) {
                        const previousQuantity = element.quantite;
                        const nouvelleQuantite = previousQuantity + item.quantite;
                        const elementIdentifier = item.id + item.objectif;
                        const panierModifie = {elementIdentifier, "id" : item.id, "produit" : item.produit, "objectif" : item.objectif, "prix" : item.prix, "quantite" : nouvelleQuantite};
                        cart.splice(key, 1, panierModifie);
                        localStorage.setItem("Panier", JSON.stringify(cart));
                        numberOfItemsInCart();
                    }
                });
            } else {
                // L'article n'est PAS présent dans le panier, on l'y ajoute
                cart.push(item);
                localStorage.setItem("Panier", JSON.stringify(cart));
                numberOfItemsInCart();
            }
    } else {
        // Si le panier n'est pas présent au sein du localStorage
        // On créé le panier et y ajoute le nouvel article désiré avec toutes ses caractéristiques
        cart.push(item);
        localStorage.setItem("Panier", JSON.stringify(cart));
        numberOfItemsInCart();
    }
};

function removeItemInCart(key) {
    const mainDiv = document.querySelector("#main-container");
    let cart = [];
    let localCart = JSON.parse(localStorage.getItem("Panier"));
    
    if (localStorage.getItem("Panier") && localStorage.getItem("Panier").length > 1) {
        cart.push(...localCart);
        let itemToRemove = cart.filter(el => el.elementIdentifier !== key);
        localStorage.setItem("Panier", JSON.stringify(itemToRemove));
        mainDiv.innerHTML = "";
        showCart();
        numberOfItemsInCart();
    } else if (localCart.length <= 1) {
        localStorage.removeItem("Panier");
        mainDiv.innerHTML = " ";
        showCart();
        numberOfItemsInCart();
    }
};

function numberOfItemsInCart() {
    const panier = JSON.parse(localStorage.getItem("Panier"));
    if (panier !== null && panier.length > 0) {
        const tabOfItemsInCart = [];
        panier.map(el => {
            tabOfItemsInCart.push(parseInt(el.quantite));
        });
        const totalOfItemsInCart = tabOfItemsInCart.reduce((previousValue, currentValue) => previousValue + currentValue);
            document.querySelector("#total-number-in-cart-container").classList.remove("d-none");
            document.querySelector("#total-number-in-cart").textContent = totalOfItemsInCart;
    } else {
        document.querySelector("#total-number-in-cart").textContent = "";
        document.querySelector("#total-number-in-cart-container").classList.add("d-none");
    }
};

function showCart() {
    changeTitleContentOfPage("Votre panier");
    changeMetaTitle("Orinoco - votre panier");
    const currentCart = JSON.parse(localStorage.getItem("Panier"));

    const mainDiv = document.querySelector("#main-container");
    const allArticles = document.querySelector(".main-div");
    const secondDiv = document.querySelector(".second-div");
    if (secondDiv) {secondDiv.classList.add("d-none")};
    if (allArticles) {allArticles.classList.add("d-none")};

    const cartBody = document.createElement("div");
    cartBody.classList.add("px-md-5", "cart-body", "min-height-50vh");
    history.pushState(null, null, "?page=panier");
    
    if (currentCart && currentCart.length >= 1) {
        const cartListContainer = document.createElement("div");
        const tableCartContainer = document.createElement("table");
        const tableHead = document.createElement("thead");
        const tableBody = document.createElement("tbody");

        let total = [];
        cartListContainer.classList.add("table-responsive");
        tableCartContainer.classList.add("table", "align-middle");
        
        tableHead.classList.add("table-light");
        tableHead.innerHTML = `
            <tr class="text-center">
                <th scope="col">Article</th>
                <th class="max-width-50" scope="col">Qté</th>
                <th scope="col">Prix</th>
                <th scope="col">Total</th>
                <th scope="col">Supprimer</th>
            </tr>
        `;

        currentCart.map( el => {
            let sousTotal = el.quantite * el.prix;
            let title = `<div><b>${el.produit}</b></div><div><span><i>Objectif ${el.objectif}</i></span></div>`;
            total.push(sousTotal);
            tableBody.innerHTML += 
        `
            <tr class="text-center">
                <td>${title}</td>
                <td class="max-width-50">
                    <span class="mx-1">${el.quantite}</span>
                </td>
                <td>${el.prix / 1000}0€</td>
                <td>${sousTotal / 1000}0€</td>
                <td><span id="delete-article" data-uid="${el.elementIdentifier}">X</span></td>
            </tr>
            `
        });
        totalPrice = total.reduce((previousValue, currentValue) => previousValue + currentValue);

        tableCartContainer.append(tableHead);
        tableCartContainer.append(tableBody);
        cartListContainer.append(tableCartContainer);
        mainDiv.appendChild(cartBody);
        cartBody.append(cartListContainer);
        const div = document.createElement("div");
        cartBody.append(div);
        div.classList.add("container", "text-end", "main-font-family", "nav-link");
        div.innerHTML += ` 
            <p class="fs-3 mt-3">
                TOTAL = ${totalPrice / 1000}0€
            </p>`
        ;

        mainDiv.appendChild(cartBody);
        const div2 = document.createElement("div");
        cartBody.append(div2);
        div2.classList.add("container", "form-container");
        createCommandForm(div2);

        const linksToDeleteArticle = document.querySelectorAll("#delete-article");
        for (let linkToDeleteArticle of linksToDeleteArticle) {
            linkToDeleteArticle.addEventListener("click", function(e) {
                e.preventDefault();
                const uid = this.dataset.uid;
                removeItemInCart(uid);
            });
        };
        
    } else {
        mainDiv.appendChild(cartBody);
        const emptyCartTextContainer = document.createElement("h3");
        emptyCartTextContainer.textContent = "Votre panier est vide !";
        emptyCartTextContainer.classList.add("text-center", "mt-5");
        cartBody.append(emptyCartTextContainer);
        mainDiv.append(cartBody);
    };
};

function createCommandForm(element) {
    element.innerHTML += `
    <h3 class="text-center mb-4" id="form-title">Veuillez remplir ce formulaire pour confirmer votre commande :</h3>
    <form class="row g-3" id="form-validation">

        <div class="col-md-6 has-validation">
            <label for="prenom" class="form-label">Prénom</label>
            <input type="text" id="prenom" name="prenom" class="form-control" placeholder="Prénom" aria-label="Prénom" aria-describedby="form-title" />
        </div>
        <div class="col-md-6 has-validation">
            <label for="nom" class="form-label">Nom</label>
            <input type="text" id="nom" name="nom" class="form-control" placeholder="Nom" aria-label="Nom" aria-describedby="form-title" />
        </div>
        <div class="col-md-12 has-validation">
            <label for="email" class="form-label">Email</label>
            <input type="email" id="email" name="email" class="form-control" placeholder="Email" aria-label="Email" aria-describedby="emailHelp" />
        </div>
        <div id="emailHelp" class="form-text mb-3">Comme pour toutes vos informations, nous utilisons votre email pour le traitement de votre commande, nous ne la partageons pas.</div>


        <div class="text-center">VOTRE ADRESSE</div>
        <div class="col-md-6 has-validation">
            <label for="numero-rue" class="form-label">Numéro et nom de rue</label>
            <input type="text" id="numero-rue" name="numero-rue" class="form-control input-md" placeholder="123 rue de ma ville" aria-label="Numéro et nom de rue" aria-describedby="form-title" />
        </div>
        <div class="col-md-6">
            <label for="complement" class="form-label">Complément d'adresse</label>
            <input type="text" id="complement" name="complement-adresse" class="form-control" placeholder="appartement, bâtiment, étage..." aria-label="Complément d'adresse" aria-describedby="form-title" />
        </div>
        <div class="col-md-6 has-validation">
            <label for="code-postal" class="form-label">Code postal</label>
            <input type="text" id="code-postal" name="code-postal" class="form-control" aria-label="Code postal" aria-describedby="form-title" />
        </div>
        <div class="col-md-6 mb-3 has-validation">
            <label for="ville" class="form-label">Ville</label>
            <input type="text" id="ville" name="ville" class="form-control" aria-label="Ville" aria-describedby="form-title" />
        </div>

        <div class="d-grid gap-2">
            <button type="submit" id="commandFormBtn" class="btn btn-lg main-background-color">Envoyer</button>
        </div>
    </form>
    `;

    const form = document.querySelector("#form-validation");
    form.addEventListener("submit", function(e) {
        e.preventDefault();
        cartFormValidation();
    });
};

function cartFormValidation() {
    //const form = document.querySelector("#form-validation")
    const firstname = document.querySelector("#prenom");
    const lastname = document.querySelector("#nom");
    const email = document.querySelector("#email");
    const streetNumberAndName = document.querySelector("#numero-rue");
    const adressComplement = document.querySelector("#complement");
    const zipCode = document.querySelector("#code-postal");
    const city = document.querySelector("#ville");

    //faire traitement formulaire (via regex etc)
    const formValues = {"prenom" : firstname.value,
                        "nom" : lastname.value,
                        "email" : email.value,
                        "numero-rue" : streetNumberAndName.value,
                        "complement-adresse" : adressComplement.value,
                        "code-postal" : zipCode.value,
                        "ville" : city.value,
                        };
    console.log(formValues);

    const cartToSend = JSON.parse(localStorage.getItem("Panier"));
    console.log(cartToSend);

    let randomNumber = Math.round(Math.random() * 1000000000);
    const orderId = randomNumber.toString();
    console.log(orderId); // order id renvoyé par backend ??
    
    // fetch("http://localhost:3000/api/cameras/order",{   method: "POST",
    //                                                     body: JSON.stringify({
    //                                                                  formValues,
    //                                                                  cartToSend,
    //                                                                  orderId
    //                                                            })
    //                                                 })
    // .then()
};
