console.log('Home is running !');

// Récupération de tous les articles et formatage/injection du contenu sur la homepage
let article = new Article();
article.getAllArticles();

// Récupération, si existant, du nombre d'article(s) ajouté(s) au panier (notification visuelle)
numberOfItemsInCart();

// Afficher le paniera au clic sur le bouton du menu
const cartBtn = document.querySelector("a[data-link=cart]");
const modalBody = document.querySelector(".modal-body");
cartBtn.addEventListener("click", (e) => {
    e.preventDefault();
    modalBody.innerHTML = " ";
    showCart();
});

console.log(getIdInUrl());
let url = getIdInUrl();
console.log(typeof url);

if (url !== "index.html" && url > 1) {
    console.log("On dirait l'id d'un article !");
}