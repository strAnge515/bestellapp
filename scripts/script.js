
let bascetContent = document.getElementById("bascet-content");



function init() {
    getFromLocalStorage();
    generateTemplate();
    setButtonListeners(".add-count");

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
    myDishes[index].count = myDishes[index].count + amount;
    showBascetItems();
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








