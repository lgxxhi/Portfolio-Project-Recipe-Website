const API_URL = `https://www.themealdb.com/api/json/v1/1/random.php`;

const getRecipeBtn = document.querySelector(".random-recipe-button");
const recipeCard = document.querySelector(".intro-card");

getRecipeBtn.addEventListener("click", () => {
  fetch(API_URL)
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      console.log(data);
      createMeal(data.meals[0]);
    });
});

function createMeal(meal) {
  recipeCard.removeAttribute("hidden");

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]} `
      );
    } else {
      break;
    }
  }

  console.log(ingredients);

  recipeCard.innerHTML = `<div class="item">
            <div class="card">
              <img
                src="${meal.strMealThumb}"
                alt=""
                class="card-img"
              />
              <div class="card-body">
                <h1 class="card-title">Ingredients</h1>
                <p class="card-sub-title">
                <ul class="card-sub-title">
                ${ingredients
                  .map(
                    (ingredient) => `
                <li>${ingredient}</li>`
                  )
                  .join("")}
                  <h1 class="card-title">Instructions</h1>
                  ${meal.strInstructions}
                </ul>
                </p>
              </div>
            </div>
            <div class="container">
              <p class="category"><strong>Category:</strong> ${
                meal.strCategory
              }</p>
              <h1 class="title">${meal.strMeal}</h1>            
              <a class="url" href="${
                meal.strSource
              }" target="_blank">View Recipe</a>
            </div>
          </div>`;
}
