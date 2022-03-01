const authorityUser = async () => (await fetch("/api/user")).json();
const allUsers = async () => (await fetch("/api/admin")).json();

//**********************************************************************************************************************

let userTableInput = document.getElementsByClassName("tbodyInputTable");
allUsers().then(user => {
    let temp = ``;

    for (let i = 0; i < user.length; i++) {

        temp += `
<div aria-hidden="true" aria-labelledby="exampleModalLabel"
     class="modal fade"
     id="editModal${user[i]["id"]}">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="editModalLabel">Edit user</h5>
                <button class="close" data-dismiss="modal" type="button">
                </button>
            </div>
            <form id="formEdit${user[i]["id"]}">
                <div class="modal-body col-md text-center">
                    <br>
                    <input class="form-control" id="id"
                           name="id" type="hidden"
                           value="${user[i]["id"]}"/>
                    <br>
                    <label for="name"><b>Name</b></label>
                    <input class="form-control" id="name"
                           maxlength="35" minlength="3"
                           name="Name" type="text"
                           value="${user[i]["name"]}"/>
                    <br>
                    <label for="lastname"><b>Last Name</b></label>
                    <input class="form-control" id="lastname"
                           maxlength="35" minlength="3"
                           name="lastName" type="text"
                           value="${user[i]["lastName"]}"/>
                    <br>
                    <label for="age"><b>Age</b></label>
                    <input class="form-control" id="age"
                           max="200" min="1"
                           name="age" type="number"
                           value="${user[i]["age"]}"/>
                    <br>
                    <label for="username"><b>Username</b></label>
                    <input class="form-control" id="username"
                           name="username"
                           value="${user[i]["username"]}"
                           type="text"/>
                    <br>
                    <label for="password"><b>Password</b></label>
                    <input class="form-control" id="password"
                           required name="password"
                           type="password"
                           value="${user[i]["password"]}"/>
                           <br>
                            <select class="form-control form-control-sm" id="roles"
                            multiple name="rol">
                           `
        for (let j = 0; j < user[i]["roles"].length; j++) {
            temp += `
                <option selected value="${user[i]["roles"][j]["roleId"]}">
                    ${user[i]["roles"][j]["name"]}
                </option>
                `
        }
        temp += `
                    </select>
                    <br><br>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary" type="submit">
                        Edit
                    </button>
                    <button class="btn btn-secondary" data-dismiss="modal"
                            type="button">Close
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
`;

//**********************************************************************************************************************


    }
    temp += `</tr>`;
    userTableInput[0].innerHTML = temp;

    let formEdit = document.getElementById("formEdit15");
    console.log(new FormData(formEdit))
})


