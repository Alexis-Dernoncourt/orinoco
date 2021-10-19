function goToHomeBtns() {
   // Gestion des boutons vers homepage
   const backHome = document.querySelectorAll("#home-btn");
   backHome.forEach(element => {
      element.addEventListener("click", function(e) {
         e.stopPropagation();
         e.preventDefault();
         backToHome();
      });
   });
};

function backToHome() {
   // Modification de l'url
   const homeUrl = "/frontend/view/index.html";
   history.pushState(null, null, homeUrl);
   const divToHide = document.querySelector(".second-div");
   const divToShow = document.querySelector(".main-div");
   const cartContainer = document.querySelector(".cart-body");
   changeTitleContentOfPage("Découvrez tous nos appareils photo");
   changeMetaTitle("Orinoco - Découvrez tous nos appareils photo");
   if (cartContainer) {cartContainer.remove()};
   divToHide.classList.add("d-none");
   divToShow.classList.remove("d-none");
};

function getIdInUrl() {
   return new URL(location.href).searchParams.get("id");
};

// function deleteSavedItem() {
//    let id = getIdInUrl();
//    if(id) {
//       localStorage.removeItem(id);
//    }
// };

function getFormatedPrice(price) {
   const formatedPrice = price / 1000 + "0";
   const newFormatedPrice = formatedPrice.replace(".",",");
   return newFormatedPrice;
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
