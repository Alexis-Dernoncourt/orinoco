function backToHome(){
    /**
     * Modification de l'url
     */
     const homeUrl = "/frontend/view/index.html";
     const articleContainer = document.querySelector("#article-unique");
     const divToHide = document.querySelector(".second-div");
     const divToShow = document.querySelector(".main-div");
     document.querySelector("#title").textContent = "Découvrez tous nos appareils photo";


     if (window.location.pathname === homeUrl){
        divToHide.classList.add("display-none");
        divToShow.classList.remove("display-none");
     } else {
        let url = homeUrl;
        history.pushState({}, null, url);
        articleContainer.remove();
        divToHide.classList.add("display-none");
        divToShow.classList.remove("display-none");
     }
};
