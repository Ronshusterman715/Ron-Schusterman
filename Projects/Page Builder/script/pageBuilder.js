'use stict';


let newElement;
let elementType;
let elementCounter = 0;
function createNewElement() {
    elementType = document.getElementById("elementType").value;
    newElement = document.createElement(elementType);
    newElement.style.height = document.getElementById("height").value + "px";
    newElement.style.width = document.getElementById("width").value + "px";
    newElement.style.borderRadius = document.getElementById("borderRadius").value + "px";
    newElement.style.backgroundColor = document.getElementById("backgroundColor").value;
    newElement.style.boxShadow = document.getElementById("boxShadowX").value + "px " + document.getElementById("boxShadowY").value + "px " + document.getElementById("boxShadowColor").value;
    newElement.style.margin = document.getElementById("margin").value + "px";
    newElement.style.padding = document.getElementById("padding").value + "px";
    newElement.innerText = document.getElementById("textArea").value;
    newElement.style.color = document.getElementById("textColor").value;
    newElement.style.fontSize = document.getElementById("textSize").value + "px";
    newElement.style.border = document.getElementById("borderWidth").value + "px " + document.getElementById("borderStyle").value + " " + document.getElementById("borderColor").value;
    elementCounter++;
    newElement.id = `${elementType}-${elementCounter}`
    let createdAt = new Date().toLocaleString('he-IL', { timeZone: 'Asia/Jerusalem' });
    newElement.title = `type: ${elementType},size: ${newElement.style.width} x ${newElement.style.height},id: ${newElement.id}, created at: ${createdAt}`;
    document.getElementById("page").appendChild(newElement);
    resetForm();
    saveToLocalStorage()
};

function resetForm() {
    document.getElementById("height").value = "";
    document.getElementById("width").value = "";
    document.getElementById("borderRadius").value = "";
    document.getElementById("backgroundColor").value = "";
    document.getElementById("boxShadowX").value = "";
    document.getElementById("boxShadowY").value = "";
    document.getElementById("boxShadowColor").value = "";
    document.getElementById("margin").value = "";
    document.getElementById("padding").value = "";
    document.getElementById("textArea").value = "";
    document.getElementById("textColor").value = "";
    document.getElementById("textSize").value = "";
    document.getElementById("borderWidth").value = "";
    document.getElementById("borderStyle").value = "";
    document.getElementById("borderColor").value = "";
    document.getElementById("elementType").value = "h1";
};

function saveToLocalStorage() {
    if (typeof (Storage) !== "undefined") {
        pageContent = document.getElementById("page").innerHTML;
        localStorage.setItem("pageContent", pageContent);
        alert("מסך נשמר")
    }
};

function loadSavedPage() {
    savedPage = localStorage.getItem("pageContent")
    if (savedPage) {
        document.getElementById("page").innerHTML = savedPage;
    }
}

function clearPage() {
    document.getElementById("page").innerHTML = "";
    localStorage.removeItem("pageContent")
};


function saveToLocalStorage() {
    if (typeof (Storage) !== "undefined") {
        pageContent = document.getElementById("page").innerHTML;
        localStorage.setItem("pageContent", pageContent);
        document.getElementById("alert").innerHTML = "מסך נשמר"
        setTimeout(() => {
            document.getElementById("alert").innerHTML = ""
        }, 3000);
    }
};

function loadSavedPage() {
    savedPage = localStorage.getItem("pageContent")
    if (savedPage) {
        document.getElementById("page").innerHTML = savedPage;
    }
}

function clearPage() {
    document.getElementById("page").innerHTML = "";
    localStorage.removeItem("pageContent")
};

