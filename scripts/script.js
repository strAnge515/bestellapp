
let bascetContent = document.getElementById("bascet-content");



function init() {
    getFromLocalStorage();
    generateTemplate();
    setButtonListeners(".add-count");
    generateTotalTemplate();


}

function showBascetItems() {
    bascetContent.innerHTML = ""
    for (let i = 0; i < myDishes.length; i++) {
        if (myDishes[i].count > 0) {
            generateBascetTemplate(i);

        }
    }
    setButtonListeners(".add-count-bascet");
    setButtonListeners(".subtract-count-bascet");
    setButtonListeners(".delete-button");



}

function setButtonListeners(selector) {
    const buttons = document.querySelectorAll(selector);
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const index = button.dataset.index;

            switch (selector) {
                case ".add-count":
                case ".add-count-bascet":
                    itemAmount(index, 1);

                    break;
                case ".subtract-count-bascet":
                    itemAmount(index, -1);
                    break
                case ".delete-button":
                    itemAmount(index, -myDishes[index].count);
                    break;
            }
        })
    })
}

function itemAmount(index, amount) {
    myDishes[index].count += amount;
    showBascetItems();
    renderTotalPrice();
    localStorage.setItem("myDishes", JSON.stringify(myDishes));
}

function getFromLocalStorage() {
    const savedDishes = localStorage.getItem("myDishes");
    if (savedDishes) {
        myDishes = JSON.parse(savedDishes);
    }
    showBascetItems();
}

function myDishesPrice(dish) {
    let count = ((dish.price) * (dish.count)).toFixed(2);
    return count;
}

function calculateSubtotal(dishes) {
    let subtotal = 0;

    for (const dish of dishes) {
        subtotal += (dish.price) * (dish.count)
    }
    return subtotal;
}

function calculateShipping(subtotal) {
    let shipping = 4.99;
    if (subtotal >= 20) {
        shipping = 0;
    }
    return shipping;
}

function calculateTotal(subtotal, shipping) {
    return subtotal + shipping;
}

function renderBasket() {
    const content = document.getElementById("bascet-content");
    content.innerHTML = "";

    for (let i = 0; i < myDishes.length; i++) {
        if (myDishes[i].count > 0) {
            generateBascetTemplate(i);
        }
    }

}

function renderTotalPrice() {
    const subtotal = calculateSubtotal(myDishes);
    const shipping = calculateShipping(subtotal);
    const total = calculateTotal(subtotal, shipping);

    document.getElementById("subtotal-value").textContent = subtotal.toFixed(2) + " €";
    document.getElementById("shipping-value").textContent = shipping.toFixed(2) + " €";
    document.getElementById("total-value").textContent = total.toFixed(2) + " €";
    
}










