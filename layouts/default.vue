<template lang="pug">
v-app
    v-card
        v-tabs(bg-color="primary")
            v-tab(to="/") Users
            v-tab(to="/blog") Blog
    div
        v-breadcrumbs(:items="crumbs" divider="-")
    div
        Nuxt.mx-10
</template>
  
  <script>
  export default {
    name: 'MyComponent',
    computed: {
        crumbs(){
            const fullPath = this.$route.fullPath
            const params = fullPath.substring(1).split('/')
            console.log('params: ', params)
            let crumbs = []
            let items = []

            let path = ''
            params.forEach((param) => {
                path = `${path}/${param}`
                const match = this.$router.match(path)
                if (match.name !== null) crumbs.push(match)
            })
            
            crumbs.forEach((crumb)=>{
                let text= (crumb.params.slug)? crumb.params.slug.replace(/-/g, ' ').toUpperCase() : crumb.name.toUpperCase()
                if (crumb.params.id) return
                let newItem= {
                    text,
                    disabled: false,
                    href: crumb.fullPath,
                }
                items.push(
                    newItem
                )
                
            })

            let lastItem= items[items.length-1]
            lastItem.disabled= true

            return items
        } 

    }
  }
  </script>
  