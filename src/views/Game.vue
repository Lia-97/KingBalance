<template>
  <div>
    <Logo/>
    <QuestionCard/>
  </div>
</template>

<script>
import Logo from '@/components/Game/Logo'
import QuestionCard from '@/components/Game/QuestionCard'

export default {
  name: 'Game',
  components: {
    Logo,
    QuestionCard,
  }
}

</script>
