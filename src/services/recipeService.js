import { db } from "../services/firebase"
const loadRecipes = async (isSubscribed, categoryName) => {
    let currentRecipes = [];
    let currentPage = 0
    let readError = ''
    try {
     if(categoryName === 'all'){
        const ref =  db.ref("recipes");
        const snapshot = await ref.once('value');
        const value = snapshot;
        let recipes = [];
        
        value.forEach((snap) => {
          let _id = snap.ref_.path.pieces_[1];
          recipes.push({...snap.val(), _id});
        })
        if(isSubscribed){
            currentRecipes = recipes.reverse()
            currentPage = 0;
        }
     } else {
    const ref =  db.ref("recipes")
    .orderByChild('category')
    .equalTo(`${categoryName}`);
    const snapshot = await ref.once('value');
    const value = snapshot;
    let recipes = [];
    
    value.forEach((snap) => {
      let _id = snap.ref_.path.pieces_[1];
      recipes.push({...snap.val(), _id});
    })
    if(isSubscribed){
        currentRecipes = recipes.reverse()
        currentPage = 0;
    }
     }
    } catch (error) {
      if(isSubscribed){
      readError = error.message;
      }
    }
    
    return [currentRecipes, currentPage, readError];
  }

  const loadAllRecipes = async () => {
        const ref =  db.ref("recipes");
        const snapshot = await ref.once('value');    
    return snapshot
  }  

export {
    loadRecipes,
    loadAllRecipes
    }  