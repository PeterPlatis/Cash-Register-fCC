let price = 1.87;
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
const customerCash = document.getElementById('cash');
const purchaseButton = document.getElementById('purchase-btn');
const cashDrawer = document.getElementById("cash-drawer");
const change = document.getElementById("change-due");

const values = [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100];

total.textContent = `Total: $${price}`;

const displayMoneyInDiv = (divElement, array, titleText) => {
    divElement.innerHTML = `<p class="div-title">${titleText}</p>`;

    for (let i = 0; i < array.length; i++) {
        divElement.innerHTML += `<p class="money">${array[i][0]}: <span class="right">$ ${array[i][1]}</span></p>`;
    }
};

displayMoneyInDiv(cashDrawer, cid, "Change In<br> Drawer:");
displayMoneyInDiv(
    change,
    cid,
    `Status: <span style="color:blue;">INSUFFICIENT_FUNDS</span>`
);

const totalOfArray = (array) => array.reduce((total, el) => total + el[1],0).toFixed(2);

