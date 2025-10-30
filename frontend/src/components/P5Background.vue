<template>
  <div ref="container" class="p5-bg-container"></div>
</template>

<script>
import p5 from 'p5';
import { onMounted, onBeforeUnmount, ref } from 'vue';

export default {
  name: 'P5Background',
  setup() {
    const container = ref(null);
    let p5Instance = null;

    onMounted(() => {
      const sketch = (p) => {
        let vid;
        p.setup = () => {
          p.createCanvas(p.windowWidth, p.windowHeight);
          // place the canvas inside the component container
          const canvas = p.canvas;
          if (container.value && canvas) {
            container.value.appendChild(canvas);
          }
          // load the video from backend resources
          const videoUrl = 'http://localhost:3000/resources/ocean.mp4';
          vid = p.createVideo([videoUrl]);
          // Ensure attributes that allow autoplay on mobile/modern browsers
          try {
            if (vid && vid.elt) {
              vid.elt.setAttribute('playsinline', '');
              vid.elt.setAttribute('muted', '');
              vid.elt.muted = true;
              vid.elt.autoplay = true;
            }
          } catch (e) {
            // ignore
          }
          vid.size(p.width, p.height);
          vid.hide();
          // Use loop + explicit play to trigger autoplay when permitted
          vid.loop();
          try { vid.elt.play(); } catch (e) {}
          vid.volume(0);
        };

        p.draw = () => {
          p.clear();
          if (vid && vid.elt && vid.elt.readyState > 2) {
            // draw video stretched to canvas
            p.image(vid, 0, 0, p.width, p.height);
            // subtle dark overlay
            p.noStroke();
            p.fill(0, 40);
            p.rect(0, 0, p.width, p.height);
          }
        };

        p.windowResized = () => {
          p.resizeCanvas(p.windowWidth, p.windowHeight);
          if (vid) vid.size(p.width, p.height);
        };

        p.removeSketch = () => {
          if (vid) {
            try { vid.stop(); } catch (e) {}
            try { vid.remove(); } catch (e) {}
          }
        };
      };

      p5Instance = new p5(sketch);
    });

    onBeforeUnmount(() => {
      if (p5Instance) {
        try { p5Instance.remove(); } catch (e) {}
      }
    });

    return { container };
  }
};
</script>

<style scoped>
.p5-bg-container{position:fixed;inset:0;z-index:-1;overflow:hidden}
.p5-bg-container canvas{position:fixed;left:0;top:0;pointer-events:none}
</style>
