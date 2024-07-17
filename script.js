let price = 1.87;
// let price = 19.5;
let cid = [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100],
];

const total = document.getElementById("total-div");
const customerCash = document.getElementById("cash");
const purchaseButton = document.getElementById("purchase-btn");
const cashDrawer = document.getElementById("cash-drawer");
const change = document.getElementById("change-due");

const values = [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100];

total.textContent = `Total: $${price}`;

const displayMoneyInDiv = (divElement, array, titleText) => {
    divElement.innerHTML = `<p class="div-title">${titleText} </p>`;

    for (let i = 0; i < array.length; i++) {
        divElement.innerHTML += `<p class="money">${array[i][0]}: <span class="right">$${array[i][1]}</span></p>`;
    }
};

const displayErrorInDiv = (divElement, error, titleText) => {
    divElement.innerHTML = `<p class="div-title">${titleText}</p>`;
    divElement.innerHTML += `<p style="font-weight: bold;text-align: center;>${error}<p>`;
};

displayMoneyInDiv(cashDrawer, cid, "Change In<br> Drawer:");
displayMoneyInDiv(change, [], `Status <br><span style="color:blue">sdf</span>`);

// displayMoneyInDiv(change, [], `Status: <span style="color:blue;;">INSUFFICIENT_FUNDS</span>`);

const totalOfArray = (array) =>
    array.reduce((total, el) => total + el[1], 0).toFixed(2);

function findChange(arr, values, price) {
    let changeOwed = parseFloat(customerCash.value) - price;
    if (changeOwed < 0) {
        alert("Customer does not have enough money to purchase the item");
        return;
    }

    if (changeOwed === 0) {
        change.innerHTML = `<p class="div-title">No change due - customer paid with exact cash</p>`;
        return;
    }
    const changeTemplate = [
        ["PENNY", 0],
        ["NICKEL", 0],
        ["DIME", 0],
        ["QUARTER", 0],
        ["ONE", 0],
        ["FIVE", 0],
        ["TEN", 0],
        ["TWENTY", 0],
        ["ONE HUNDRED", 0],
    ];

    for (let i = 8; i >= 0; i--) {
        let count = Math.floor(changeOwed / values[i]);
        
        if (count > 0) {
            if (arr[i][1] >= count * values[i]) {
                changeTemplate[i][1] = count * values[i];
                changeOwed -= count * values[i];
                arr[i][1] -= count * values[i];
            } else {
                changeTemplate[i][1] = arr[i][1];
                changeOwed -= arr[i][1];
                arr[i][1] = 0;
            }
        }
        changeOwed = parseFloat(changeOwed.toFixed(2));
    }
    const changeArr = changeTemplate.filter((el) => el[1] > 0).reverse();
    

    displayMoneyInDiv(
        change,
        changeArr,
        `Status: <br><span style="color:#66ff00;font-size:2rem">OPEN</span>`
    );
    console.log(change.value)
}
purchaseButton.addEventListener("click", () => {
    findChange(cid, values, price);
    displayMoneyInDiv(cashDrawer, cid, "Change In<br> Drawer:");
});
