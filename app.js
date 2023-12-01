const random_url = "https://www.themealdb.com/api/json/v1/1/random.php";

async function randomDish() {
  try {
    const res = await axios.get(random_url);
    const data = await res.data;

    // clearing modal ingredients
    document.getElementById("ings-list").innerHTML = "";
    // displaying random img and name from api
    document.getElementById("ran-dish-name").textContent =
      data.meals[0].strMeal;
    document.getElementById("random-img").src = data.meals[0].strMealThumb;

    // Modal code
    let ingredientList = data.meals[0];
    document.getElementById("modal-img").src = data.meals[0].strMealThumb;
    for (let i = 0; i < 21; i++) {
      let ingredient = ingredientList[`strIngredient${i}`];
      let measure = ingredientList[`strMeasure${i}`];

      if (ingredient && measure) {
        document.getElementById(
          "ings-list"
        ).innerHTML += `<li><b> ${i}. ${ingredient}</b> : ${measure}</li>`;
      }
    }

    console.log(ingredientList);
  } catch (err) {
    console.error(err);
  }
}
randomDish();
// try again button
document.getElementById("try-again").addEventListener("click", () => {
  randomDish();
});

async function displayDishes(category) {
  try {
    let url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
    let response = await axios.get(url);
    let dishData = await response.data;

    const dishes = dishData.meals;
    dishes.forEach((item) => {
      let dishImg = item.strMealThumb;
      let dishname = item.strMeal;
      document.getElementById("results").innerHTML += `
            <div class="dish">
                <div class="img-container">
                    <img src="${dishImg}" alt="">
                </div>
                <h2 id="dish-name">${dishname}</h2>
            </div>`;
    });
    console.log(dishData);
  } catch (err) {
    console.error(err);
    document.getElementById("err-msg").textContent =
      "0 results, please search again";
    document.querySelector("input").value = "";
  }
}
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  let category = document.querySelector("input").value;
  if (category == "") {
    console.log("nothing searched");
  } else {
    document.getElementById("err-msg").textContent = "";
    document.getElementById("results").innerHTML = "";
    displayDishes(category);
  }
});

const modalContainer = document.getElementById("Modal-container");
const myModal = document.getElementById("modal");

document.getElementById("ran-dish-name").addEventListener("click", () => {
  modalContainer.style.display = "flex";
});
document.getElementById("close").addEventListener("click", () => {
  modalContainer.style.display = "none";
});


