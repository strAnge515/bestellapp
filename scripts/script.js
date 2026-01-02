

const mobileBascetContent = document.getElementById("mobile-bascet-content");
const mobileTotalContainer = document.getElementById("mobile-total-container");



function init() {
    getFromLocalStorage();
    renderDishes();
    renderTotalTemplate("total-price-container");
    
    renderTotalPrice();

    document.getElementById("close-order-dialog")
        .addEventListener("click", closeOrderDialog);

}



function renderDishes() {
    let content = document.getElementById("main-content");
    content.innerHTML = "";
    for (let i = 0; i < myDishes.length; i++) {
        content.innerHTML += generateTemplate(i);
    }
}

function renderBascetItems(containerId) {
    let container = document.getElementById(containerId);
    container.innerHTML = "";

    for (let i = 0; i < myDishes.length; i++) {
        const dish = myDishes[i];

        if (dish.count > 0) {
            const price = myDishesPrice(dish);
            container.innerHTML += generateBascetTemplate(dish, price, i);
        }
    }
}

function renderTotalTemplate(totalCountContainer) {
    let content = document.getElementById(totalCountContainer);
    content.innerHTML = "";
    content.innerHTML = generateTotalTemplate();
}



function subtractItem(i) {
    myDishes[i].count -= 1;
    renderBascetItems("bascet-content");
    renderBascetItems("mobile-bascet-content");
    renderTotalPrice();
}

function addItem(i) {
    myDishes[i].count += 1;
    renderBascetItems("bascet-content");
    renderBascetItems("mobile-bascet-content");
    renderTotalPrice();
}


function deleteItem(i) {
    myDishes[i].count = 0;
    renderBascetItems("bascet-content");
    renderBascetItems("mobile-bascet-content");
    renderTotalPrice();
}





function itemAmount(index, amount) {
    myDishes[index].count += amount;
    renderBascetItems("bascet-content");
    renderBascetItems("mobile-bascet-content");
    renderTotalPrice();
    localStorage.setItem("myDishes", JSON.stringify(myDishes));
}

function getFromLocalStorage() {
    const savedDishes = localStorage.getItem("myDishes");
    if (savedDishes) {
        myDishes = JSON.parse(savedDishes);
    }
    renderBascetItems("bascet-content");
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

    const updateValue = (selector, value) => {
        document.querySelectorAll(selector).forEach(el => el.textContent = value.toFixed(2) + " €");
    }

    updateValue(".subtotal-value", subtotal);
    updateValue(".shipping-value", shipping);
    updateValue(".total-value", total);
}

function showDialog() {
    document.getElementById("mobile-bascet").showModal();
    renderBascetItems("mobile-bascet-content");
    renderTotalTemplate("mobile-total-container");
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
    renderBascetItems("bascet-content");
    renderBascetItems("mobile-bascet-content");
    renderTotalPrice();
    document.getElementById("mobile-bascet").close();
    document.getElementById("order-success-dialog").showModal();

}

function closeOrderDialog() {
    document.getElementById("order-success-dialog").close();
}












