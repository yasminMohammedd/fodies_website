
// fetch data from csv file .

  let food_array=[];
fetch("nutrients_csvfile2.csv")
  .then(function(response) {
    return response.text();
  }).then(function(data) {
    for( let i of data.split("\n")){
    let food_item=i.split(";").map(toNumber);
    if(food_item[0]!=0)
    {
    let food_object={
      food:food_item[0],
      measure:food_item[1],
      grams:food_item[2],
      calories:food_item[3],
      protein:food_item[4],
      fat:food_item[5],
      sat_fat:food_item[6],
      fiber:food_item[7],
      carbs:food_item[8],
      category:food_item[9],
      id:food_item[10],
    }
    food_array.push(food_object);// to obtain the tpe of number .
    }
  }
    localStorage.setItem("food_array",JSON.stringify(food_array));

  });


  // it will convert each digit that has a string type to number type .
    function toNumber(item, index) {
      if (!isNaN(item)){
      item=Number(item);
      }
      return item;
    }
