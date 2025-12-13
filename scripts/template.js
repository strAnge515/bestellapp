


function generateTemplate() {
    let content = document.getElementById("main-content")

    for (let i = 0; i < myDishes.length; i++) {

        content.innerHTML += `
                    <section class="main-dishes">
                         <div>
                             <h3>${myDishes[i].name}</h3>
                            <p>${myDishes[i].description} </p>
                            <p class="main-dishes-price">${myDishes[i].price.toFixed(2)} €</p>
                        </div>
                        
                        <button class="add-count" data-index="${i}">+</button>

                    </section>
    `

    }


}

function generateBascetTemplate(i) {
    let bascetContent = document.getElementById("bascet-content");
    const dish = myDishes[i]
    bascetContent.innerHTML += `
                <ul class="bascet-list">
                    <h4 class="bascet-product-name">${dish.name}</h4>
                    <section class="bascet-product">
                        <div class="bascet-count">
                            <button class="subtract-count-bascet" data-index="${i}">-</button>
                            <p>${dish.count}</p>
                            <button class="add-count-bascet"  data-index="${i}">+</button>
                        </div>
                        <div class="bascet-price">
                            <p>${dish.price.toFixed(2)} €</p>
                            <button class="delete-button" data-index="${i}">löschen</button>
                        </div>
                    </section>
                </ul>
    
    `

}

