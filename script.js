let price = 3.26;

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

function displayCashInDrawer() {
    cashDrawer.innerHTML = `<p class="div-title">Cash In Drawer</p>`;
    cid.forEach((el) => {
        cashDrawer.innerHTML += `<p class="money">${el[0]}: $${el[1]}</p>`;
    });
}

displayCashInDrawer();

function calculateChange() {
    let changeOwed = (parseFloat(customerCash.value) - price).toFixed(2);
    if (isNaN(parseFloat(customerCash.value))) {
        return;
    }
    if (changeOwed < 0) {
        alert("Customer does not have enough money to purchase the item");
        return;
    }

    if (changeOwed == 0) {
        change.innerHTML = `<h2 class="error">No change due - customer paid with exact cash</h2>`;
        return;
    }

    let changeArr = [
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

    cid.reverse().forEach((el, idx) => {
        let i = cid.length - 1 - idx;

        let howManyTimes = Math.floor(changeOwed / values[i]);
        let howManyTimesItFits = Math.floor(el[1] / values[i]);
        let diff =
            howManyTimesItFits > howManyTimes
                ? howManyTimes
                : howManyTimesItFits;

        let changeAccumulator = (diff * values[i]);

        if (diff >= 1) {
            changeArr[i][1] += changeAccumulator;
            changeOwed -= changeAccumulator;
            el[1] -= changeAccumulator;
            changeOwed = changeOwed.toFixed(2);
        }
    });
    if (changeOwed > 0) {
        change.innerHTML = `<h2 class="error">Status: INSUFFICIENT_FUNDS</h2>`;
        return;
    }
    cid.reverse();

    changeArr = changeArr.filter((el) => el[1] > 0).reverse();

    if (findTotal(cid) === 0) {
        change.innerHTML = `<p class="div-title">Status: Closed</p>`;
    } else {
        change.innerHTML = `<p class="div-title">Status: Open</p>`;
    }

    changeArr.forEach((el) => {
        change.innerHTML += `<p class="money">${el[0]}: $${el[1]}</p>`;
    });

    displayCashInDrawer();
}

function findTotal(arr) {
    return arr.reduce((acc, el) => acc += el[1],0);
}

purchaseButton.addEventListener("click", calculateChange);
