<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { VPLink } from 'vuepress-theme-plume/client'

const STAGE = {
  IDLE: 'idle',
  RUNNING: 'running',
  FINISHED: 'finished'
}

const stage = ref(STAGE.IDLE)
const animationStep = ref(0)
const observerId = ref('0000')
const currentDivergence = ref('0.000000')

const worldLines = [
  { 
    title: 'BigGAN: 神经网络的梦境', 
    desc: '探索生成对抗网络的潜空间漫游',
    path: '/amadeus-gate/biggan.html', 
    divergence: '1.048596',
    type: 'ALPHA'
  },
  { 
    title: 'Transformer: 注意力机制', 
    desc: '解构现代大语言模型的灵魂架构',
    path: '/amadeus-gate/transformer.html', 
    divergence: '0.571024',
    type: 'BETA'
  },
  { 
    title: 'Diffusion: 逆向熵增', 
    desc: '从高斯噪声中重构有序世界的奇迹',
    path: '/amadeus-gate/diffusion.html', 
    divergence: '2.615074',
    type: 'OMEGA'
  },
  {
    title: 'DeepSeek: 深度求索',
    desc: '国产开源模型的崛起之路',
    path: '/amadeus-gate/deepseek.html',
    divergence: '3.141592',
    type: 'GAMMA'
  }
]

const STORAGE_KEY = 'amadeus-gate-visited'

onMounted(() => {
  observerId.value = Math.floor(Math.random() * 10000).toString().padStart(4, '0')
  const visited = localStorage.getItem(STORAGE_KEY)
  // if (visited) {
  //   stage.value = STAGE.FINISHED
  // }
})

const startProtocol = () => {
  stage.value = STAGE.RUNNING
  animationStep.value = 1 // Implosion
  
  setTimeout(() => { animationStep.value = 2 }, 2000) // Data Stream
  setTimeout(() => { animationStep.value = 3 }, 6000) // Logo Form
  setTimeout(() => { finishAnimation() }, 9000) // Finish
}

const finishAnimation = () => {
  stage.value = STAGE.FINISHED
  localStorage.setItem(STORAGE_KEY, 'true')
}

const handleDoubleClick = () => {
  if (stage.value === STAGE.RUNNING) {
    finishAnimation()
  }
}
</script>

<template>
  <div class="amadeus-container" @dblclick="handleDoubleClick">
    
    <!-- Final Navigation Interface (Standalone Page) -->
    <transition name="fade-slow">
      <div v-if="stage === STAGE.FINISHED" class="navigator-interface">
        <div class="bg-grid"></div>
        <div class="scanline"></div>
        
        <!-- Header -->
        <header class="nav-header">
          <div class="header-left">
            <div class="status-dot"></div>
            <span>AMADEUS SYSTEM: ONLINE</span>
          </div>
          <RouterLink to="/" class="nav-home-btn">
            <div class="btn-content">
              <span class="btn-text">RETURN TO GATE</span>
              <div class="btn-glitch"></div>
            </div>
          </RouterLink>
          <div class="header-right">
            <span>OBSERVER: {{ observerId }}</span>
            <span class="divergence-meter">∆ {{ currentDivergence }}%</span>
          </div>
        </header>

        <!-- Main Content -->
        <main class="nav-main">
          <div class="logo-container">
            <div class="main-logo"></div>
            <h1 class="glitch-title" data-text="AMADEUS GATE">AMADEUS GATE</h1>
            <p class="subtitle">AI COGNITION RECONSTRUCTION PROTOCOL</p>
          </div>

          <div class="world-lines-grid">
            <VPLink 
              v-for="line in worldLines" 
              :key="line.path" 
              :href="line.path" 
              class="world-line-card"
            >
              <div class="card-border"></div>
              <div class="card-content">
                <div class="card-header">
                  <span class="line-type">{{ line.type }}</span>
                  <span class="line-divergence">{{ line.divergence }}%</span>
                </div>
                <h3 class="line-title">{{ line.title }}</h3>
                <p class="line-desc">{{ line.desc }}</p>
                <div class="card-footer">
                  <span class="access-btn">INITIATE JUMP >></span>
                </div>
              </div>
              <div class="card-glitch"></div>
            </VPLink>
          </div>
        </main>

        <!-- Footer -->
        <footer class="nav-footer">
          <p>El Psy Kongroo</p>
          <p class="copyright">© 2025 Future Gadget Lab</p>
        </footer>
      </div>
    </transition>

    <!-- Intro Animation Overlay -->
    <transition name="fade">
      <div v-if="stage !== STAGE.FINISHED" class="intro-sequence">
        <div class="crt-overlay"></div>
        
        <!-- Stage: IDLE -->
        <div v-if="stage === STAGE.IDLE" class="terminal-view">
          <div class="terminal-content">
            <p>>_ SYSTEM CHECK... OK</p>
            <p>>_ CONNECTING TO AMADEUS...</p>
            <p>>_ CONNECTION ESTABLISHED.</p>
            <br>
            <p class="blink">>_ WAITING FOR INPUT...</p>
          </div>
          <button class="start-btn" @click="startProtocol">
            [ EXECUTE PROTOCOL ]
          </button>
        </div>

        <!-- Stage: RUNNING -->
        <div v-if="stage === STAGE.RUNNING" class="anim-stage" :class="`step-${animationStep}`">
          <div class="singularity" v-if="animationStep >= 1"></div>
          <div class="matrix-rain" v-if="animationStep === 2"></div>
          <div class="logo-reveal" v-if="animationStep === 3">
            <div class="reveal-symbol"></div>
            <div class="reveal-text">AMADEUS GATE</div>
          </div>
        </div>
      </div>
    </transition>

  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');

.amadeus-container {
  font-family: 'Share Tech Mono', monospace;
  width: 100vw;
  height: 100vh;
  background: #000;
  color: #e0e0e0;
  overflow: hidden;
  position: relative;
}

/* --- Navigator Interface --- */
.navigator-interface {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  background: radial-gradient(circle at center, #0a1a2a 0%, #000 100%);
  z-index: 10;
}
.nav-home-btn {
  text-decoration: none;
}
.nav-home-btn .btn-content {
  position: relative;
  padding: 5px 15px;
  border: 1px solid #0ff;
  overflow: hidden;
}
.nav-home-btn .btn-text {
  position: relative;
  z-index: 10;
}
.nav-home-btn .btn-glitch {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(0, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
  pointer-events: none;
  perspective: 1000px;
  transform-style: preserve-3d;
}

.scanline {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background: rgba(0, 255, 255, 0.1);
  opacity: 0.5;
  animation: scan 6s linear infinite;
  pointer-events: none;
  z-index: 20;
}

@keyframes scan {
  0% { transform: translateY(-100vh); }
  100% { transform: translateY(100vh); }
}

/* Header */
.nav-header {
  display: flex;
  justify-content: space-between;
  padding: 20px 40px;
  border-bottom: 1px solid rgba(0, 255, 255, 0.2);
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  z-index: 30;
}

.header-left, .header-right {
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 1.1rem;
  color: #0ff;
}

.status-dot {
  width: 10px;
  height: 10px;
  background: #0f0;
  border-radius: 50%;
  box-shadow: 0 0 10px #0f0;
  animation: pulse 2s infinite;
}

.divergence-meter {
  color: #f00;
  text-shadow: 0 0 5px #f00;
  font-weight: bold;
}

/* Main Content */
.nav-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  z-index: 30;
  overflow-y: auto;
}

.logo-container {
  text-align: center;
  margin-bottom: 60px;
}

.main-logo {
  width: 80px;
  height: 80px;
  border: 2px solid #0ff;
  border-radius: 50%;
  margin: 0 auto 20px;
  position: relative;
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
}

.main-logo::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
  border: 1px solid #fff;
  transform: translate(-50%, -50%) rotate(45deg);
}

.glitch-title {
  font-size: 4rem;
  margin: 0;
  color: #fff;
  text-shadow: 2px 2px 0px #f00, -2px -2px 0px #0ff;
  position: relative;
  letter-spacing: 5px;
}

.subtitle {
  color: #888;
  letter-spacing: 8px;
  margin-top: 10px;
  font-size: 1rem;
}

/* Grid Cards */
.world-lines-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  width: 100%;
  max-width: 1200px;
}

.world-line-card {
  position: relative;
  background: rgba(0, 20, 40, 0.6);
  height: 200px;
  text-decoration: none;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
}

.card-border {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 1px solid rgba(0, 255, 255, 0.3);
  z-index: 2;
  transition: all 0.3s;
}

.world-line-card:hover .card-border {
  border-color: #0ff;
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.3);
}

.card-content {
  position: relative;
  z-index: 3;
  padding: 25px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.card-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  font-size: 0.9rem;
}

.line-type {
  color: #888;
}

.line-divergence {
  color: #f00;
}

.world-line-card:hover .line-divergence {
  color: #0ff;
  text-shadow: 0 0 5px #0ff;
}

.line-title {
  color: #fff;
  font-size: 1.5rem;
  margin: 0 0 10px 0;
  transition: color 0.3s;
}

.world-line-card:hover .line-title {
  color: #0ff;
}

.line-desc {
  color: #aaa;
  font-size: 0.9rem;
  line-height: 1.4;
  flex-grow: 1;
}

.card-footer {
  text-align: right;
  font-size: 0.8rem;
  color: #555;
  transition: color 0.3s;
}

.world-line-card:hover .card-footer {
  color: #fff;
}

.card-glitch {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 10px,
    rgba(0, 255, 255, 0.05) 10px,
    rgba(0, 255, 255, 0.05) 20px
  );
  opacity: 0;
  z-index: 1;
  transition: opacity 0.3s;
}

.world-line-card:hover .card-glitch {
  opacity: 1;
}

/* Footer */
.nav-footer {
  text-align: center;
  padding: 20px;
  color: #555;
  font-size: 0.8rem;
  border-top: 1px solid rgba(0, 255, 255, 0.1);
  z-index: 30;
}

/* --- Intro Sequence --- */
.intro-sequence {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
}

.crt-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), 
    linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
  background-size: 100% 2px, 3px 100%;
  pointer-events: none;
  z-index: 101;
}

.terminal-view {
  z-index: 102;
  text-align: center;
}

.terminal-content {
  text-align: left;
  color: #0f0;
  font-size: 1.2rem;
  margin-bottom: 40px;
  text-shadow: 0 0 5px #0f0;
}

.blink {
  animation: blink 1s infinite;
}

.start-btn {
  background: transparent;
  border: 2px solid #0f0;
  color: #0f0;
  padding: 15px 40px;
  font-family: 'Share Tech Mono', monospace;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 0 10px #0f0;
}

.start-btn:hover {
  background: rgba(0, 255, 0, 0.2);
  box-shadow: 0 0 20px #0f0;
}

/* Animation Stages */
.anim-stage {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.singularity {
  width: 5px;
  height: 5px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 0 50px 20px #fff;
  animation: implode 2s cubic-bezier(0.7, 0, 0.3, 1) forwards;
}

.matrix-rain {
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(0deg, transparent, transparent 50px, #0f0 50px, #0f0 52px);
  opacity: 0.5;
  animation: rain 0.1s linear infinite;
}

.logo-reveal {
  text-align: center;
  animation: fadeIn 1s ease-out;
}

.reveal-symbol {
  width: 100px;
  height: 100px;
  border: 2px solid #0ff;
  border-radius: 50%;
  margin: 0 auto 20px;
  animation: spin 5s linear infinite;
}

.reveal-text {
  font-size: 3rem;
  color: #fff;
  text-shadow: 0 0 20px #0ff;
}

/* Animations */
@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

@keyframes implode {
  0% { transform: scale(50); opacity: 0; }
  50% { transform: scale(1); opacity: 1; }
  100% { transform: scale(0.1); opacity: 1; }
}

@keyframes rain {
  0% { transform: translateY(0); }
  100% { transform: translateY(50px); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.fade-slow-enter-active {
  transition: opacity 2s ease-in;
}
.fade-slow-enter-from {
  opacity: 0;
}
</style>
