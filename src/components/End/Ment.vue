<template>
  <div>
    <div class="mbtn">준비된 질문이 모두 끝났습니다.<br>재밌으셨다면 공유해주세요!</div>
  </div>
</template>

<script>
export default {
  name: 'Ment',
}
</script>

<style scoped>
.mbtn {
  background-color: #feebb6;
  margin: 7vmin;
  padding: 10vmin;
  border-radius: 10px;
  display: inline-block;
  font-weight: 400;
  font-size: 4vw;
  text-align: center;
  vertical-align: middle;
}

@media (max-width: 600px) {
  .mbtn {
  background-color: #feebb6;
  margin: 7vmin;
  padding: 10vmin;
  border-radius: 10px;
  display: inline-block;
  font-weight: 400;
  font-size: 6vw;
  text-align: center;
  vertical-align: middle;
}
}

</style>