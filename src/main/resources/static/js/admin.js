const authorityUser = async () => (await fetch("/api/user")).json();
const allUsers = async () => (await fetch("/api/admin")).json();
const allRoles = async () => (await fetch("/api/admin/roles")).json();

function createTable() {

}


let main = async () => {
    let authUser = await authorityUser();
    const userRoles = authUser["roles"];

    document.querySelector(".navbar-brand")
        .childNodes[3].firstChild.textContent = authUser["username"];

    if (userRoles.length !== 0) {
        let temp = ``;
        for (const userRolesKey of userRoles) {
            temp += userRolesKey["name"] + ` `;
        }
        document.querySelector(".navbar-brand")
            .childNodes[7].textContent = temp;
    }

    let roles = await allRoles();
    let newUser = document.getElementsByClassName("col-md bg-white border")[0];
    let tempNew = `
    <form align="center" class="offset-md-4 col-md-3 mt-4 mb-4"
             id="newUserForm">
           <label for="firstname3"><b>Name</b></label>
           <input class="form-control" id="firstname3" maxlength="35" minlength="3"
                  required type="text" name="name"/>
           <br>
           <label for="lastname3"><b>Last Name</b></label>
           <input class="form-control" id="lastname3" maxlength="35" minlength="3"
                  required type="text" name="lastName"/>
           <br>
           <label for="age3"><b>Age</b></label>
           <input class="form-control" id="age3" max="100" min="1" type="number"
           name="age"/>
           <br>
           <label for="username3"><b>Username</b></label>
           <input class="form-control" id="username3" required type="text"
           name="username"/>
           <br>
           <label for="password3"><b>Password</b></label>
           <input class="form-control" id="password3" max="15" min="1" required
                  type="password" name="password"/>
           <br>
           <label for="roles3"><b>Role</b></label>
           <select class="form-control form-control-sm" id="roles3"
                   multiple name="roles">`
    for (const role of roles) {
        tempNew += `
                    <option selected
                            value='{"roleId": "${role["roleId"]}","name": "${role["name"]}","authority": "${role["authority"]}"}'>
                        ${role["name"]}
                    </option>`
    }
    tempNew += `</select>
           <br>
           <button class="btn btn-success btn-lg" type="submit">Add new user
           </button>
       </form>`
    newUser.innerHTML = tempNew;

    let formNew = document.getElementById(`newUserForm`)
    formNew.onsubmit = async (e) => {
        e.preventDefault();
        // document.getElementById(`closeDelete${user["id"]}`).click();
        const form = new FormData(formNew);
        let newUser = {};

        for (const [name, value] of form) {
            console.log(name + " " + value)
            if (!(name === "roles")) {
                newUser[name] = value;
            } else if (newUser[name] === undefined) {
                newUser[name] = [JSON.parse(value)];
            } else {
                newUser[name][1] = JSON.parse(value);
            }
        }

        let response = await (await fetch("api/admin", {
                method: "POST",
                headers:
                    {
                        "Content-Type": "application/json"
                    },
                body: JSON.stringify(newUser)
            }
        )).json();
    }


//**********************************************************************************************************************


    let getUsers = await allUsers();
    let tbodyTable = document.querySelector(".table").childNodes[1];

    for (let i = 0; i < getUsers.length; i++) {

        const user = getUsers[i];

        let trTable = document.createElement("tr");
        trTable.setAttribute("class", `user${user["id"]}`)

        let userId = document.createElement("td");
        userId.textContent = user["id"];
        trTable.appendChild(userId);

        let userName = document.createElement("td");
        userName.textContent = user["name"];
        trTable.appendChild(userName);

        let userLastName = document.createElement("td");
        userLastName.textContent = user["lastName"];
        trTable.appendChild(userLastName);

        let userAge = document.createElement("td");
        userAge.textContent = user["age"];
        trTable.appendChild(userAge);

        let userUsername = document.createElement("td");
        userUsername.textContent = user["username"];
        trTable.appendChild(userUsername);

        let userRoles = document.createElement("td");
        let temp = ``;
        for (let j = 0; j < user["roles"].length; j++) {
            temp += `<li>` + user["roles"][j]["name"] + `</li>`;
        }
        userRoles.innerHTML = temp;
        temp = ``;
        trTable.appendChild(userRoles);

        let userEditButton = document.createElement("td");
        userEditButton.innerHTML =
            `
    <a class="btn btn-sm btn-primary" data-target="#editModal${user["id"]}"
    data-toggle="modal"
    type="button">Edit</a>`;
        trTable.appendChild(userEditButton);

        let userDeleteButton = document.createElement("td");
        let delModal = document.createElement("a");
        delModal.setAttribute("class", "btn btn-sm btn-danger");
        delModal.setAttribute("data-target", `#deleteModal${user["id"]}`);
        delModal.setAttribute("data-toggle", "modal");
        delModal.setAttribute("type", "button");
        delModal.textContent = "Delete";
        userDeleteButton.appendChild(delModal);
        trTable.appendChild(userDeleteButton);
        tbodyTable.appendChild(trTable);


        let userTr = document.getElementsByClassName(`user${user["id"]}`)[0];
        temp =
            `
<div aria-hidden="true" aria-labelledby="exampleModalLabel"
     class="modal fade"
     id="editModal${user["id"]}">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="editModalLabel">Edit user</h5>
                <button class="close" data-dismiss="modal" type="button">
                </button>
            </div>
            <form id="formEdit${user["id"]}">
                <div class="modal-body col-md text-center">
                    <input class="form-control" id="id${user["id"]}"
                           name="id" type="hidden"
                           value="${user["id"]}"/>
                    <br>
                    <label for="name${user["id"]}"><b>Name</b></label>
                    <input class="form-control" id="name${user["id"]}"
                           maxlength="35" minlength="3"
                           name="name" type="text"
                           value="${user["name"]}"/>
                    <br>
                    <label for="lastname${user["id"]}"><b>Last Name</b></label>
                    <input class="form-control" id="lastname${user["id"]}"
                           maxlength="35" minlength="3"
                           name="lastName" type="text"
                           value="${user["lastName"]}"/>
                    <br>
                    <label for="age${user["id"]}"><b>Age</b></label>
                    <input class="form-control" id="age${user["id"]}"
                           max="200" min="1"
                           name="age" type="number"
                           value="${user["age"]}"/>
                    <br>
                    <label for="username${user["id"]}"><b>Username</b></label>
                    <input class="form-control" id="username${user["id"]}"
                           name="username"
                           value="${user["username"]}"
                           type="text"/>
                    <br>
                    <label for="password${user["id"]}"><b>Password</b></label>
                    <input class="form-control" id="password${user["id"]}"
                           required name="password"
                           type="password"
                           value="${user["password"]}"/>
                           <br>
                    <select class="form-control form-control-sm" id="roles${user["id"]}"
                            multiple name="roles">`;

        for (const role of roles) {
            temp += `
                    <option selected
                            value='{"roleId": "${role["roleId"]}","name": "${role["name"]}","authority": "${role["authority"]}"}'>
                        ${role["name"]}
                    </option>`
        }

        temp += `</select>
                    <br><br>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary" type="submit">
                        Edit
                    </button>
                    <button id="closeEdit${user["id"]}" class="btn btn-secondary" data-dismiss="modal"
                            type="button">Close
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
    `;
        let tempDiv = document.createElement("div");
        tempDiv.innerHTML = temp;
        temp = ``
        userTr.appendChild(tempDiv);


        let formEdit = document.getElementById(`formEdit${user["id"]}`)
        formEdit.onsubmit = async (e) => {
            e.preventDefault();
            document.getElementById(`closeEdit${user["id"]}`).click();
            const form = new FormData(formEdit);
            let putUser = {};

            for (const [name, value] of form) {
                if (!(name === "roles")) {
                    putUser[name] = value;
                } else if (putUser[name] === undefined) {
                    putUser[name] = [JSON.parse(value)];
                } else {
                    putUser[name][1] = JSON.parse(value);
                }
            }

            let response = await (await fetch("api/admin", {
                    method: "PUT",
                    headers:
                        {
                            "Content-Type": "application/json"
                        },
                    body: JSON.stringify(putUser)
                }
            )).json()

            let userTr = document.getElementsByClassName(`user${response["id"]}`)[0];
            userTr.childNodes[1].textContent = response["name"];
            userTr.childNodes[2].textContent = response["lastName"];
            userTr.childNodes[3].textContent = response["age"];
            userTr.childNodes[4].textContent = response["username"];
            userTr.childNodes[5].textContent = ""

            for (let j = 0; j < response["roles"].length; j++) {
                let li = document.createElement("li");
                li.textContent = response["roles"][j]["name"];
                userTr.childNodes[5].appendChild(li)
            }
        }


        userTr = document.getElementsByClassName(`user${user["id"]}`)[0];
        temp =
            `
<div aria-hidden="true" aria-labelledby="exampleModalLabel"
     class="modal fade"
     id="deleteModal${user["id"]}">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="deleteModalLabel">Delete user</h5>
                <button class="close" data-dismiss="modal" type="button">
                </button>
            </div>
            <form id="formDelete${user["id"]}">
                <div class="modal-body col-md text-center">
                    <input class="form-control" id="id${user["id"]}"
                           name="id" type="hidden"
                           value="${user["id"]}"/>
                    <br>
                    <label for="name${user["id"]}"><b>Name</b></label>
                    <input class="form-control" id="name${user["id"]}"
                           maxlength="35" minlength="3" disabled
                           name="name" type="text"
                           value="${user["name"]}"/>
                    <br>
                    <label for="lastname${user["id"]}"><b>Last Name</b></label>
                    <input class="form-control" id="lastname${user["id"]}"
                           maxlength="35" minlength="3" disabled
                           name="lastName" type="text"
                           value="${user["lastName"]}"/>
                    <br>
                    <label for="age${user["id"]}"><b>Age</b></label>
                    <input class="form-control" id="age${user["id"]}"
                           max="200" min="1" disabled
                           name="age" type="number"
                           value="${user["age"]}"/>
                    <br>
                    <label for="username${user["id"]}"><b>Username</b></label>
                    <input class="form-control" id="username${user["id"]}"
                           name="username" disabled
                           value="${user["username"]}"
                           type="text"/>
                    <br>
                    <label for="password${user["id"]}"><b>Password</b></label>
                    <input class="form-control" id="password${user["id"]}"
                           required name="password"
                           type="password" disabled
                           value="${user["password"]}"/>
                           <br>
                    <select class="form-control form-control-sm" id="roles${user["id"]}"
                            multiple name="roles" disabled>`;

        for (const role of roles) {
            temp += `
                    <option selected
                            value='{"roleId": "${role["roleId"]}","name": "${role["name"]}","authority": "${role["authority"]}"}'>
                        ${role["name"]}
                    </option>`
        }

        temp += `</select>
                    <br><br>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary" type="submit">
                        Delete
                    </button>
                    <button id="closeDelete${user["id"]}" class="btn btn-secondary" data-dismiss="modal"
                            type="button">Close
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
    `;
        let tempDeleteDiv = document.createElement("div");
        tempDeleteDiv.innerHTML = temp;
        temp = ``
        userTr.appendChild(tempDeleteDiv);


        let formDelete = document.getElementById(`formDelete${user["id"]}`)
        formDelete.onsubmit = async (e) => {
            e.preventDefault();
            document.getElementById(`closeDelete${user["id"]}`).click();
            const form = new FormData(formDelete);
            let putUser = {};

            for (const [name, value] of form) {
                if (!(name === "roles")) {
                    putUser[name] = value;
                } else if (putUser[name] === undefined) {
                    putUser[name] = [JSON.parse(value)];
                } else {
                    putUser[name][1] = JSON.parse(value);
                }
            }

            let response = await (await fetch("api/admin", {
                    method: "DELETE",
                    headers:
                        {
                            "Content-Type": "application/json"
                        },
                    body: JSON.stringify(putUser)
                }
            )).json();

            document.getElementsByClassName(`user${response["id"]}`)[0].remove();

        }
    }
}
main();