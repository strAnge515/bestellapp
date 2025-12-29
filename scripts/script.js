

const mobileBascetContent = document.getElementById("mobile-bascet-content");
const mobileTotalContainer = document.getElementById("mobile-total-container");



function init() {
    getFromLocalStorage();
    generateTemplate();
    generateTotalTemplate("total-price-container");
    initEventDelegation();
    renderTotalPrice();

    document.getElementById("close-order-dialog")
        .addEventListener("click", closeOrderDialog);

}

function showBascetItems(containerId) {
    let container = document.getElementById(containerId);
    container.innerHTML = "";
    for (let i = 0; i < myDishes.length; i++) {
        if (myDishes[i].count > 0) {
            container.innerHTML += generateBascetTemplate(i);

        }
    }

}

function initEventDelegation() {
    document.getElementById("main-content").addEventListener("click", (event) => {
        const button = event.target;
        if (!button.classList.contains("add-count")) return;

        const index = button.dataset.index;
        itemAmount(index, 1);
    });
    document.getElementById("bascet-content").addEventListener("click", (event) => {
        handleBasketClick(event);
    });
    document.getElementById("mobile-bascet-content").addEventListener("click", (event) => {
        handleBasketClick(event);
    });
}

function handleBasketClick(event) {
    const button = event.target;
    const index = button.dataset.index;

    if (!index) return;

    if (button.classList.contains("add-count-bascet")) {
        itemAmount(index, 1);
    }

    if (button.classList.contains("subtract-count-bascet")) {
        itemAmount(index, -1);
    }

    if (button.classList.contains("delete-button")) {
        itemAmount(index, -myDishes[index].count);
    }


}




function itemAmount(index, amount) {
    myDishes[index].count += amount;
    showBascetItems("bascet-content");
    showBascetItems("mobile-bascet-content");
    renderTotalPrice();
    localStorage.setItem("myDishes", JSON.stringify(myDishes));
}

function getFromLocalStorage() {
    const savedDishes = localStorage.getItem("myDishes");
    if (savedDishes) {
        myDishes = JSON.parse(savedDishes);
    }
    showBascetItems("bascet-content");
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

function renderTotalPrice() {
    const subtotal = calculateSubtotal(myDishes);
    const shipping = calculateShipping(subtotal);
    const total = calculateTotal(subtotal, shipping);

    document.querySelectorAll(".subtotal-value").forEach(element => { element.textContent = subtotal.toFixed(2) + " €"; });
    document.querySelectorAll(".shipping-value").forEach(element => { element.textContent = shipping.toFixed(2) + " €"; });
    document.querySelectorAll(".total-value").forEach(element => { element.textContent = total.toFixed(2) + " €"; });
}

function showDialog() {
    document.getElementById("mobile-bascet").showModal();
    showBascetItems("mobile-bascet-content");
    generateTotalTemplate("mobile-total-container");
    renderTotalPrice();
}

function closeDialog() {
    document.getElementById("mobile-bascet").close();
}


function showOrderDialog() {
    myDishes.forEach(dish => {
        dish.count = 0;
    });
    localStorage.setItem("myDishes", JSON.stringify(myDishes));
    showBascetItems("bascet-content");
    showBascetItems("mobile-bascet-content");
    renderTotalPrice();
    document.getElementById("mobile-bascet").close();
    document.getElementById("order-success-dialog").showModal();

}

function closeOrderDialog() {
    document.getElementById("order-success-dialog").close();
}












