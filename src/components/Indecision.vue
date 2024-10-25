<template>
  <section class="c-wrapper" :style="{ backgroundImage: `url(${img})` }">
    <div class="c-form">
      <input data-testid="input" v-model="question" class="c-form__input" type="text"
        placeholder="Hazme alguna pregunta">
      <span class="c-form__legend">Finaliza tu pregunta con un signo de interrogación (?)</span>
    </div>
    <div v-if="isValidQuestion" class="c-container">
      <h2 class="c-title">{{ question }}</h2>
      <span class="c-subtitle">{{ answer }}</span>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Indecision',
  data() {
    return {
      question: null,
      answer: null,
      img: null,
      isValidQuestion: false
    }
  },
  methods: {
    formatAnswer(value) {
      const options = {
        'no': 'No',
        'yes': 'Si',
        'maybe': 'Tal vez'
      }

      return options[value]
    },
    async getAnswer() {
      try {
        this.answer = 'Pensando...'

        const { answer, image } = await fetch('https://yesno.wtf/api')
          .then(response => response.json())

        this.img = image
        this.answer = this.formatAnswer(answer)

      } catch (error) {
        this.img = null
        this.answer = "Ha ocurrido un error"
      }
    }
  },
  watch: {
    question(value) {
      this.isValidQuestion = false

      if (!value.endsWith('?')) return
      this.isValidQuestion = true

      this.getAnswer()
    }
  }
}
</script>

<style>
:root {
  --c-white: #ffffff;
  --c-white-01: #f0f8ff;
  --c-blue: #448aff;
  --c-blue-01: #397cef;
  --c-blue-02: #00153a;
  --c-grey: #bcbcbc;
  --c-grey-01: #848383;
  --opacity: rgb(0, 0, 0, .5)
}

.c-wrapper {
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  background: var(--c-blue-02) center no-repeat;
  background-size: cover;
  padding: 25px 15px;

  &:before {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    position: fixed;
    background-color: var(--opacity);
    top: 0;
    left: 0;
    z-index: 1;
  }
}

.c-form {
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  z-index: 10;
  padding: 15px;

  .c-form__input {
    padding: 10px 22px;
    border-radius: 24px;
    background-color: var(--c-white-01);
    width: 280px;
    border: 1px solid var(--c-grey-01);
    transition: border .3s;
    outline: unset !important;
    text-align: center;

    &:active,
    &:focus,
    &:focus-visible {
      border-color: var(--c-grey-01);
    }
  }

  .c-form__legend {
    color: var(--c-white);
    font-weight: 400;
    font-style: italic;
    font-size: 18px;
  }
}

.c-container {
  width: 100%;
  padding: 15px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 32px;
  flex-direction: column;
  z-index: 10;
  flex: 1 1;
}

.c-title {
  font-weight: 400;
  font-size: 24px;
  color: var(--c-white);
}

.c-subtitle {
  font-weight: 800;
  font-size: 48px;
  color: var(--c-white);
}
</style>