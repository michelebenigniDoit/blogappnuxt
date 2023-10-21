<template lang="pug">
v-dialog(v-model="open" max-width="500px")
    v-card
        v-card-text 
            v-container 
                v-row 
                    v-col(cols="12" md="6") {{ message }}
                v-btn(@click="confirm()") Yes
                v-btn(color="secondary" @click="toggle()") No
    </template>

<script>
export default {
    props: {
        message: String,
    },
    data(){
        return{
            open: false,
        }
    },
    methods: {
        confirm(){
            this.$emit('confirm')
            this.toggle()
        },
        toggle(){
            this.open= !this.open
        },
    }
}
</script>