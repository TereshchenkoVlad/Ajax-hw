const API = axios.create({
    baseURL: "https://test-users-api.herokuapp.com/",
    headers: {
        "Content-Type": "application/json"
    }
});



const addUser = async () => {
    const nameUser = document.querySelector("#name").value;
    const ageUser = document.querySelector("#age").value;
    API.post("users/", {
        name: nameUser,
        age: ageUser
    }).then((res) => {
        addNewUserCard(res.data.data);
    });
    
};
    const createUser = document.querySelector("#createUserBtn");
    createUser.addEventListener("click", addUser);


    const addNewUserCard = (element) => {
        const container = document.querySelector(".wrapper");
        const block = document.createElement("div");
        block.classList.add("block");
        block.innerHTML = `
            <h3>${element.name}</h3>
            <h4>${element.age}</h4>
        `;

        const removeImg = document.createElement("img");
        removeImg.classList.add("deleteImg");
        removeImg.src = "img/delete.png";
        removeImg.addEventListener("click", ()=>{
            block.classList.add("hide-right");
            setTimeout(()=>{
                deleteUser(element.id || element._id, block);
            }, 300)
        });

        block.classList.add("slide-right");
        
        block.append(removeImg);
        container.append(block);
    };

const getUsers = async () => {
    return await API.get("users/")
    .then((res) => {
        return res.data.data;
    })
    .catch((err) => {
        console.log("Couldn't loda users:", err);
        return [];
    })
};


const deleteUser = async (userId, block) => {
    try {
        const res = await API.delete(`users/${userId}`);
        if(res.data.status !== 200){
            throw new Error();
        } else {
            block.remove();
        }
            
    } catch (err) {
        console.log("Couldn't delete user:", err)
    }

};



const renderUsers = async (users) => {
    users.forEach(element => {
        addNewUserCard(element);
    });
};


const loadUsers  = async () => {
    const users = await getUsers();
    
    renderUsers(users);
};

loadUsers();



