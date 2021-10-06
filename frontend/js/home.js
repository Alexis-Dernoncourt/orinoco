console.log('Home is running !');
/**
 * Récupération du paramètre id de l'url
 */
//const ID = new URL(location.href).searchParams.get("id");

/**
 * Récupération de tous les articles et formatage/injection du contenu sur la homepage
 */
Article.getAllArticles();
