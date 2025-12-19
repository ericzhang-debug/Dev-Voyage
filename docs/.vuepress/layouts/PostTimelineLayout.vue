<script setup lang="ts">
import { Layout } from 'vuepress-theme-plume/client'
import { usePageFrontmatter } from 'vuepress/client'
import { computed } from 'vue'

const frontmatter = usePageFrontmatter()
const posts = computed(() => frontmatter.value.posts || [])
</script>

<template>
  <Layout>
    <div class="timeline-container">
      <h1 class="timeline-title">Post Timeline</h1>
      <div v-if="posts.length === 0" class="no-posts">
        No posts found.
      </div>
      <div v-else class="timeline">
        <div v-for="(post, index) in posts" :key="index" class="timeline-item">
          <div class="timeline-date">{{ post.date }}</div>
          <div class="timeline-content">
            <a :href="post.path" class="timeline-link">
              <h3 class="post-title">{{ post.title }}</h3>
            </a>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<style scoped>
.timeline-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 4rem 1rem;
}

.timeline-title {
  text-align: center;
  margin-bottom: 4rem;
  font-size: 2.5rem;
  font-weight: bold;
  background: linear-gradient(120deg, #bd34fe 30%, #41d1ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.timeline {
  position: relative;
  padding-left: 2rem;
  border-left: 2px solid var(--vp-c-divider);
  margin-left: 1rem;
}

.timeline-item {
  position: relative;
  margin-bottom: 3rem;
  padding-left: 2rem;
}

.timeline-item::before {
  content: '';
  position: absolute;
  left: -2.65rem; /* Adjust based on border and padding */
  top: 0.3rem;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: var(--vp-c-brand);
  border: 3px solid var(--vp-c-bg);
  z-index: 1;
  box-shadow: 0 0 0 3px var(--vp-c-brand-dimm);
}

.timeline-date {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
  font-family: monospace;
}

.timeline-link {
  text-decoration: none;
  color: inherit;
  display: block;
  padding: 1.5rem;
  border-radius: 12px;
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  transition: all 0.3s ease;
}

.timeline-link:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  background-color: var(--vp-c-bg-mute);
  border-color: var(--vp-c-brand);
}

.post-title {
  margin: 0;
  font-size: 1.4rem;
  font-weight: 600;
  line-height: 1.4;
}

.no-posts {
  text-align: center;
  color: var(--vp-c-text-2);
  font-size: 1.2rem;
  margin-top: 4rem;
}
</style>
