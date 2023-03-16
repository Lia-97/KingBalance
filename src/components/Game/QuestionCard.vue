<template>
  <div id="app">
    <div id="answer">
      <div id="left" class="qcard">
        <button class="btn qbtn" @click="add_left_cnt">{{questions[this.idx]["left"]}}
        </button>
          <div v-if="clicked === true" class="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
            <div class="progress-bar progress-bar-striped progress-bar-animated bg-warning" :style="left_style">{{(questions[this.idx]["left_cnt"] / (questions[this.idx]["left_cnt"] + questions[this.idx]["right_cnt"]) * 100).toFixed(0)}} %</div>
          </div>
      </div>
      <div id="right" class="qcard">
        <button class="btn qbtn" @click="add_right_cnt">{{questions[this.idx]["right"]}}
        </button>
        <!-- progress bar start -->
          <div v-if="clicked === true" class="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"> 
            <div class="progress-bar progress-bar-striped progress-bar-animated bg-warning" :style="right_style">{{(questions[this.idx]["right_cnt"] / (questions[this.idx]["left_cnt"] + questions[this.idx]["right_cnt"]) * 100).toFixed(0)}} %</div>
          </div>
        <!-- progress bar end -->
      </div>
    </div>
    <div id="banner" class="d-flex justify-content-between">
      <div id="left">
        <!-- 이전 질문으로 넘어가게끔! 이전 질문이 남아있지 않으면 첫 질문입니다 띄우기 -->
        <button class="btn btn-outline-dark before" @click="before_questions">이전</button>
        <!-- Button trigger modal -->
        <span>
          <button type="button" class="btn btn-outline-dark before" data-bs-toggle="modal" data-bs-target="#exampleModal">
            공유하기
          </button>
          <!-- Modal start-->
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
          <!-- Modal end -->
        </span>
      </div>
      <div class="right">
        <!-- like button start -->
        <button v-if="liked === true" class="btn border-0 bg-transparent" @click="clickLike">
          <img class="heart" :src="require('@/assets/heart-fill.svg')">
        </button>
        <button v-else-if="liked === false" class="btn border-0 bg-transparent" @click="clickLike">
          <img class="heart" :src="require('@/assets/heart.svg')">
        </button>
        <!-- like button end -->
        <!-- 다음 질문으로 넘어가게끔. 다음 질문이 남아있지 않으면 End 페이지를 보여줌 -->
        <button class="btn btn-outline-dark next" @click="reset_questions">다음</button>
      </div>  
    </div>
    <div class="input-group mb-3">
      <input id="comment" type="text" class="form-control" placeholder="의견을 남겨주세요" >
      <button class="btn btn-outline-secondary" type="button" id="button-addon2" @click="send">등록</button>
    </div>
    <div class="comment_list">
      <div v-for="(comment, i) in this.comments" :key="i" >
        <span class="comment">익명{{i+1}} : {{comment}}</span>
      </div>
    </div>
    <!-- top button start -->
    <button type="button" class="top btn" v-show="scrollPosition > 200" @click="scrollToTop">Top</button>
    <!-- top button end -->
    <!-- top button start -->
    <button type="button" class="msg btn" data-bs-toggle="modal" data-bs-target="#MsgModal">Msg</button>
    <!-- Modal start-->
    <div class="modal fade" id="MsgModal" tabindex="-1" aria-labelledby="MsgModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title" id="MsgModalLabel">더 킹받는 아이디어를 알려주세요!!!</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <textarea class="msg-area form-control" id="message-text" v-model="message"></textarea>
            <button type="button" class="btn msgbtn" @click="sendMsg">제출</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal end -->
    <!-- top button end -->
  </div>
</template>

<script>
import {db} from '@/firebase/index'
import firebase from 'firebase/app'

export default {
  name: 'QuestionCard',
  head () {
    return {
              script: [
                  {src: '//developers.kakao.com/sdk/js/kakao.min.js'},
              ],
            }
  },
  data: function() {
    return {
      questions: [],
      clicked: false,
      liked: false,
      idx: 0,
      myInput: 'https://www.kingbalance.swygbro.com',
      message: '',
      scrollPosition: 0,
      comments: [],
      left_style: {
        width: '10%',
      },
      right_style: {
        width: '10%',
      },
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    db.collection("questions").get().then((snapshot)=>{
      snapshot.forEach((doc) => {
        this.questions.push(doc.data())
        this.comments = this.questions[this.idx]["comments"]
      });
    })
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  computed: {
    webShareApiSupported() {
      return navigator.share
    }
  },
  methods: {
    reset_questions : function () {
      if (this.idx != this.questions.length-1) {
        this.idx = this.idx + 1
        this.clicked = false
        this.liked = false
        this.comments = this.questions[this.idx]['comments']
      }
      else {
        this.$router.push({ name : 'End' })
        console.log('End')
      }
    },
    doCopy: function () {
      navigator.clipboard.writeText(this.myInput).then(() => {
        alert(this.myInput + '을 복사했습니다!')
      })
    },
    add_left_cnt : function () {
      const num = this.questions[this.idx]["idx"]
      const doc_id = "question_" + num
      const origin_num = this.questions[this.idx]['left_cnt']
      const new_num = origin_num + 1
      db.collection('questions').doc(doc_id).update({left_cnt: new_num})
      this.clicked = true
      this.left_style.width = (this.questions[this.idx]["left_cnt"] / (this.questions[this.idx]["left_cnt"] + this.questions[this.idx]["right_cnt"]) * 100).toFixed(0)+'%'
      this.right_style.width = (this.questions[this.idx]["right_cnt"] / (this.questions[this.idx]["left_cnt"] + this.questions[this.idx]["right_cnt"]) * 100).toFixed(0)+'%'
    },
    add_right_cnt : function () {
      const num = this.questions[this.idx]["idx"]
      const doc_id = "question_" + num
      const origin_num = this.questions[this.idx]['right_cnt']
      const new_num = origin_num + 1
      db.collection('questions').doc(doc_id).update({right_cnt: new_num})
      this.clicked = true
      this.right_style.width = (this.questions[this.idx]["right_cnt"] / (this.questions[this.idx]["left_cnt"] + this.questions[this.idx]["right_cnt"]) * 100).toFixed(0)+'%'
      this.left_style.width = (this.questions[this.idx]["left_cnt"] / (this.questions[this.idx]["left_cnt"] + this.questions[this.idx]["right_cnt"]) * 100).toFixed(0)+'%'
    },
    clickLike : function () {
      const num = this.questions[this.idx]["idx"]
      const doc_id = "question_" + num
      if (this.liked === false) {
        const origin_num = this.questions[this.idx]['heart']
        const new_num = origin_num + 1
        db.collection('questions').doc(doc_id).update({'heart': new_num})
        this.liked = true
      }
      else {
        const num = this.questions[this.idx]["idx"]
        const doc_id = "question_" + num
        const origin_num = this.questions[this.idx]['heart']
        db.collection('questions').doc(doc_id).update({'heart': origin_num})
        this.liked = false
      }
    },
    before_questions : function () {
      this.idx = this.idx - 1
      this.clicked = false
      this.liked = false
      this.comments = this.questions[this.idx]['comments']
    },
    send: function () {
      const input = document.getElementById('comment').value;
      const num = this.questions[this.idx]["idx"]
      const doc_id = "question_" + num
      db.collection('questions').doc(doc_id).update({comments: firebase.firestore.FieldValue.arrayUnion(input)})
      document.getElementById('comment').value = ''
    },
    sendkakao: function () {
      this.$kakao.Link.sendCustom({
        templateId: 90887
      })
    },
    sendMsg: function () {
      const year = new Date().getFullYear();
      const month =new Date().getMonth() + 1 < 10? "0" + (new Date().getMonth() + 1): new Date().getMonth() + 1;
      const date =new Date().getDate() < 10? "0" + new Date().getDate(): new Date().getDate();
      const hh =new Date().getHours() < 10? "0" + new Date().getHours(): new Date().getHours();
      const mm =new Date().getMinutes() < 10? "0" + new Date().getMinutes(): new Date().getMinutes();
      const ss =new Date().getSeconds() < 10? "0" + new Date().getSeconds(): new Date().getSeconds();
      const now = year + "-" + month + "-" + date + " " + hh + ":" + mm + ":" + ss;
      db.collection('opinions').add({'msg': this.message, 'timestamp': now})
      this.message = ''
      alert("감사합니다!")
    },
    handleScroll() {
      this.scrollPosition = window.scrollY;
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  },
  
}
</script>

<style scoped>
#answer {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.qcard {
  position: relative;
  display: grid;
  height: 25vw;
}

.btn {
  font-size: 2vw;
}

.qbtn {
  background-color: #feebb6;
  margin: 10px 5px 10px 10px;
  border-radius: 10px;
  display: inline-block;
  font-weight: 400;
  font-size: 4vw;
  text-align: center;
  vertical-align: middle;
}

.btn-outline-dark {
  border-color: transparent;
}

.btn-outline-dark:hover {
  color: white;
  background-color: #fd9f28;
  border-color: #fd9f28;
}

.before {
  margin-left: 10px;
}

.next {
  margin-right: 10px;
}

.input-group {
  padding-left: 3%;
  padding-right: 3%;
  padding-top: 2%;
  padding-bottom: 1%;
}

.form-control {
  font-size: 1.5vw;
}

.btn-outline-secondary {
  font-size: 1.5vw;
}

.comment_list {
  display: block;
  text-align: left;
  padding-left: 3%;
}

.comment {
  border-color: gray;
  border-radius: 5%;
  font-size: 1.5vw;
  margin: 0.5%;
}

.percentage {
  font-size: 1.5vw;
}

.progress {
  width: 80%;
  height: 2rem;
  position: absolute;
  left: 2%;
  bottom: 10%;
  background-color: #feebb6; 
}

.progress-bar {
  color: black;
  font-size: 1.5vw;
}

.modal-title {
  font-size: 2rem;
}

.top {
  background-color: #feebb6;
  position: fixed;
  bottom: 5rem;
  right: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: #feebb6;
  color: black;
  font-size: 1.2rem;
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.3s ease-in-out;
}

.msg {
  background-color: #feebb6;
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: #feebb6;
  color: black;
  font-size: 1.2rem;
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.3s ease-in-out;
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

.msgbtn {
  background-color: #feebb6;
  margin-top: 1rem;
  margin-left: 80%;
  font-size: 1rem;
}

.msg-area {
  height: 8rem;
}

@media (max-width: 600px) {
#answer {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.qcard {
  position: relative;
  display: grid;
  height: 80vw;
  margin-top: -20vw;
}

.btn {
  font-size: 4vw;
  white-space: normal;
}

.qbtn {
  background-color: #feebb6;
  margin: 10px 5px 10px 10px;
  border-radius: 10px;
  display: inline-block;
  font-weight: 400;
  font-size: 8vw;
  text-align: center;
  vertical-align: middle;
}

.btn-outline-dark {
  border-color: transparent;
}

.btn-outline-dark:hover {
  color: white;
  background-color: #fd9f28;
  border-color: #fd9f28;
}

.before {
  margin-left: 10px;
}

.next {
  margin-right: 10px;
}

.input-group {
  padding-left: 3%;
  padding-right: 3%;
  padding-top: 2%;
  padding-bottom: 1%;
}

.form-control {
  font-size: 4vw;
}

.btn-outline-secondary {
  font-size: 4vw;
}

.comment_list {
  display: block;
  text-align: left;
  padding-left: 3%;
}

.comment {
  border-color: gray;
  border-radius: 5%;
  font-size: 4vw;
  margin: 0.5%;
}

.percentage {
  font-size: 1.5vw;
}

.progress {
  width: 80%;
  height: 2rem;
  position: absolute;
  left: 6%;
  bottom: 10%;
  background-color: #feebb6; 
}

.progress-bar {
  color: black;
  font-size: 1.5vw;
}
}

</style>