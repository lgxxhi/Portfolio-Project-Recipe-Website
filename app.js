const form = document.querySelector("form");
const APP_ID = `627ac528`;
const APP_KEY = `aa52691efb068fc3ce0149b1f3cb341c`;

// const API_URL = `https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`;

const file = form.addEventListener("submit", (event) => {
  event.preventDefault();

  const input = event.target["input"].value;
  const API_URL = `https://api.edamam.com/search?q=${input}&app_id=${APP_ID}&app_key=${APP_KEY}&to=60`;

  const allResults = document.querySelector(".all-results");

  fetch(API_URL)
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      //console.log(data.count);
      const introCard = document.querySelector(".intro-card");
      allResults.innerHTML = "";

      console.log(data.hits[0].recipe.totalNutrients["CA"].quantity);

      if (input) {
        introCard.setAttribute("hidden", "");
      }

      for (let i = 0; i < data.hits.length; i++) {
        let imageUrl = data.hits[i].recipe["image"];
        let title = data.hits[i].recipe["label"];
        let siteUrl = data.hits[i].recipe["url"];
        let calories = data.hits[i].recipe["calories"].toFixed(0);

        let fats = data.hits[0].recipe.totalNutrients["FAT"].quantity.toFixed();
        let proteins =
          data.hits[0].recipe.totalNutrients["PROCNT"].quantity.toFixed();
        let carbs =
          data.hits[0].recipe.totalNutrients["CHOCDF"].quantity.toFixed();

        let cholesterol =
          data.hits[0].recipe.totalNutrients["CHOLE"].quantity.toFixed();
        let sodium =
          data.hits[0].recipe.totalNutrients["NA"].quantity.toFixed();
        let calcium =
          data.hits[0].recipe.totalNutrients["CA"].quantity.toFixed();
        let potassium =
          data.hits[0].recipe.totalNutrients["K"].quantity.toFixed();
        let iron = data.hits[0].recipe.totalNutrients["FE"].quantity.toFixed();

        const searchResult = document.createElement("div");
        searchResult.classList.add("item");
        searchResult.innerHTML = `<div class="card">
              <img
                src="${imageUrl}"
                alt=""
                class="card-img"
              />
              <div class="card-body">
                <h1 class="card-title">Nutrition Facts</h1>
                <p class="card-sub-title">
                  <div class="block">
                    <div class="kcal">${calories} kcal</div>
                    <div></div>

                    <div><li>PROTEIN</li></div>
                    <div class="amount">${proteins} G</div>
                    <div><li>CARB</li></div>
                    <div class="amount">${carbs} G</div>
                    <div><li>FAT</li></div>
                    <div class="amount">${fats} G</div>
                    <div></div>
                    <div></div>
                    <div><li>CHOLESTEROL</li></div>
                    <div class="amount">${cholesterol} MG</div>
                    <div><li>SODIUM</li></div>
                    <div class="amount">${sodium} MG</div>
                    <div><li>CALCIUM</li></div>
                    <div class="amount">${calcium} MG</div>
                    <div><li>POTASSIUM</li></div>
                    <div class="amount">${potassium} MG</div>
                    <div><li>IRON</li></div>
                    <div class="amount">${iron} MG</div>
                  </div>
                </p>
              </div>
            </div>
            <div class="container">
              <h1 class="title">${title}</h1>
              <p class="cal item-data">Calories: ${calories}</p>
              <a class='url' href="${siteUrl}" target="_blank">View Recipe</a>
              
            </div>
          </div>`;

        allResults.append(searchResult);
      }
    })
    .catch((error) => error);

  form.reset();
});
