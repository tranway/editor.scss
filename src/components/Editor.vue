<!-- this compoent  require global codemirror.js and lodash.js -->
<template>
    <div class="edit-body     cm-s-eclipse">
        <textarea id="{{_id}}" v-model="content" :class="{previewMod:isPreviewed}"></textarea>
          <textarea id="{{_previewid}}" class="preview" :value="previewCnt" v-if="isPreviewed" readonly="readonly"></textarea>  
        
    </div>
</template>
<script>
var _ = require('lodash');
var docs={};//打开文件内存缓存。
module.exports = {
    data:function() {
        return {isPreviewed:false}
    },computed: {
        _id: () => _.uniqueId('edit_'),
       /* _previewid: () => _.uniqueId('preview_')*/
    }, ready: function() {
        // 初始化完成
        console.log('isPreviewed',this.isPreviewed);
        
        /*var previewEdit = document.getElementById(this._previewid);
        this.previewEdit = CodeMirror.fromTextArea(previewEdit, {
            lineNumbers: true,
             mode:  "css" ,
             keyMap:"sublime",         
             matchBrackets:true,
             readOnly:true
        });*/
        var editarea = document.getElementById(this._id);
        this.editor = CodeMirror.fromTextArea(editarea, {
            lineNumbers: true,
             mode:  "sass" ,
             keyMap:"sublime",
             autoCloseBrackets: true,
             matchBrackets:true,
             readOnly:true
        });
        //设置编辑器保存快捷键
        this.editor.setOption("extraKeys", {
            'Ctrl-S': (cm) =>{
                this.$dispatch('savefile');               
            }
        });
        this.editor.on('changes', (editor,changes) =>{
            //当编辑器修改时触发。
            let ht = editor.getHistory();
            //判断是否已经还原到最初状态
            let cnt = editor.getValue();
            console.log('this.previewCnt:',this.previewCnt);

            var isOri = ht.done.filter(it => {return it.changes}).length == 0;
            if (!isOri) {
                //已经变更
                this.isChanged = true;
            } else {
                this.isChanged = false;
            }
            
            this.$dispatch('fileIsChanged',this.isChanged ,cnt,name); 
        })
        console.log('editor 初始化完成 '); 
    },props:['content','isChanged' ,'previewCnt'],
    events:{
        'setContent':function  (content,name) {    
            //  设置编辑器内容
            console.log('content:',content);
            if(!name){
                docs={} 
                let tdoc= CodeMirror.Doc("", 'sass', 0);
                this.editor.setOption('readOnly',true);
                this.editor.swapDoc(tdoc); 
                return ;
                
            }
            if(!docs[name]){
                docs[name]={} 
                docs[name].doc= CodeMirror.Doc(content, 'sass', 0);  
            }
            this.editor.setOption('readOnly',false);
            this.editor.swapDoc(docs[name].doc); 
            
            //this.editor.setValue(content);
        },
        'togglePreview':function  () {
            // body...
            this.isPreviewed = !this.isPreviewed; 
           if(this.isPreviewed){
                $('.CodeMirror').css({height:'70%'});

            }else{
                $('.CodeMirror').css({height:'100%'});
            }
            
            
        }
    }
}
</script>
<style lang="scss">
$roboto-font-path: "../fonts/roboto/";
@import "../scss/app.scss";

.edit-body 
{
     position: relative;  
    padding:5px;
    width: 100%;
     @extend .z-depth-1;


 }
 .previewMod{
     height: 70%; 
 }
.preview{
     position: absolute; z-index: 10; left: 0; bottom: 0; width: 100%; height: 30%; 
      @extend .z-depth-1; 
} 
    
.CodeMirror {
    /* Set height, width, borders, and global font properties here */
     font-family: microsoft yahei; 
     font-size: 15;
     position: absolute; z-index: 10; left: 0; top: 0; width: 100%; height: 100%;   
     background: #fafafa;  
}
</style>
