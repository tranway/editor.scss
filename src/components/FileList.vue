  <template  >
        <div class=" file-list collection">
                
                <a href="#!" class="collection-item lighten-2" @click='openfile( file.name)' v-for="file in listData" 
                :class="{active:activeFile==file.name}"> <i class="material-icons secondary-content   " >
                {{file.isChanged?'save':'rounded_corner'}}
                </i> {{file.name}} </a>
                <a href="#!" class="collection-item  grey lighten-4 center-align">   <i class="material-icons ">add</i></a>
                 
        </div>
  </template>
 

    <script>
     
  module.exports = {
        data:function  () {
            return {activeFile:''};
        },
        props:['listData'],
        methods:{

        },methods:{
            openfile:function  (key) {
                this.$dispatch('open-file',key);
                this.activeFile=key;
            }
        }
      
           
  }
    </script>


    <style>
    .file-list {
        padding: 5px;
        width: 400px; 
        @extend .z-depth-1;
    }
   
    </style>