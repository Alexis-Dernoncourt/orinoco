class Router {
    constructor(url, element) {
        this.url = url;
        this.element = element;
    };

    getPageParam() {
        const pageParam = new URL(location).searchParams.get("page");
        if (pageParam) {
            return pageParam;
        }
    };

    getCart() {
        // Afficher le panier au clic sur le bouton du menu
        const cartBtn = document.querySelector("a[data-link=cart]");
        cartBtn.addEventListener("click", function(e) {
            e.preventDefault();
            const cartContainer = document.querySelector(".cart-body");
            if (cartContainer) {cartContainer.remove()};
            showCart();
        });
    }
    
    getPage(element) {
        const homeUrl = "http://127.0.0.1:5500/frontend/view/index.html";
        const mainDiv = document.querySelector(".main-div");
        const secondDiv = document.querySelector(".second-div");
        const cartContainer = document.querySelector(".cart-body");

        if (!getIdInUrl() && location.href === homeUrl) {
            console.log("Page d'accueil");
            mainDiv.classList.remove("d-none");
            secondDiv.classList.add("d-none");
            if (cartContainer) {cartContainer.remove()};
            history.pushState(null, null, homeUrl);
            element.getAllArticles();
            this.getCart();

        } else if (getIdInUrl()) {
            const id = getIdInUrl();
            console.log("Page de l'article avec l'id : " + id);
            history.pushState(null, null, `${homeUrl}?id=${id}`);
            mainDiv.classList.add("d-none");
            secondDiv.classList.remove("d-none");
            if (cartContainer) {cartContainer.remove()};
            if (cartContainer) {cartContainer.classList.add("d-none")};
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
            } else {
                console.log("page introuvable");
                // Redirige vers homepage
                this.url = homeUrl;
                element.getAllArticles();
                history.pushState(null, null, homeUrl);
                cartContainer.remove();
                if (cartContainer) {cartContainer.classList.add("d-none")};
                this.getCart();
            }
        }
    };
}
