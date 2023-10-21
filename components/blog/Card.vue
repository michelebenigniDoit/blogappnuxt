<template lang="pug">
v-card(class="mx-auto my-10" width="300" height="230" @click="navigate")
    v-img(height="100" :src="require(`@/update/images/${blog.image}`)")
    v-card-title {{ blog.title }}
    v-card-subtitle {{ blog.subtitle }}
</template>

<script>
export default {
    props: {
        blog: Object
    },
    methods: {
        navigate(){
            this.$emit('navigated', this.blog)
        }
    }
}
</script>