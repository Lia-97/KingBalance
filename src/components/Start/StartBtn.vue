<template>
  <div>
    <div>
      <img class="logo" src="@/assets/main_logo.png">
    </div>
    <div>
      <img class="start" src="@/assets/start.png" @click="startgame">
    </div>
  </div>
</template>

<script>
export default {
  name: 'StartBtn',
  methods: {
    startgame: function () {
      this.$router.push({ name : 'Game' })
    }
  },
}
</script>

<style scoped>
  .logo {
    text-align: center;
    width: 70vw;
    height: 35vw;
  }

  .start {
    margin-top: 5vmin;
    width: 35vw;
    cursor: pointer;
  }


  @media (max-width: 600px) {
    .logo {
      text-align: center;
      width: 100vw;
      height: 60vw;
      margin-top: 20%;
    }

    .start {
      margin-top: 5vmin;
      width: 40vw;
      margin-top: 20%;
    }
  }
</style>