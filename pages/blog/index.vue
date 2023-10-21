<template lang="pug">
//- div(style="display: flex; justify-content: center; ") Blog!
div
    CommonSearchBar(type="blogs" @search="search")
    v-container
        v-row
            v-col(v-for="blog in blogs" :key="blog.id" cols="4" )
                BlogCard(:blog="blog" @navigated="navigateToBlog($event)")
</template>

<script>
export default {
    data() {
        return {
            blogSelect: {},
        }
    },
    computed:{
      blogs(){
        return this.$store.getters['blogs/getAllBlogs'];
		  },
    },
    methods: {
        navigateToBlog(blog){
            var slugify = require('slugify')
            var titleforSlug= slugify(blog.title.toLowerCase())
            console.log('titleforSlug: ', titleforSlug)
            this.$router.push({ name: 'blog-slug-id', params: {slug: titleforSlug, id: blog.id }})
        },
        search(text) {
            const blogsSearched = [];

            console.log("Text: ",text)
            this.$store.commit('blogs/setFilter', text);
            const regex = new RegExp(text, 'i'); // 'i' indicate a research case-insensitive
            this.$store.commit('blogs/setBlogs');

            for (let i = 0; i < this.blogs.length; i++) {
                if (regex.test(this.blogs[i].title) || regex.test(this.blogs[i].subtitle)) {
                    blogsSearched.push(this.blogs[i]);
                }
            }
            console.log("Risultato ricerca: ", blogsSearched);

            console.log("Resettato: ",this.blogs)
            this.$store.commit('blogs/searchBlog', blogsSearched);
            
        }
    }
}
</script>