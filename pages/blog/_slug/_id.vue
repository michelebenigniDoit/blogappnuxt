<template lang="pug">
v-container(style="display: flex; justify-content: center;")
    v-col(cols="6")
        v-img(height="400" :src="require(`@/update/images/${blog.image}`)")
        h1 {{ blog.title }}
        h3 {{ blog.subtitle }}
        br
        div {{ blog.text }}
</template>
<script>
export default{
    data(){
        return {
            idBlog: Number(this.$route.params.id),
        }
    },
    computed: {
      blog(){
			  return this.$store.getters['blogs/getBlogById'](this.idBlog)
		  },
    },
}
</script>