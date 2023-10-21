const USERS= [
    {
    "id": 1,
    "name": "Alice",
    "surname": "Johnson",
    "description": "Software Developer",
    "hobby": "Gaming"
    },
    {
    "id": 2,
    "name": "Bob",
    "surname": "Smith",
    "description": "Designer",
    "hobby": "Painting"
    },
    {
    "id": 3,
    "name": "Charlie",
    "surname": "Brown",
    "description": "Writer",
    "hobby": "Reading"
    },
    {
    "id": 4,
    "name": "David",
    "surname": "Williams",
    "description": "Photographer",
    "hobby": "Photography"
    },
    {
    "id": 5,
    "name": "Eve",
    "surname": "Davis",
    "description": "Musician",
    "hobby": "Playing Instruments"
    },
    {
        "id": 6,
        "name": "Frank",
        "surname": "Miller",
        "description": "Chef",
        "hobby": "Cooking"
    },
    {
        "id": 7,
        "name": "Grace",
        "surname": "Taylor",
        "description": "Teacher",
        "hobby": "Teaching"
    },
    {
        "id": 8,
        "name": "Henry",
        "surname": "Wilson",
        "description": "Engineer",
        "hobby": "Building"
    },
    {
        "id": 9,
        "name": "Isabel",
        "surname": "Anderson",
        "description": "Artist",
        "hobby": "Drawing"
    },
    {
        "id": 10,
        "name": "Jack",
        "surname": "Martinez",
        "description": "Athlete",
        "hobby": "Running"
    },
    {
        "id": 11,
        "name": "Kate",
        "surname": "Lopez",
        "description": "Architect",
        "hobby": "Designing"
    },
    {
        "id": 12,
        "name": "Leo",
        "surname": "Garcia",
        "description": "Music Producer",
        "hobby": "Music Production"
    },
    {
        "id": 13,
        "name": "Mia",
        "surname": "Scott",
        "description": "Journalist",
        "hobby": "Writing"
    },
    {
        "id": 14,
        "name": "Noah",
        "surname": "Adams",
        "description": "Scientist",
        "hobby": "Researching"
    },
    {
        "id": 15,
        "name": "Olivia",
        "surname": "Harris",
        "description": "Lawyer",
        "hobby": "Debating"
    }
]

export const state = () => ({
    users: [...USERS],
    filterUser: null,
    usersPage: [],
    searchedUsers: []
})
  
export const mutations = {
setUsers(state, stateTable) {
    state.usersPage = stateTable;
},
updateUser(state, {userUpdated, index}) {
    state.users[index] = userUpdated;
},
addUser(state, user){
    state.users.push(user);
},
deleteUser(state, index) {
    state.users.splice(index, 1);
},
setFilter(state, text){
    state.filterUser = text
},
searchUsers(state, searchedUsers){
    state.searchedUsers= searchedUsers;
},
};

export const actions = {
    APIUsers(context, dataTable){
        let users = [...context.state.users]
        if (dataTable.sortBy && dataTable.sortDesc !== undefined) {
            const sortMultiplier = dataTable.sortDesc ? 1 : -1;
            users.sort((a, b) => {
                const valueA = typeof a[dataTable.sortBy] === 'string' ? a[dataTable.sortBy].toLowerCase() : a[dataTable.sortBy];
                const valueB = typeof b[dataTable.sortBy] === 'string' ? b[dataTable.sortBy].toLowerCase() : b[dataTable.sortBy];

                if (valueA < valueB) return -1 * sortMultiplier;
                if (valueA > valueB) return 1 * sortMultiplier;
                return 0;
            });
        } else {
            users.sort((a, b) => b.id - a.id);
        }
        const groupSize = dataTable.itemsPerPage;
        const groupIndex = dataTable.page - 1; // Secondo gruppo (considerando che l'indice degli array inizia da 0)
    
        const startIndex = groupIndex * groupSize;
        const endIndex = startIndex + groupSize;
        const secondGroup = users.slice(startIndex, endIndex);
        context.commit('setUsers', secondGroup);
    },
    updatingUser(context, userUpdated) {
        const index = context.state.users.findIndex(user => user.id === userUpdated.id);
        context.commit('updateUser', {userUpdated, index})
    },
    addingUser(context, user){
        let usernewId= Object.assign({}, user)
        const maxId = Math.max(...context.state.users.map(user => user.id));
        usernewId.id = maxId + 1;
        context.commit('addUser', usernewId)
    },
    deletingUser(context, id) {
        const index = context.state.users.findIndex(user => user.id === id);
        if (index !== -1) context.commit('deleteUser', index)
    },
    searchingUsers(context, regex){
        let searchedUsers= []
        for (let i = 0; i < context.state.users.length; i++) {
            let user = context.state.users[i]
            if (regex.test(user.name) || regex.test(user.surname)) {
                searchedUsers.push(user);
            }
        }
        context.commit('searchUsers', searchedUsers)
    }
}

export const getters = {
    getAllUsers(state) {
        return state.usersPage; 
    },
    getFilter(state){
        return state.filterUser;
    },
    getAllUsersLength(state) {
        return state.users.length; 
    },
    getSearchedUsers(state) {
        return state.searchedUsers; 
    },
}