const BLOGS= [
    {
        "id": 1,
        "image": 'mastering-the-art-of-coffee-brewing-tips-methods-and-secrets_91.png',
        "title": "The Art of Coffee Brewing",
        "subtitle": "Exploring different methods for a perfect cup",
        "text": "Brewing coffee is an art that requires precision and patience..."
    },
    {
        "id": 2,
        "image": "hbz-the-list-hidden-gems-puglia-polignano-a-mare-1496874665.jpg",
        "title": "Discovering Hidden Gems in Travel",
        "subtitle": "Off the beaten path adventures",
        "text": "While popular tourist destinations have their charm, there's something..."
      },
      {
        "id": 3,
        "image": "getty_153081592_970647970450075_79973.jpg",
        "title": "Healthy Lifestyle: Finding Balance",
        "subtitle": "Prioritizing physical and mental well-being",
        "text": "Maintaining a healthy lifestyle in today's fast-paced world can be..."
      },
      {
        "id": 4,
        "image": "shuttle_sts120-LG_0.jpg",
        "title": "The Evolution of Space Exploration",
        "subtitle": "From the moon landing to future missions",
        "text": "The journey of space exploration has been nothing short of..."
      },
      {
        "id": 5,
        "image": "Herb-tiny.webp",
        "title": "Cooking with Fresh Herbs",
        "subtitle": "Elevating flavors in your culinary creations",
        "text": "Using fresh herbs in cooking not only adds a burst of flavor..."
      }
  ]

  export const state = () => ({
    blogs: [...BLOGS],
    filterBlogs: null
  })

  export const getters = {
    getAllBlogs(state) {
        return state.blogs;
    },
    getBlogById: (state) => (blogId) => {
        return state.blogs.find(blog => blog.id === blogId);
    },
    getFilter(state){
        return state.filterBlogs;
    }
}

export const mutations= {
    setFilter(state, text){
        state.filterBlogs= text
    },
    setBlogs(state) {
        state.blogs = [...BLOGS];
    },
    searchBlog(state, blogsSearched){
        state.blogs=blogsSearched
    },
}