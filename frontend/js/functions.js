function backToHome() {
   // Modification de l'url
   const homeUrl = "/frontend/view/index.html";
   const articleContainer = document.querySelector("#article-unique");

   const divToHide = document.querySelector(".second-div");
   const divToShow = document.querySelector(".main-div");

   deleteSavedItem();

   document.querySelector("#title").textContent = "Découvrez tous nos appareils photo";
   document.title = "Orinoco - Découvrez tous nos appareils photo";

   if (window.location.pathname === homeUrl) {
      divToHide.classList.add("display-none");
      divToShow.classList.remove("display-none");
   } 
   else {
      history.pushState({}, null, homeUrl);
      articleContainer.remove();
      divToHide.classList.add("display-none");
      divToShow.classList.remove("display-none");
   }
};

function goToCart() {
   const cartUrl = "/frontend/view/panier.html";
   const putCartUrl = window.location.origin + cartUrl;
   window.location.href = putCartUrl;
   history.pushState({}, null, cartUrl);
};

function getIdInUrl() {
   const tabUrl = window.location.pathname.split("/");
   const lastIndexInTabUrl = tabUrl.length - 1;
   let id = tabUrl[lastIndexInTabUrl];
   return id;
};

function deleteSavedItem() {
   const id = getIdInUrl();
   localStorage.removeItem(id);
};

// Récupère et retourne les options de choix de la lentille variables pour l'élément input type select
 function showOptions(options) {
   const showLenses = options.map(el =>
      `<option value="${el}">${el}</option>`
   );
   return showLenses;
};

// Récupère et retourne la valeur du select
function getSelectionnedLense(selectId) {
   let selectElmt = document.getElementById(selectId);
   return selectElmt.options[selectElmt.selectedIndex].value;
};

function changeTitleContentOfPage(string) {
   document.querySelector("#title").textContent = string;
};

function changeMetaTitle(string) {
   document.title = string;
};

// Récupération, si existant, du nombre d'article(s) ajouté(s) au panier (notification visuelle)
numberOfItemsInCart();
