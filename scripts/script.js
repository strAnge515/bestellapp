
let bascetContent = document.getElementById("bascet-content");



function init() {
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
}



