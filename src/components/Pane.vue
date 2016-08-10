<template>
    <div class="cpane">
        <div v-if="title" class="title-bar"><span class="title-txt"> <slot name="title-bar">
				    {{title}}
				  </slot></span>
		<span class="item"><i v-if="hasmin">min</i><i v-if="hasmax">max</i><i v-if="hasclose">close</i></span>
        </div>
        <div class="body">
				 <slot>
				    {{msg}}
				  </slot>
            
        </div>
    </div>
</template>
<script>
module.exports = { 
        data: () => {
            return {
                msg: 'this is Pane component'
            } 
        },props:['title','hasclose','hasmin','hasmax']
    }
</script>

<style lang="scss" scoped>
.cpane {
    height: 100%;
    width: 100%;
    background: red;
    .title-bar {
    	align-items:center;
    	justify-content:space-between;
        width: 100%;
        height: 30px;
        display: flex;
        background:#ccc;
        .title-opt{
        	flex:0;
   		 }
        .title-txt{
        	flex:1;
			padding-left:5px;
        }
    }
}
</style>
