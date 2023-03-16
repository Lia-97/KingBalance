<template>
  <div>
    <span>
          <button type="button" class="btn btn-outline-dark before" data-bs-toggle="modal" data-bs-target="#exampleModal">
            공유하기
          </button>
          <!-- Modal -->
          <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title" id="exampleModalLabel">나만 킹받을 수 없으니 같이 하자구 ^_^</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <div>
                    <span class="url">{{this.myInput}}</span>
                    <button type="button" class="btn copy copybtn" @click="doCopy">copy</button>
                  </div>
                  <div class="kakao">
                    <span class="kakaoment">카카오톡으로 바로 공유하기는 여기를 클릭!</span>
                    <span @click="sendkakao"><img class="kakaologo" src="@/assets/kakaotalk.png"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </span>
  </div>
</template>

<script>
export default {
  name: 'Share',
  data: function () {
    return {
      myInput: 'www.king-balance.com',
    }
  },
  methods: {
    sendkakao: function () {
      this.$kakao.Link.sendCustom({
        templateId: 90887
      })
    },
    doCopy: function () {
      navigator.clipboard.writeText(this.myInput).then(() => {
        alert(this.myInput + '을 복사했습니다!')
      })
    },
  }
}
</script>

<style scoped>
.btn {
  font-size: 3vw;
  border-color: transparent}

.btn-outline-dark {
  border-color: transparent;
}

.btn-outline-dark:hover {
  color: white;
  background-color: #fd9f28;
  border-color: #fd9f28;
}

.modal-title {
  font-size: 2rem;
}

.copy {
  font-size: 1.5rem;
}

.copybtn {
  background-color: #fbe300;
  margin-left: 10%;
}

.kakaologo {
  width: 8%;
  margin-left: 5%;
  cursor: pointer;
}

.url {
  font-size: 2rem;
}

.kakaoment {
  font-size: 1.3rem;
}

.kakao {
  margin-top: 5%;
}

@media (max-width: 600px) {
  .btn {
    font-size: 5vw;
  }
}

</style>