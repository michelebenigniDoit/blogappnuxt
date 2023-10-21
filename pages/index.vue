<template lang="pug">
div
    CommonSearchBar(type="users" @search="search")
    v-btn.my-5(@click="addUserDialog()") add
    div
        v-data-table(:headers="headers" :items="filteredUsers" item-key="id" @click:row="viewUserDialog" @update:options="optionsDataTable" :server-items-length="usersLength" :items-per-page.sync="dataTable.itemsPerPage" :page.sync="dataTable.page" :key="listKey")
            template(v-slot:item.actions="{ item }")
                v-btn(color="success" @click.stop="updateUserDialog(item)") Edit
                v-btn(@click.stop="deleteConfirmDialog(item)") Delete
        UsersDialog(ref="userDialog" :userSelect="userSelect" @confirm="changeUsers" :typeDialog="typeDialog" :message="messageDialog")
        CommonConfirmDialog(ref="deleteDialog" :message="messageDelete" @confirm="deleteUser")
</template>

<script>

export default{
    data() {
        return {
            userSelect: {},
            userSelectIndex: null,
            isEditable: false,
            messageDelete: null,
            listKey: 0,
            typeDialog: null,
            messageDialog: null,
            filteredUsers: [],
            dataTable: {
                page: 1,
                itemsPerPage: 5,
                sortBy: 'id',
                sortDesc: false
            },
            searchActivation: false
        }
    },
    computed:{
        users(){
            this.$store.dispatch('users/APIUsers', this.dataTable);
            return this.$store.getters['users/getAllUsers'];
		    },
        headers() {
            return [
                { text: 'Id', value: 'id' },
                { text: 'Name', value: 'name' },
                { text: 'Surname', value: 'surname' },
                { text: 'Actions', value: 'actions', sortable: false }
            ];
        },
        usersLength(){
            return this.$store.getters['users/getAllUsersLength'];
		},
    },
    watch: {
        users: {
            handler(newUsers) {
                if(!this.searchActivation) {
                    this.searchActivation= false
                    this.filteredUsers = [...newUsers];
                }
            },
            immediate: true // Trigger the watcher immediately on component mount
        }
    },
    methods: {
        optionsDataTable(options){
            this.dataTable= {
                page: options.page,
                itemsPerPage: options.itemsPerPage,
                sortBy: options.sortBy[0],
                sortDesc: options.sortDesc[0]
            }
        },
        viewUserDialog(user, index){
            if(!index) {var index = this.filteredUsers.indexOf(user);}
            this.userSelectIndex= index
            this.userSelect = user;
            this.typeDialog="view"
            this.$refs.userDialog.toggle()
        },
        updateUserDialog(user, index){
            if(!index) {var index = this.filteredUsers.indexOf(user);}
            this.userSelectIndex= index
            this.userSelect = user;
            this.typeDialog="update"
            this.messageDialog="Update user"
            this.$refs.userDialog.toggle()
        },
        addUserDialog(){
            this.userSelect = {};
            this.typeDialog="add"
            this.messageDialog="Add user"
            this.$refs.userDialog.toggle()
        },
        changeUsers(user){
            if(this.typeDialog=="add"){
                this.$store.dispatch('users/addingUser', user)
            }
            if(this.typeDialog=="update"){
                this.$store.dispatch('users/updatingUser', user)
                this.filteredUsers = [...this.users];
            }
            this.listKey++
        },
        deleteConfirmDialog(user, index){
            if(!index) {var index = this.users.indexOf(user);}
            this.userSelect=user;
            this.userSelectIndex= index
            this.messageDelete= `Vuoi eliminare questo utente? ${user.name} ${user.surname}`
            this.$refs.deleteDialog.toggle()
        },
        deleteUser(){
            this.$store.dispatch('users/deletingUser', this.userSelect.id);
        },
        search(text) {
            this.$store.commit('users/setFilter', text);
            const regex = new RegExp(text, 'i'); // 'i' indicate a research case-insensitive
            this.$store.dispatch('users/searchingUsers', regex);
            this.filteredUsers= this.$store.getters['users/getSearchedUsers']
            if (text !== '') {
                this.searchActivation = true; // Set to true if text is not empty
            } else {
                this.searchActivation = false; // Set to false if text is empty
            }
            this.listKey++
        }
    }
}
</script>