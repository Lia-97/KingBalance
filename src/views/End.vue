<template>
  <div>
    <Logo/>
    <Ment/>
    <Share/>
    <Back2Start/>
  </div>
</template>

<script>
import Logo from '@/components/End/Logo'
import Ment from '@/components/End/Ment'
import Share from '@/components/End/Share.vue'
import Back2Start from '@/components/End/Back2Start'


export default {
  name: 'End',
  components: {
    Logo,
    Ment,
    Share,
    Back2Start,
  }
}

</script>
