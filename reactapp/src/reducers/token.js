export default function(token='BvDZGpoh4HgKRTuvgfWCt38FJYa0TEDk', action) {
    
    if(action.type === 'addToken') {

        //console.log('token store', action.token)
        return action.token;

    } else {
        return token;
    }
}