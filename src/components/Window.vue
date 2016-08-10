<template>
    <div class="row">
        <div class="col s3">
           <pane></pane>
        </div>
        <div class="col s9">
           bb
        </div>
    </div>
</template>
<script>
import Pane  from './Pane.vue'
module.exports = {
    data: () => {
        return {
            txt: 'this is Pane component'
        }
    },
    props: ['txt'],
    components:{
        Pane
    }
}
</script>
<style lang="scss" scoped>
 
</style>
