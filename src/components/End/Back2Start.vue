<template>
  <div class="start">
    <button class="btn btn-outline-dark" @click="back">시작화면으로</button>
  </div>
</template>

<script>
export default {
  name: 'Back3Start',
  data: function () {

  },
  methods: {
    back: function () {
      this.$router.push({ name : 'Start' })
    }
  },
}
</script>

<style scoped>

.start {
  margin-top: 2%;
}

.btn {
  font-size: 3vw;
}

.btn-outline-dark {
  border-color: transparent;
}

.btn-outline-dark:hover {
  color: white;
  background-color: #fd9f28;
  border-color: #fd9f28;
}

@media (max-width: 600px) {
  .btn {
    font-size: 5vw;
  }
}

</style>