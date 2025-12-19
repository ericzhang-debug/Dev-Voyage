<script setup lang="ts">
import { Layout } from 'vuepress-theme-plume/client'
import { usePageFrontmatter } from 'vuepress/client'
import { computed, ref } from 'vue'

interface Project {
  name: string
  icon?: string
  image?: string
  description: string
  author: string
  authorAvatar?: string
  authorGithub?: string
  year?: string
  techs: string[]
  github?: string
  demo?: string
  category?: string
  featured?: boolean
}

interface PageConfig {
  hero?: {
    name?: string
    tagline?: string
    description?: string
  }
  projects?: Project[]
  categories?: string[]
}

const frontmatter = usePageFrontmatter<{
  config?: PageConfig
}>()

const config = computed<PageConfig>(() => frontmatter.value.config || {})
const hero = computed(() => config.value.hero || {})
const projects = computed(() => config.value.projects || [])
const categories = computed(() => config.value.categories || ['全部'])

const activeCategory = ref('全部')

const filteredProjects = computed(() => {
  if (activeCategory.value === '全部') {
    return projects.value
  }
  return projects.value.filter(p => p.category === activeCategory.value)
})

const featuredProjects = computed(() => projects.value.filter(p => p.featured))

function setCategory(cat: string) {
  activeCategory.value = cat
}
</script>

<template>
  <Layout>
    <template #custom-content>
      <div class="projects-container">
        <!-- Background decoration -->
        <div class="bg-decoration" aria-hidden="true"></div>

        <!-- Hero Section -->
        <section class="hero-section">
          <div class="hero-content">
            <div class="hero-icon">🏆</div>
            <h1 class="hero-title" v-if="hero.name">
              <span class="gradient-text">{{ hero.name }}</span>
            </h1>
            <p class="hero-tagline" v-if="hero.tagline">{{ hero.tagline }}</p>
            <p class="hero-description" v-if="hero.description">{{ hero.description }}</p>
          </div>
        </section>

        <!-- Featured Projects Section -->
        <section class="featured-section" v-if="featuredProjects.length > 0">
          <div class="section-container">
            <div class="section-header">
              <h2 class="section-title">⭐ 精选项目</h2>
              <p class="section-subtitle">学长学姐们的优秀作品</p>
            </div>

            <div class="featured-grid">
              <div
                v-for="project in featuredProjects"
                :key="project.name"
                class="featured-card"
              >
                <div class="featured-image">
                  <div class="image-placeholder" v-if="!project.image">
                    <span class="project-icon">{{ project.icon || '📦' }}</span>
                  </div>
                  <img v-else :src="project.image" :alt="project.name" />
                  <div class="featured-badge">精选</div>
                </div>

                <div class="featured-content">
                  <h3 class="project-name">{{ project.name }}</h3>
                  <p class="project-desc">{{ project.description }}</p>

                  <div class="tech-tags">
                    <span v-for="tech in project.techs" :key="tech" class="tech-tag">
                      {{ tech }}
                    </span>
                  </div>

                  <div class="project-footer">
                    <div class="author-info">
                      <img
                        v-if="project.authorAvatar"
                        :src="project.authorAvatar"
                        :alt="project.author"
                        class="author-avatar"
                      />
                      <div v-else class="author-avatar-placeholder">
                        {{ project.author.charAt(0) }}
                      </div>
                      <div class="author-details">
                        <span class="author-name">{{ project.author }}</span>
                        <span class="project-year" v-if="project.year">{{ project.year }}</span>
                      </div>
                    </div>

                    <div class="project-links">
                      <a
                        v-if="project.github"
                        :href="project.github"
                        target="_blank"
                        class="link-btn github"
                        title="查看源码"
                      >
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                        </svg>
                      </a>
                      <a
                        v-if="project.demo"
                        :href="project.demo"
                        target="_blank"
                        class="link-btn demo"
                        title="在线演示"
                      >
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                          <polyline points="15 3 21 3 21 9"/>
                          <line x1="10" y1="14" x2="21" y2="3"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Category Filter -->
        <section class="filter-section" v-if="categories.length > 1">
          <div class="section-container">
            <div class="category-filter">
              <button
                v-for="cat in categories"
                :key="cat"
                :class="['filter-btn', { active: activeCategory === cat }]"
                @click="setCategory(cat)"
              >
                {{ cat }}
              </button>
            </div>
          </div>
        </section>

        <!-- All Projects Grid -->
        <section class="projects-section">
          <div class="section-container">
            <div class="section-header" v-if="!featuredProjects.length">
              <h2 class="section-title">🚀 项目展示</h2>
              <p class="section-subtitle">探索学长学姐们的创意作品</p>
            </div>

            <div class="projects-grid" v-if="filteredProjects.length > 0">
              <div
                v-for="project in filteredProjects"
                :key="project.name"
                class="project-card"
              >
                <div class="card-header">
                  <div class="card-icon">{{ project.icon || '📦' }}</div>
                  <div class="card-category" v-if="project.category">{{ project.category }}</div>
                </div>

                <h3 class="card-title">{{ project.name }}</h3>
                <p class="card-desc">{{ project.description }}</p>

                <div class="card-techs">
                  <span v-for="tech in project.techs.slice(0, 4)" :key="tech" class="card-tech">
                    {{ tech }}
                  </span>
                  <span v-if="project.techs.length > 4" class="card-tech more">
                    +{{ project.techs.length - 4 }}
                  </span>
                </div>

                <div class="card-footer">
                  <div class="card-author">
                    <div class="author-avatar-small">
                      {{ project.author.charAt(0) }}
                    </div>
                    <span>{{ project.author }}</span>
                    <span class="author-year" v-if="project.year">· {{ project.year }}</span>
                  </div>

                  <div class="card-links">
                    <a
                      v-if="project.github"
                      :href="project.github"
                      target="_blank"
                      class="card-link"
                      title="源码"
                    >
                      📦
                    </a>
                    <a
                      v-if="project.demo"
                      :href="project.demo"
                      target="_blank"
                      class="card-link primary"
                      title="演示"
                    >
                      🔗
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <!-- Empty State -->
            <div class="empty-state" v-else>
              <div class="empty-icon">🚧</div>
              <h3 class="empty-title">项目正在收集中...</h3>
              <p class="empty-desc">
                学长学姐们的优秀项目即将上线，敬请期待！<br/>
                如果你有项目想要展示，欢迎联系我们～
              </p>
            </div>
          </div>
        </section>

        <!-- Call to Action -->
        <section class="cta-section">
          <div class="section-container">
            <div class="cta-card">
              <div class="cta-content">
                <h3 class="cta-title">💡 想要展示你的项目？</h3>
                <p class="cta-desc">
                  如果你有优秀的项目想要分享，欢迎提交 PR 或联系协会成员！
                </p>
              </div>
              <a
                href="https://github.com/ECUSTCIC-CodeHub/Dev-Voyage/issues/new"
                target="_blank"
                class="cta-btn"
              >
                提交项目
              </a>
            </div>
          </div>
        </section>
      </div>
    </template>
  </Layout>
</template>

<style scoped>
.projects-container {
  width: 100%;
  min-height: calc(100vh - var(--vp-nav-height));
  background-color: var(--vp-c-bg);
  position: relative;
  overflow: hidden;
}

/* Background Decoration */
.bg-decoration {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 500px;
  background: linear-gradient(135deg,
    rgba(102, 126, 234, 0.08) 0%,
    rgba(118, 75, 162, 0.05) 50%,
    transparent 100%
  );
  z-index: 0;
}

/* Section Container */
.section-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  position: relative;
  z-index: 1;
}

/* Hero Section */
.hero-section {
  padding: 80px 24px 60px;
  text-align: center;
  position: relative;
  z-index: 1;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero-icon {
  font-size: 64px;
  margin-bottom: 24px;
  animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.hero-title {
  font-size: 48px;
  font-weight: 800;
  margin-bottom: 16px;
  letter-spacing: -0.02em;
}

.gradient-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-tagline {
  font-size: 24px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 12px;
}

.hero-description {
  font-size: 18px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

/* Section Header */
.section-header {
  text-align: center;
  margin-bottom: 40px;
}

.section-title {
  font-size: 32px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 8px;
}

.section-subtitle {
  font-size: 16px;
  color: var(--vp-c-text-2);
}

/* Featured Section */
.featured-section {
  padding: 40px 0 60px;
}

.featured-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 24px;
}

.featured-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.featured-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
  border-color: var(--vp-c-brand-1);
}

.featured-image {
  height: 200px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.featured-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
}

.project-icon {
  font-size: 72px;
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2));
}

.featured-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: linear-gradient(135deg, #f5af19 0%, #f12711 100%);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.featured-content {
  padding: 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.project-name {
  font-size: 22px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 12px;
}

.project-desc {
  font-size: 15px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 16px;
  flex: 1;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}

.tech-tag {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
}

.project-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 16px;
  border-top: 1px solid var(--vp-c-divider);
}

.author-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.author-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.author-avatar-placeholder {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 16px;
}

.author-details {
  display: flex;
  flex-direction: column;
}

.author-name {
  font-weight: 600;
  color: var(--vp-c-text-1);
  font-size: 14px;
}

.project-year {
  font-size: 12px;
  color: var(--vp-c-text-3);
}

.project-links {
  display: flex;
  gap: 8px;
}

.link-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-bg-mute);
  color: var(--vp-c-text-2);
  transition: all 0.2s ease;
}

.link-btn:hover {
  background: var(--vp-c-brand-1);
  color: white;
}

.link-btn.demo {
  background: var(--vp-c-brand-1);
  color: white;
}

.link-btn.demo:hover {
  background: var(--vp-c-brand-2);
}

/* Filter Section */
.filter-section {
  padding: 20px 0 40px;
}

.category-filter {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-btn:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.filter-btn.active {
  background: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  color: white;
}

/* Projects Grid */
.projects-section {
  padding: 20px 0 80px;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
}

.project-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 24px;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.project-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  border-color: var(--vp-c-brand-1);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.card-icon {
  font-size: 36px;
}

.card-category {
  font-size: 12px;
  color: var(--vp-c-text-3);
  background: var(--vp-c-bg-mute);
  padding: 4px 10px;
  border-radius: 10px;
}

.card-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 8px;
}

.card-desc {
  font-size: 14px;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  margin-bottom: 16px;
  flex: 1;
}

.card-techs {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 16px;
}

.card-tech {
  font-size: 12px;
  color: var(--vp-c-text-3);
  background: var(--vp-c-bg-mute);
  padding: 2px 8px;
  border-radius: 4px;
}

.card-tech.more {
  color: var(--vp-c-brand-1);
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 16px;
  border-top: 1px solid var(--vp-c-divider);
}

.card-author {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.author-avatar-small {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 600;
}

.author-year {
  color: var(--vp-c-text-3);
}

.card-links {
  display: flex;
  gap: 8px;
}

.card-link {
  font-size: 16px;
  opacity: 0.6;
  transition: all 0.2s ease;
}

.card-link:hover {
  opacity: 1;
  transform: scale(1.1);
}

.card-link.primary {
  opacity: 1;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 80px 24px;
}

.empty-icon {
  font-size: 72px;
  margin-bottom: 24px;
}

.empty-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 12px;
}

.empty-desc {
  font-size: 16px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

/* CTA Section */
.cta-section {
  padding: 0 0 80px;
}

.cta-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  padding: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.cta-content {
  flex: 1;
}

.cta-title {
  font-size: 24px;
  font-weight: 700;
  color: white;
  margin-bottom: 8px;
}

.cta-desc {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9);
}

.cta-btn {
  padding: 14px 28px;
  background: white;
  color: #667eea;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  text-decoration: none;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.cta-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

/* Responsive */
@media (max-width: 768px) {
  .hero-title {
    font-size: 36px;
  }

  .hero-tagline {
    font-size: 20px;
  }

  .featured-grid {
    grid-template-columns: 1fr;
  }

  .featured-card {
    min-width: auto;
  }

  .projects-grid {
    grid-template-columns: 1fr;
  }

  .cta-card {
    flex-direction: column;
    text-align: center;
  }
}

@media (max-width: 640px) {
  .hero-section {
    padding: 60px 16px 40px;
  }

  .hero-icon {
    font-size: 48px;
  }

  .hero-title {
    font-size: 28px;
  }

  .section-title {
    font-size: 24px;
  }

  .category-filter {
    gap: 8px;
  }

  .filter-btn {
    padding: 6px 14px;
    font-size: 13px;
  }
}
</style>
