<template lang="pug">
v-col.d-flex(cols="6")
    v-text-field(v-model="text" :value="value" dense flat solo clearable placeholder="Search" @click:clear="clear()")
    v-btn.mx-4(@click="search()") Search
</template>

<script>
export default{
    props: {
        type: String
    },
    computed: {
        value(){
            return this.text= this.$store.getters[`${this.type}/getFilter`]
        }
    },
    data(){
        return {
            text: null
        }
    },
    methods: {
        search(){
            if (!this.text) this.text = ''
            console.log(this.text)
            this.$emit("search", this.text)
        },
        clear(){
            this.text = ''
            this.search()
        }
    }
}
</script>