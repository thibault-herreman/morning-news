export default function(articleWishlist = [], action) {
    
    if(action.type == 'saveArticles'){

        console.log(action.articles);
        return action.articles;

    } else if(action.type === 'addArticle') {

        const found = articleWishlist.find(element => element.title === action.objetArticle.title);

        if (found === undefined) {
            var articleWishlistCopy = [...articleWishlist, action.objetArticle];
            return articleWishlistCopy;
        } else {
            return articleWishlist;
        }

    } else if (action.type === 'removeArticle') {
        
        var articleWishlistCopy = articleWishlist.filter(article => article.title !== action.title);
        return articleWishlistCopy;

    } else {
        return articleWishlist;
    }
}