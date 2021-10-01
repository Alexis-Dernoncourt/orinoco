function backToHome(){
    const homeURL = '/frontend/view/home/index.html';
    const listOfArticlesHome = document.querySelectorAll(".list-item");
    const articleContainer = document.querySelector(".unique-item");

    if (window.location.pathname !== homeURL){
        if(listOfArticlesHome){
            console.log("1");
            history.pushState({}, null, homeURL);
            articleContainer.classList.add("display-none");
            listOfArticlesHome.forEach(element => {
                element.classList.remove("display-none");
            });
        } else {
            console.log("1bis");
            listOfArticlesHome.forEach(element => {
                element.classList.remove("display-none");
            });
        }
    } else {
        if(listOfArticlesHome.classList.contains("display-none")){
            console.log("2");
            listOfArticlesHome.forEach(element => {
                element.classList.remove("display-none");
            });
            articleContainer.classList.add("display-none");
        }
    };
};

function addParamToUrl(){
    /**
     * Ajoute un paramètre à l'url (nom de l'article) sans recharger la page :
     */
     let url = window.location.href;
     let paramUrl = article.name;
     paramUrl = paramUrl.replace(/ /g, '-');
     const newUrl = url + "/" + paramUrl;
     history.pushState({}, null, newUrl);
};

function subParamToGoToHome(){
    const backToHomeBtn = document.querySelector("a[data-link]");
    const articleContainer = document.querySelector(".second-div");
    backToHomeBtn.addEventListener("click", (e) => {
        e.preventDefault();
        /**
         * Modification de l'url
         */
        const homeUrl = '/frontend/view/home/index.html';
        history.pushState({}, null, homeUrl);
        if (window.location.pathname === homeUrl){
            articleContainer.classList.add("display-none");
            const divToHide = document.querySelectorAll(".list-item");
            divToHide.forEach(element => {
                element.classList.remove("display-none");
            });
        } else {
            console.log(window.location.pathname);
        }

    })
}