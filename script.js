function showWarning(warningText) {
    document.getElementById("warningText").innerText = warningText;
}

document.getElementById("search-btn").addEventListener("click", function () {
    showWarning("");
    document.getElementById("mealDetails").style.display = 'none';

    const inputMealName = document.getElementById("inputMealName").value;
    if (inputMealName === "") {
        showWarning("You Didn't enter any meal name")
    } else {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputMealName}`)
            .then(res => res.json())
            .then(data => {
                if (data.meals === null) {
                    showWarning(`No Meals Found.`)
                } else {
                    showFoundMeals(data.meals);
                }
            })
    }
    document.getElementById("inputMealName").value = "";
})

function showFoundMeals(meals) {
    // clearing previous search result
    document.getElementById("allMeal").innerHTML = "";

    meals.forEach(meal => {
        const createdMealDiv = document.createElement("div");
        createdMealDiv.innerHTML = `
        <div onclick='mealDetails("${meal.idMeal}")' class="meal-card">
            <img src="${meal.strMealThumb}" class="meal-image">
            <h5 class="meal-title">${meal.strMeal}</h5>
        </div>
        `;
        document.getElementById("allMeal").appendChild(createdMealDiv);
    });
}

// fetching
function mealDetails(mealId) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(res => res.json())
        .then(data => {
            displayMealDetails(data.meals[0]);
        })
}

function displayMealDetails(meal) {
    const ingredientsDetails =
        `
            <div class="text-center">
                <img src="${meal.strMealThumb}" class="mealDetails-image">
                <h3 class="mealTitle">${meal.strMeal}</h3>
            </div>
            <div>
                <h4> Ingredients</h4>
                <ul id="ingredient-list">
                </ul>
            </div>
        `
    document.getElementById("mealDetails-display").innerHTML = ingredientsDetails;
    // Displaying Ingredients.
    for (let i = 1; i <= 20; i++) {
        let ingredient = 'strIngredient' + i;
        let quantity = 'strMeasure' + i;

        if (meal[ingredient] === "" || meal[ingredient] == null) {
            break;
        }

        const li = document.createElement("li");
        li.innerHTML = `
        <li><i class="icon-color fas fa-check-square"></i> ${meal[quantity]} ${meal[ingredient]}</li>
        `;
        document.getElementById("ingredient-list").appendChild(li)
    }

    document.getElementById("mealDetails").style.display = "block";

}