'use strict';
let ProductsArr = [];

function addProduct() {
    //giving values variables
    let productName = document.getElementById("productName").value;
    let productCategory = document.getElementById("productCategory").value;
    let productPrice = document.getElementById("productPrice").value;

    //checking if the input is empty
    if (productName == "" || productCategory == "" || productPrice == "") {
        alert("יש למלא את כל השדות");
        return;
    }

    //checking if the product already exists
    if (productExists(productName)) {
        alert("המוצר כבר קיים ברשימה");
        return;
    }
    //creating a new product and adding it to the array
    let newProduct = { name: productName, category: productCategory, price: productPrice };
    ProductsArr.push(newProduct);

    //adding the product to the list
    document.getElementById("productList").innerHTML += `<li>שם:${productName}, קטגוריה:${productCategory}, מחיר:${productPrice}&#8362 <button onclick="removeProduct('${productName}')">מחק</button></li>`

    //clearing the inputs
    document.getElementById("productName").value = "";
    document.getElementById("productCategory").value = "";
    document.getElementById("productPrice").value = "";
}

//checking if the product already exists
function productExists(productName) {
    for (let product of ProductsArr) {
        if (product.name === productName) return true;
    }
    return false;
}

function loadList() {
    for (let product of ProductsArr) {
        document.getElementById("productList").innerHTML += `<li>שם:${product.name}, קטגוריה:${product.category}, מחיר:${product.price}&#8362 <button onclick="removeProduct('${product.name}')">מחק</button></li>`
    }
}

function removeProduct(productName) {
    ProductsArr = ProductsArr.filter(product => product.name != productName);
    document.getElementById("productList").innerHTML = "";
    loadList();
}

function saveList() {
    if (typeof Storage === "undefined") {
        alert("מצטערים הדפדפן אינו תומך בשמירת נתונים מקומיים");
    } else {
        localStorage.setItem("ProductsArr", JSON.stringify(ProductsArr));
        alert("הרשימה נשמרה בהצלחה");
    }
}

function loadLastStorageSave() {
    let savedProducts = localStorage.getItem("ProductsArr");
    if (savedProducts) {
        ProductsArr = JSON.parse(savedProducts);
        loadList();
    }

}