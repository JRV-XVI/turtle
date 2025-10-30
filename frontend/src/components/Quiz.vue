<template>
  <div class="cards-only">
    <div v-if="turtles.length === 0" class="small">Cargando tarjetas...</div>

    <div v-else class="cards-grid">
      <div v-for="(t, idx) in turtles" :key="t.id" class="card-outer">
        <div
          class="card-inner"
          :class="{ flipped: flipped[idx] }"
          @click="toggle(idx)"
        >
          <div class="card-face card-front">
            <img :src="t.image" alt="tortuga" class="card-image" />
            <div class="card-overlay">
              <div class="opt-label">{{ t.commonName }}</div>
              <div class="opt-text">{{ t.scientific }}</div>
            </div>
          </div>
          <div class="card-face card-back">
            <div class="back-content">
              <div class="back-title">{{ t.commonName }}</div>
              <div class="back-info">Estado: {{ t.status }}</div>
              <div class="back-desc">{{ t.description }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';
const API_T = 'http://localhost:3000/api/turtles';

export default {
  name: 'CardsOnly',
  setup() {
    const turtles = ref([]);
    const flipped = ref([]);

    const load = async () => {
      try {
        const res = await axios.get(API_T);
        turtles.value = res.data;
        flipped.value = turtles.value.map(() => false);
      } catch (e) {
        console.error('Error cargando tortugas', e);
      }
    };

    onMounted(load);

    const toggle = (i) => {
      flipped.value[i] = !flipped.value[i];
    };

    return { turtles, flipped, toggle, load };
  }
};
</script>

<style scoped>
.cards-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(420px,1fr));gap:20px;padding:12px}
.card-outer{perspective:900px}
.card-inner{position:relative;width:100%;height:220px;transform-style:preserve-3d;transition:transform .6s;cursor:pointer;border-radius:12px}
.card-inner.flipped{transform:rotateY(180deg)}
.card-face{position:absolute;inset:0;border-radius:12px;backface-visibility:hidden;overflow:hidden;display:flex;align-items:center;justify-content:center}
.card-front{background:linear-gradient(180deg,#fff,#f4fbff);border:1px solid rgba(6,24,37,0.06)}
.card-back{transform:rotateY(180deg);padding:16px;background:linear-gradient(180deg,#f8ffff,#ffffff);border:1px solid rgba(6,24,37,0.06)}
.card-image{width:100%;height:100%;object-fit:cover}
.card-overlay{position:absolute;left:0;right:0;bottom:0;padding:12px;background:linear-gradient(180deg,rgba(0,0,0,0.0),rgba(0,0,0,0.18));color:#fff}
.opt-label{font-weight:700;background:rgba(0,0,0,0.22);padding:6px;border-radius:6px;display:inline-block;margin-bottom:6px}
.opt-text{margin-top:6px;font-size:0.9rem}
.back-content{display:flex;flex-direction:column;gap:8px;color:#073642}
.back-title{font-weight:800;color:#0b4f6c}
.back-info{font-weight:600}
.back-desc{color:#334}

@media(max-width:880px){.cards-grid{grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:14px}.card-inner{height:200px}}
@media(max-width:520px){.cards-grid{grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:12px}.card-inner{height:180px}}
</style>