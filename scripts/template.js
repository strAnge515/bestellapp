function generateTemplate () {
    let content = document.getElementById("main-content")

    for (let i = 0; i < myDishes.length; i++) {
       
        content.innerHTML += `
                    <section class="main-dishes">
                         <div>
                             <h3>${myDishes[i].name}</h3>
                            <p>${myDishes[i].description} </p>
                            <p class="main-dishes-price">${myDishes[i].price.toFixed(2)} €</p>
                        </div>
                        
                        <button class="add-count">+</button>

                    </section>
    `
        
    }

    
}