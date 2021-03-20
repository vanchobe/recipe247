function validateAddRecipes (name,image,prepareTime,portions,description, category){
    let result = [];

    //name validations
    if(name.length < 4){
        if(result.name === undefined){
            result.name = [];
            result.name.push('Името трябва да бъде минимум 4 символа.');
        } else {
            result.name.push('Името трябва да бъде минимум 4 символа.');
        }
       
    }
    // image validations
    if(!image.includes('https://') && !image.includes('http://')){
        if(result.image === undefined){
            result.image = [];
            result.image.push('Снимката трябва да започва със http:// или https://.');
        } else {
            result.image.push('Снимката трябва да започва със http:// или https://.');
        }
       
    }


    //prepareTime validations 
    if(prepareTime <= 0){
        if(result.prepareTime === undefined){
            result.prepareTime = [];
            result.prepareTime.push('Времето за приготвяне не може да бъде 0 мунити.');
        } else {
            result.prepareTime.push('Времето за приготвяне не може да бъде 0 мунити.');
        }
    }


    // portions check
    if(portions <= 0){
        if(result.portions === undefined){
            result.portions = [];
            result.portions.push('Порциите не могат да бъдат 0 или по-малко');
        } else {
            result.portions.push('Порциите не могат да бъдат 0 или по-малко');
        }
    }

    // description check
    if(description.length <= 0){
        if(result.description === undefined){
            result.description = [];
            result.description.push('Описанието не може да бъде празно.');
        } else {
            result.description.push('Описанието не може да бъде празно.');
        }
    }

    if(category === ''){
        if(result.category === undefined){
            result.category = [];
            result.category.push('Моля, изберете категория');
        } else {
            result.category.push('Моля, изберете категория');
        }
    }
     
    return result
}

export default validateAddRecipes;

 