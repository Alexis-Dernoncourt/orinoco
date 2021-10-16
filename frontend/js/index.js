console.log('Index is running.');
// Récupération de tous les articles et formatage/injection du contenu sur la homepage
let article = new Article();
let url = new URL(window.location);
let router = new Router(url, article);
router.getPage(article);

goToHomeBtns();

// Récupération, si existant, du nombre d'article(s) ajouté(s) au panier (notification visuelle)
numberOfItemsInCart();

