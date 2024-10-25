<template>
  <h2 data-testid="title"> {{ title }} </h2>
  <span> {{ counter }} <sup>2</sup> = {{ squareValue }} </span>
  <span data-testid="counter"> {{ counter }} </span>

  <section>
    <button data-testid="decrease" @click="decrease">-</button>
    <button data-testid="increase" @click="increase">+</button>
  </section>

</template>

<script>
export default {
  name: 'Counter',
  props: {
    title: {
      type: String,
      default: 'Counter'
    },
    start: {
      type: Number,
      default: 100
    }
  },
  data() {
    return {
      counter: this.start
    }
  },
  computed: {
    squareValue() {
      return this.counter * this.counter
    }
  },
  methods: {
    increase() {
      this.counter++
    },
    decrease() {
      this.counter--
    }
  }
}
</script>

<style>
button {
  padding: 6px 20px;
  margin: 8px;
  border-radius: 5px;
  border: 1px solid #32495d;
  background: #00ba86;
  color: white;
  font-weight: 800;
  font-size: 24px;
  cursor: pointer;
  transition: .3s;
  filter: drop-shadow(0px 0px 6px rgb(0, 0, 0, 0));
}

button:hover {
  filter: drop-shadow(0px 0px 6px rgb(0, 0, 0, .13));
  background: #02a376;
}
</style>