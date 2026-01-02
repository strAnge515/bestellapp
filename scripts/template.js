


function generateTemplate(i) {
   return  `
                    <section class="main-dishes">
                         <div>
                             <h3>${myDishes[i].name}</h3>
                            <p>${myDishes[i].description} </p>
                            <p class="main-dishes-price">${myDishes[i].price.toFixed(2)} €</p>
                        </div>
                        
                        <button onclick="addItem(${i})" class="add-count" data-index="${i}">+</button>

                    </section>
    `;
}





function generateBascetTemplate(dish, price, i) {

   
    return `
                <ul class="bascet-list">
                    <h4 class="bascet-product-name">${dish.name}</h4>
                    <section class="bascet-product">
                        <div class="bascet-count">
                            <button onclick="subtractItem(${i})" class="subtract-count-bascet" data-index="${i}">-</button>
                            <p>${dish.count}</p>
                            <button onclick="addItem(${i})" class="add-count-bascet" data-index="${i}">+</button>
                        </div>
                        <div class="bascet-price">
                            <p class="my-dishes-price">${price} €</p>
                            <button onclick="deleteItem(${i})" class="delete-button" data-index="${i}">&#128465;</button>
                        </div>
                    </section>
                </ul>
    
    `;

}

function generateTotalTemplate() {

    return `
    
      <section class="total-price">
                <div class="subtotal">
                    <p>Zwischensumme</p>
                    <P class="subtotal-value">0.00 €</P>
                </div>
                <div class="shipping-costs">
                    <p>Versandkosten</p>
                    <P class="shipping-value">4.99 €</P>
                </div>
                   
                 <div class="total-cost">
                    <p>Gesamtkosten</p>
                    <P class="total-value">4.99 €</P>
                </div>
            </section>
            <button class="order-button" role="button"><span class="text" onclick="showOrderDialog()">Jetzt Bestellen</span></button>
            `;

}
