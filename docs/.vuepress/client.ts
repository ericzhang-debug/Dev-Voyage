import { defineClientConfig } from 'vuepress/client'
import CustomHomeLayout from './layouts/CustomHomeLayout.vue'
import ProjectsLayout from './layouts/ProjectsLayout.vue'
import PostTimelineLayout from './layouts/PostTimelineLayout.vue'
import EssentialHomeLayout from './layouts/EssentialHomeLayout.vue'

export default defineClientConfig({
  layouts: {
    CustomHomeLayout,
    ProjectsLayout,
    PostTimelineLayout,
    EssentialHomeLayout,
  },
  enhance({ app }) {
    // built-in components
    // app.component('RepoCard', RepoCard)
    // app.component('NpmBadge', NpmBadge)
    // app.component('NpmBadgeGroup', NpmBadgeGroup)
    // app.component('Swiper', Swiper) // you should install `swiper`

    // your custom components
    // app.component('CustomComponent', CustomComponent)
  },
})
