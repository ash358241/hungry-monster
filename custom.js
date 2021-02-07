const searchBtn = document.getElementById("search-btn");
const mealList = document.getElementById("meal");
const mealDetailsContent = document.querySelector(".meal-details-content");
const recipeCloseBtn = document.getElementById("recipe-close-btn");

// event listeners
searchBtn.addEventListener("click", getMealList);
// mealList.addEventListener("click", getMealRecipe);
recipeCloseBtn.addEventListener("click", () => {
  mealDetailsContent.parentElement.classList.remove("showRecipe");
});

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
                    <div class = "meal-item" data-id = "${meal.strMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            <button onclick="getMealDetails()" class = "recipe-btn">Get Recipe</button>
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

function getMealDetails(e) {
  //   e.preventDefault();
  let mealItem = e.target.parentElement.parentElement;
  fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealItem.dataset.strMeal}`
  )
    .then((res) => res.json())
    .then((data) => {
      getMealIngredient(data.meals);
    });
}

function getMealIngredient(meal) {
  console.log(meal);
  // meal = meal[0];
  // let html = `
  //       <h2 class = "recipe-title">${meal.strMeal}</h2>
  //       <p class = "recipe-category">${meal.strCategory}</p>
  //       <div class = "recipe-instruct">
  //           <h3>Instructions:</h3>
  //           <p>${meal.strInstructions}</p>
  //       </div>
  //       <div class = "recipe-meal-img">
  //           <img src = "${meal.strMealThumb}" alt = "">
  //       </div>
  //   `;
  // mealDetailsContent.innerHTML = html;
  // mealDetailsContent.parentElement.classList.add("showRecipe");
}

// get recipe of the meal
// function getMealRecipe(e) {
//   e.preventDefault();
//   if (e.target.classList.contains("recipe-btn")) {
//     let mealItem = e.target.parentElement.parentElement;
//     fetch(
//       `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`
//     )
//       .then((response) => response.json())
//       .then((data) => mealRecipeModal(data.meals));
//   }
// }

// create a modal
// function mealRecipeModal(meal) {
//   console.log(meal);
//   meal = meal[0];
//   let html = `
//         <h2 class = "recipe-title">${meal.strMeal}</h2>
//         <p class = "recipe-category">${meal.strCategory}</p>
//         <div class = "recipe-instruct">
//             <h3>Instructions:</h3>
//             <p>${meal.strInstructions}</p>
//         </div>
//         <div class = "recipe-meal-img">
//             <img src = "${meal.strMealThumb}" alt = "">
//         </div>
//     `;
//   mealDetailsContent.innerHTML = html;
//   mealDetailsContent.parentElement.classList.add("showRecipe");
// }
