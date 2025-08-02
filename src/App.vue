<template>
  <div class="app-wrapper">
    <div class="background-animation">
      <div class="floating-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
        <div class="shape shape-4"></div>
      </div>
    </div>

    <main class="main-content">
      <HomeView />
    </main>
  </div>
</template>

<script setup lang="ts">
import HomeView from './views/HomeView.vue';
</script>

<style scoped>
.app-wrapper {
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}

.background-animation {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
}

.floating-shapes {
  position: absolute;
  width: 100%;
  height: 100%;
}

.shape {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  opacity: 0.1;
  animation: float 20s infinite linear;
}

.shape-1 {
  width: 200px;
  height: 200px;
  top: 10%;
  left: 10%;
  animation-delay: 0s;
  animation-duration: 25s;
}

.shape-2 {
  width: 150px;
  height: 150px;
  top: 60%;
  right: 15%;
  animation-delay: -5s;
  animation-duration: 30s;
}

.shape-3 {
  width: 100px;
  height: 100px;
  top: 30%;
  right: 30%;
  animation-delay: -10s;
  animation-duration: 20s;
}

.shape-4 {
  width: 120px;
  height: 120px;
  bottom: 20%;
  left: 20%;
  animation-delay: -15s;
  animation-duration: 35s;
}

@keyframes float {
  0% {
    transform: translateY(0px) rotate(0deg);
  }
  33% {
    transform: translateY(-30px) rotate(120deg);
  }
  66% {
    transform: translateY(20px) rotate(240deg);
  }
  100% {
    transform: translateY(0px) rotate(360deg);
  }
}

.main-content {
  position: relative;
  z-index: 1;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-xl);
}

@media (max-width: 768px) {
  .main-content {
    padding: var(--spacing-lg);
  }

  .shape-1,
  .shape-2,
  .shape-3,
  .shape-4 {
    width: 100px;
    height: 100px;
  }
}

@media (max-width: 480px) {
  .main-content {
    padding: var(--spacing-md);
  }

  .shape-1,
  .shape-2,
  .shape-3,
  .shape-4 {
    width: 60px;
    height: 60px;
  }
}
</style>
