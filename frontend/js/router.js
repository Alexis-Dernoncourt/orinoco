const localURLorigin = "http://127.0.0.1:5500";

class Router {
    constructor(url, element) {
        this.url = url;
        this.element = element;
    };

    getPageParam() {
        const pageParam = new URL(location).searchParams.get("page");
        if (pageParam) {
            return pageParam;
        } else {
            return false;
        }
    };

    getCart() {
        // Afficher le panier au clic sur le bouton du menu
        const cartBtn = document.querySelector("a[data-link=cart]");
        cartBtn.addEventListener("click", function(e) {
            e.preventDefault();
            const cartContainer = document.querySelector(".cart-body");
            cartContainer && cartContainer.remove();
            showCart();
        });
    }
    
    getPage(element) {
        const homeUrl = `${localURLorigin}/frontend/view/index.html`;
        const mainDiv = document.querySelector(".main-div");
        const secondDiv = document.querySelector(".second-div");
        const cartContainer = document.querySelector(".cart-body");
        const confirmationContainer = document.querySelector(".confirmation-body");

        if (!getIdInUrl() && location.href === homeUrl) {
            console.log("Page d'accueil");
            mainDiv.classList.remove("d-none");
            secondDiv.classList.add("d-none");
            cartContainer && cartContainer.remove();
            confirmationContainer && confirmationContainer.remove();
            history.pushState(null, null, homeUrl);
            element.getAllArticles();
            this.getCart();

        } else if (getIdInUrl()) {
            const id = getIdInUrl();
            console.log("Page de l'article avec l'id : " + id);
            history.pushState(null, null, `${homeUrl}?id=${id}`);
            mainDiv.classList.add("d-none");
            secondDiv.classList.remove("d-none");
            cartContainer && cartContainer.remove();
            cartContainer && cartContainer.classList.add("d-none");
            element.getAllArticles();
            element.getArticleById2(id);
            this.getCart();

        } else if (this.getPageParam()) {
            if (this.getPageParam() === "panier") {
                changeTitleContentOfPage("Votre panier");
                changeMetaTitle("Orinoco - votre panier");
                element.getAllArticles();
                console.log("Page panier !");
                showCart();
                history.pushState(null, null, location.pathname + "?page=panier");
            } else if (this.getPageParam() === "confirmation") {
                changeTitleContentOfPage("Votre panier");
                changeMetaTitle("Orinoco - votre panier");
                console.log("Confirmation de la commande.");
                history.pushState(null, null, location.pathname + "?page=confirmation");
            } else {
                console.log("page introuvable");
                // Redirige vers homepage
                this.url = homeUrl;
                element.getAllArticles();
                history.pushState(null, null, homeUrl);
                cartContainer.remove();
                cartContainer && cartContainer.classList.add("d-none");
                this.getCart();
            }
        }
    };
}
