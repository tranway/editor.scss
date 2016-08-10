<template>
    <cheader :history-dirs="bd.historyDirs" :is-max="isMax">
    </cheader>
    <div class="main-area  ">
        <!-- <div class=" slide-bar z-depth-1 collection">
                
                <a href="#!" class="collection-item lighten-2"> <i class="material-icons secondary-content   ">rounded_corner</i> index1.scss </a>
                <a href="#!" class="collection-item active">page1.scss <i class="material-icons secondary-content">code</i></a>
                <a href="#!" class="collection-item">base.scss</a>
                <a href="#!" class="collection-item">page2.scss</a>
            </div> -->
        <file-list :list-data='bd.fileList'></file-list>
        <!-- <tree></tree> -->
        <editor :class="editor" :is-previewed="isPreviewed" :preview-cnt="bd.previewCnt">
        </editor>
    </div>
    <about></about>
    <footer>
        <a class="grey-text text-lighten-4  " href="#!">当前打开文件夹：{{bd.currentDir}}</a>
        <a class="grey-text text-lighten-4 right" href="#!">© 2016-2018 Tranway.cn, All rights reserved.</a>
    </footer>
</template>




<script>
const biz = require('./biz'); 
var bd  = biz.bd;
var bf = biz.bf;
import Cheader from './components/Header.vue'
import Button  from './components/Button.vue'
import Editor  from './components/Editor.vue'
import FileList  from './components/FileList.vue'
import About  from './components/About.vue'
var win = nw.Window.get(); 
 
module.exports =  {
    data:function  () {
        return { isPreviewed:true,isMax:false }
    } ,
    ready:function  () {
        // 初始化后执行
        console.log( this.fileList );

        //this.fileList=bd.fileList
        this.$set('bd',bd);
    },
    components: {
        Cheader,Button,Editor,FileList,About
    },  
    methods: {
        addBtcomp: function() {
            console.log(this);  
        } 
    },
    events:{
        "chdir":function (path) {
            //当目录变更时触发
            console.log(biz,bf);
             bf.changeCurrentDir(path);
             this.$broadcast('setContent',"");
        },
        'open-file':function  (file) {
            //当点击左侧文件列表时触发
            var cnt =bf.openFile(file);
            this.$broadcast('setContent',cnt,file);
        },
        'fileIsChanged':function  (chagneFlag,content,name) {
            // 当编辑器修改文件时触发
            console.log("app :",bd.previewCnt);
            bf.changFile(chagneFlag,content,name);
        },'savefile':function  () {
            // 当编辑器点击保存时触发
            bf.save();
        },togglePreview:function  () {
            // body...
             this.$broadcast('togglePreview');
        },min:function () {
            win.minimize();
        },max:function  () {
            this.isMax=true;
            win.maximize();
        },restore:function () {
            this.isMax=false;
            win.restore();
        },close:function () {
            win.close();
        },about:function () {
            this.$broadcast('showAbout');
              
        }
    }
}
</script>

<style lang="scss">
@import "scss/app.scss";
body {
    display: flex;
    height: 100vh;
    width: 100wh;
    flex-direction: column;

} 

.main-area {
    flex: 1;
    display: flex;
    align-items: stretch;
    
    .editor{
        position: relative;
        padding: 5px;
        @extend .z-depth-1;
         width: 100%;
    }
}

footer {
    color: darken(white, 15%);
    padding: 5px;
    background-color: $footer-bg-color;
}
</style>
