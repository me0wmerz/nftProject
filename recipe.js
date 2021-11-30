//BELOW IS FOR FOOD SECTION

// make search button for searching food 
const apiKey = "3f5180d6774b495eb794eb02a08d8db6"

const inputs = document.querySelectorAll('input')

// let ingredients = "egg"

document.getElementById("search").addEventListener("click", event => {
  event.preventDefault()
  let ingredientsEl = document.getElementById("userInput").value

  axios.get(` https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&instructionsRequired=true&addRecipeInformation=true&addRecipeNutrition=true&includeIngredients=${ingredientsEl}&number=1`)
    .then(res => {
      console.log(res)
      //for basic recipe info
      for (let indexRecipe = 0; indexRecipe < 1; indexRecipe++) {
        let foodInfo = res.data.results[indexRecipe]
        // console.log(foodInfo.title)
        // console.log(foodInfo.image)
        // console.log(foodInfo.summary)
        // console.log(foodInfo.readyInMinutes)
        // console.log(foodInfo.servings)
        //displays all cuisine types in array (below)
        //let cuisineTypes = foodInfo.cuisines.join(", ")

        document.getElementById('foodName').innerHTML = `
              <h2>${foodInfo.title}</h2>
              <br>
              `
        document.getElementById('foodPic').innerHTML = `
              <img src=${foodInfo.image} alt=${foodInfo.title} picture" width="350">
              <br>
            `
        document.getElementById('totalTime').innerHTML = `
              Ready In: ${foodInfo.readyInMinutes} minutes
              `
        document.getElementById('servings').innerHTML = `
              Serving Size: ${foodInfo.servings} 
              `
        ///ADD STYLING (WRAP AROUND PIC, OR SCROLL-DOWN ON BULMA)
        document.getElementById('summary').innerHTML = `
              ${foodInfo.summary} 
              `

        // for (let indexRecipe = 0; indexRecipe < 1; indexRecipe++) {
        // let foodInfo = res.data.results[indexRecipe]
        //for ingredient list
        let ingredientInfo = foodInfo.nutrition.ingredients

        ingredientInfo.forEach((ingredientDetails) => {
          let ingredientList = document.getElementById("ingredients")

          let newIngredients = document.createElement("p")

          newIngredients.innerHTML = `
          ${ingredientDetails.amount} ${ingredientDetails.unit} ${ingredientDetails.name}
          `
          ingredientList.append(newIngredients)
        })
        // }

        let totalStepInstructions = ""
        let instructions = foodInfo.analyzedInstructions[0].steps
        instructions.forEach((instructionSteps) => {
          totalStepInstructions += instructionSteps.step
        })
        console.log(totalStepInstructions)

        document.getElementById("foodInstructions").innerHTML = `
          <p>${totalStepInstructions}</p>
          `

        let nutritionInfo = foodInfo.nutrition.nutrients
        // console.log("ping" + nutritionInfo[0].name + ": " + nutritionInfo[0].amount)
        // console.log("ping" + nutritionInfo[8].name + ": " + nutritionInfo[8].amount)
        // console.log("ping" + nutritionInfo[3].name + ": " + nutritionInfo[3].amount)
        document.getElementById("calories").innerHTML = `
          ${nutritionInfo[0].name}: ${nutritionInfo[0].amount} ${nutritionInfo[0].unit}
          `
        document.getElementById("fat").innerHTML = `
          ${nutritionInfo[1].name}: ${nutritionInfo[1].amount} ${nutritionInfo[1].unit}
          `
        document.getElementById("carbs").innerHTML = `
          ${nutritionInfo[3].name}: ${nutritionInfo[3].amount} ${nutritionInfo[3].unit}
          `
        document.getElementById("protein").innerHTML = `
          ${nutritionInfo[8].name}: ${nutritionInfo[8].amount} ${nutritionInfo[8].unit}
          `
        document.getElementById("sodium").innerHTML = `
          ${nutritionInfo[7].name}: ${nutritionInfo[7].amount} ${nutritionInfo[7].unit}
          `
        document.getElementById("sugar").innerHTML = `
          ${nutritionInfo[5].name}: ${nutritionInfo[5].amount} ${nutritionInfo[5].unit}
          `
        document.getElementById("cholesterol").innerHTML = `
          ${nutritionInfo[6].name}: ${nutritionInfo[6].amount} ${nutritionInfo[6].unit}
          `
        document.getElementById("fiber").innerHTML = `
          ${nutritionInfo[13].name}: ${nutritionInfo[13].amount} ${nutritionInfo[13].unit}
          `
      }

    })
    .catch(err => {
      console.log(err)
    })
})