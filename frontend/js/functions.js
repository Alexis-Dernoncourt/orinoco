function backToHome(){
   /**
    * Modification de l'url
    */
   const homeUrl = "/frontend/view/index.html";
   const articleContainer = document.querySelector("#article-unique");

   const divToHide = document.querySelector(".second-div");
   const divToShow = document.querySelector(".main-div");
   document.querySelector("#title").textContent = "Découvrez tous nos appareils photo";
   document.title = "Orinoco - Découvrez tous nos appareils photo";

   if (window.location.pathname === homeUrl){
      divToHide.classList.add("display-none");
      divToShow.classList.remove("display-none");
   } 
   else {
      let url = homeUrl;
      history.pushState({}, null, url);
      articleContainer.remove();
      divToHide.classList.add("display-none");
      divToShow.classList.remove("display-none");
   }
};

function goToCart(){
   const cartUrl = "/frontend/view/panier.html";
   const putCartUrl = window.location.origin + cartUrl;
   window.location.href = putCartUrl;
   history.pushState({}, null, cartUrl);
};


/**
 * Récupération, si existant, du nombre d'article(s) ajouté(s) au panier + notification visuelle
 */
Cart.numberOfItemsInCart();
