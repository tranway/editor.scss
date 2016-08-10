<template>
    <div>
        <ul id="dropdown" class="dropdown-content">
            <li  v-for=" dir in historyDirs"><a href="#!" @click="chdir(dir)">{{dir}}</a></li>
            <!--  <li class="divider"></li> -->
          
        </ul>
        <nav>
            <div class="nav-wrapper hoverable ">
                <a href="#" class="brand-logo center">Scss编辑器</a>
                <ul class="left hide-on-med-and-down">
                    <li> <a class=" waves-light  " @click='openDirector()' title="打开文件夹"><i class="material-icons">folder_open</i></a></li>
                    <li> </li>
                    <li><a class="  waves-light  " title="显示预览" @click='togglePreview()'><i class="material-icons">visibility</i></a></li>
                    <li><a class="  waves-light dropdown-button "  data-hover="true" 
                    data-alignment="left" data-constrainwidth="false" data-belowOrigin="true"
                     data-activates="dropdown" title="打开文件夹历史记录"><i class="material-icons">history</i></a></li> {{ currentDir }}
                </ul>
                <ul class="right hide-on-med-and-down">
                    <li><a class="waves-light" @click="this.$dispatch('about')" title="关于"><i class="material-icons">info_outline</i></a></li>
                    <li><a class="waves-light" @click="this.$dispatch('min')" title="最小化"><i class="material-icons">remove</i></a></li>
                    <li v-if='!isMax'> <a class="waves-light" @click="this.$dispatch('max')" title="最大化"><i class="material-icons">settings_overscan</i></a></li>
                    <li v-if='isMax'> <a class="waves-light" @click="this.$dispatch('restore')" title="还原"><i class="material-icons">filter_none</i></a></li>
                    <li><a class="waves-light" @click="this.$dispatch('close')" title="关闭"><i class="material-icons">close</i></a></li>
                </ul>
            </div>
            <input class=" waves-light  hide " id="fileDialog" type="file" />
            <input class=" waves-light  hide " id="directDialog" type="file" @change='chdir()' v-model="file" nwdirectory />
        </nav>
    </div>
</template>
<script>
module.exports = {
    data: () => {
        return {
            currentDir: '',
            previewFlag:false
        }
    },
    props: {
        'txt': {
            default: 'this is button'
        },
        historyDirs:{},isMax:{}
    },
    ready:function  () {
        // body...
        $(".dropdown-button").dropdown();
    },
    methods: {
        openDirector: function() {
            //打开文件夹
            $('#directDialog').trigger('click');

        },
        chdir: function(dir) {
            this.$dispatch('chdir',dir|| this.file);
        },
        togglePreview:function  () {
            this.previewFlag= !this.previewFlag;
             this.$dispatch('togglePreview');
        },
        about:function  () {
            this.$dispatch('chdir',dir|| this.file);
        }

    }
}
</script>
<style lang="scss">
</style>
