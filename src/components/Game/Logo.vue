<template>
  <div>
    <div>
      <img class="logo" src="@/assets/logo.png">
    </div>
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
    width: 25vw;
    height: 6vw;
  }

@media (max-width: 600px) {
  .logo {
    width: 30vw;
    height: 10vw;
    margin-top: -20%;
  }
}
</style>