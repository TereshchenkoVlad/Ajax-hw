// const API = axios.create({
//     baseURL: "https://test-users-api.herokuapp.com/",
//     headers: {
//         "Content-Type": "application/json"
//     }
// });

const USERS_URL = "https://test-users-api.herokuapp.com/users/";
class UserList {
    users = [];
    constructor(){
        
        this.loadUsers()
        .then((res) => {
            this.users = res;
            this.users.forEach(this.renderUserCard);
            console.log(this.users);
        });
        
    }


    editUser(userId){
        return axios.put(`${USERS_URL}${userId}`)
        .then((res) => {
            this.users.push(res.data.data);
            return res.data.data;
        });
    }
    

    deleteUser(userId){
        return axios.delete(`${USERS_URL}${userId}`)
        .then((res) => {
            this.users.push(res.data.data);
            return res.data.data;
        });
    }

    addUser(user){
        return axios.post(USERS_URL, user)
        .then((res) => {
            this.users.push(res.data.data);
            return res.data.data;
        });

    }

    loadUsers(){
        return axios.get(USERS_URL)
        .then((res)=> res.data.data);
    }

     renderUserCard = (element) => {
        const card = new Card(element);
        card.render();
        card.onDelete = (userId) => {
            this.deleteUser(userId)
                .then((res) => {
                    card.destroyCard();
                });
        };
    };
}


const newUser = new UserList();

function addUser(e) {
    const name = document.querySelector("#name").value;
    const age = document.querySelector("#age").value;
    newUser.addUser({
        name,
        age
    })
    .then(newUser.renderUserCard);
};

