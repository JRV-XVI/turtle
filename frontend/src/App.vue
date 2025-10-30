

<template>
  <div>
    <P5Background />
      <header class="site-header">
      <div class="site-title">Guardianes de Tortugas</div>
      <nav class="site-nav">
        <a href="https://conectando-el-mundo-web.vercel.app/">Home</a>
      </nav>
    </header>

    <main class="home">
      <section class="hero">
        <h2 class="hero-title">Concientización sobre la caza furtiva de tortugas en México</h2>
      </section>

      <section class="quiz-section">
        <QuizComponent />
      </section>
    </main>

    <footer class="site-footer">© 2025 Guardianes de Tortugas</footer>
  </div>
</template>

<script>
import QuizComponent from './components/Quiz.vue';
import P5Background from './components/P5Background.vue';

export default {
  name: 'App',
  components: { QuizComponent, P5Background }
};
</script>

<style scoped>
@import './assets/styles.css';

.site-header{display:flex;justify-content:space-between;align-items:center;padding:18px 24px;background:linear-gradient(90deg,#eaf6fb, #d7eef9);border-bottom:1px solid rgba(0,0,0,0.04)}
.site-title{font-weight:700;color:#0b4f6c}
.site-nav a{margin-left:14px;color:#0b4f6c;text-decoration:none;font-weight:600}
.home{max-width:1000px;margin:28px auto;padding:0 16px}
.hero{display:flex;align-items:center;justify-content:center;gap:18px;margin-bottom:22px;padding:60px 16px;text-align:center}
.hero-title{margin:0;color:#ffffff;font-size:1.8rem;line-height:1.2;text-align:center;text-shadow:0 2px 8px rgba(0,0,0,0.6)}
.quiz-section{margin-top:12px}
.site-footer{text-align:center;padding:12px;color:#6b6b6b;margin-top:28px}

</style>
