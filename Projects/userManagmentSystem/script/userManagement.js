let users = [];

window.onload = function () {
    if (typeof (Storage) !== "undefined") {
        users = JSON.parse(localStorage.getItem("users"));
        if (users == null) {
            users = [];
        }
        document.getElementById("userData").innerHTML = "";
        for (let user of users) {
            updateTable(user);
        }
    } else {
        alert("מצטערים הדפדפן אינו תומך בשמירת נתונים מקומיים")
    }
}

function registerUser() {

    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let emailAddress = document.getElementById("emailAddress").value;
    let password = document.getElementById("password").value;
    if (firstName == "" || lastName == "" || emailAddress == "" || password == "") {
        alert("please fill all the fields");
        return;
    }
    class User {
        constructor(firstName, lastName, emailAddress, password) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.emailAddress = emailAddress;
            this.password = password;
            this.status = "offline";
        }
    }


    let newUser = new User(firstName, lastName, emailAddress, password);
    users.push(newUser);
    console.log(users);
    updateTable(newUser);

    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("emailAddress").value = "";
    document.getElementById("password").value = "";

    localStorage.setItem("users", JSON.stringify(users));
}

function updateTable(newUser) {
    document.getElementById("userData").innerHTML += `<tr>
    <td>${newUser.firstName}</td>
    <td>${newUser.lastName}</td>    
    <td>${newUser.emailAddress}</td>
    <td>${newUser.password}</td>
    <td>${newUser.status}</td>
    <td><button class="btn btn-warning" onclick="disconnectUser('${newUser.emailAddress}')">התנתקות</button></td>
    <td><button class="btn btn-danger" onclick="deleteUser('${newUser.emailAddress}')">מחיקה</button></td>
    <td><button class="btn btn-info" onclick="editUser('${newUser.emailAddress}')">עריכה</button></td>
    </tr>`
}

function loginUser() {
    let emailLogin = document.getElementById("emailLogin").value;
    let passwordLogin = document.getElementById("passwordLogin").value;
    let user = users.find((user) => user.emailAddress == emailLogin);
    if (user && user.password == passwordLogin) {
        alert("user logged in");
        user.status = "online";
        localStorage.setItem("users", JSON.stringify(users));
        document.getElementById("userData").innerHTML = "";
        for (let user of users) {
            updateTable(user);
        }
    } else {
        alert("invalid username or password");
    }

    document.getElementById("emailLogin").value = "";
    document.getElementById("passwordLogin").value = "";
}

function deleteUser(emailAddress) {
    users = users.filter((user) => user.emailAddress != emailAddress);
    console.log(users);
    localStorage.setItem("users", JSON.stringify(users));
    document.getElementById("userData").innerHTML = "";
    for (let user of users) {
        updateTable(user);
    }
}

function disconnectUser(emailAddress) {
    let user = users.find((user) => user.emailAddress == emailAddress);
    user.status = "offline";
    console.log(users);
    localStorage.setItem("users", JSON.stringify(users));
    document.getElementById("userData").innerHTML = "";
    for (let user of users) {
        updateTable(user);
    }
}

//edit user
function editUser(emailAddress) {
    let user = users.find((user) => user.emailAddress == emailAddress);


    document.getElementById("userData").innerHTML = "";

    for (user of users) {
        if (user.emailAddress == emailAddress) {
            document.getElementById("userData").innerHTML += `<tr>
            <td><input type="text" id="editFirstName" value="${user.firstName}" class="w-20"></td>
            <td><input type="text" id="editLastName" value="${user.lastName}"></td>    
            <td><input type="text" id="editEmailAddress" value="${user.emailAddress}"></td>
            <td><input type="text" id="editPassword" value="${user.password}"></td>
            <td>${user.status}</td>
            <td><button class="btn btn-primary" onclick="saveChanges('${user.emailAddress}')">שמור</button></td>
            <td><button class="btn btn-warning" onclick="cancelChanges()">ביטול</button></td>
            <td><button class="btn btn-danger" onclick="deleteUser('${user.emailAddress}')">מחיקה</button></td>
            </tr>`
        } else {
            updateTable(user)
        }
    }

}

//save changes function
function saveChanges(emailAddress) {
    let user = users.find((user) => user.emailAddress == emailAddress);

    let newFirstName = document.getElementById("editFirstName").value;
    let newLastName = document.getElementById("editLastName").value;
    let newEmailAddress = document.getElementById("editEmailAddress").value;
    let newPassword = document.getElementById("editPassword").value;

    if (newFirstName == "" || newLastName == "" || newEmailAddress == "" || newPassword == "") {
        alert("please fill all the fields");
        return;
    }

    user.firstName = newFirstName;
    user.lastName = newLastName;
    user.emailAddress = newEmailAddress;
    user.password = newPassword;

    localStorage.setItem("users", JSON.stringify(users));
    document.getElementById("userData").innerHTML = "";
    for (let user of users) {
        updateTable(user);
    }
}

function cancelChanges() {
    document.getElementById("userData").innerHTML = "";
    for (let user of users) {
        updateTable(user);
    }
}