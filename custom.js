const searchBtn = document.getElementById("search-btn");
const mealList = document.getElementById("meal");

// event listeners
searchBtn.addEventListener("click", getMealList);

// get meal items according to searching
function getMealList() {
  let searchInputTxt = document.getElementById("search-input").value;
  fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputTxt}`
  )
    .then((res) => res.json())
    .then((data) => {
      let html = "";
      if (data.meals) {
        data.meals.forEach((meal) => {
          html += `
            <div onclick="getMealDetails(${meal.idMeal})">
                    <div class = "meal-item" data-id = "${meal.strMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            
                        </div>
                    </div>
                    </div>
                `;
        });
        mealList.classList.remove("notFound");
      } else {
        html = "Sorry, there's no meal according to your searching";
        mealList.classList.add("notFound");
      }

      mealList.innerHTML = html;
    });
}

//get selected item's details
function getMealDetails(mealName) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealName}`)
    .then((res) => res.json())
    .then((data) => {
      getMealIngredient(data.meals[0]);
    });
}

function getMealIngredient(mealName) {
  const foodDetail = document.getElementById("foodDetail");

  foodDetail.innerHTML = `
        <img src = "${mealName.strMealThumb}" alt = "">
         <h2 class = "recipe-title">${mealName.strMeal}</h2>
        <p>Ingredient: </p>
        <ul>
        <li>${mealName.strIngredient1}</li>
        <li>${mealName.strIngredient2}</li>
        <li>${mealName.strIngredient3}</li>
        <li>${mealName.strIngredient4}</li>
        <li>${mealName.strIngredient5}</li>
        <li>${mealName.strIngredient6}</li>
       
    `;
}
