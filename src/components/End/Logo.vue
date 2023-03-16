<template>
  <div>
    <img class="logo" src="@/assets/logo.png">
  </div>
</template>

<script>
export default {
  name: 'Logo',
}
</script>

<style scoped>
  .logo {
    text-align: center;
    margin-top: -3%;
    width: 45vw;
    height: 10vw;
  }

  @media (max-width: 600px) {
    .logo {
      text-align: center;
      margin-top: -10%;
      width: 60vw;
      height: 30vw;
    }
  }

</style>