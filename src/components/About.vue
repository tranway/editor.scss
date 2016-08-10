<template>
    <div id="modal1" class="modal">
        <div class="modal-content">
            <h1><a name="EDIT.SCSS" class="anchor" href="#edit-scss"><span class="header-link"></span></a>EDIT.SCSS</h1>
            <blockquote>
                <p>edit.scss 它是一个可视化的SCSS编辑器可动态预览生成的CSS代码。</p>
            </blockquote>
            <h2><a name="使用说明" class="anchor" href="#-"><span class="header-link"></span></a>使用说明</h2>
            <ol>
                <li>点击文件夹图标选择SCSS文件操作的目录。</li>
                <li>在左侧列表中会自动的列出选中文件夹中的所有SCSS文件。</li>
                <li>点击需要编辑的SCSS文件，程序会读取文件内容并显示在主编辑区。</li>
                <li>根据SCSS语言规则进行编辑。</li>
                <li>可点击眼睛的图标来打开预览。每当修改后，程序会自动生成最终的结果。</li>
                <li>编辑完成后可按<strong>CTRL+S</strong>，保存SCSS文件及在同目录下生成的CSS文件。</li>
                <li>鼠标移动到时钟的图标上会显示历史打开的文件夹。方便进行选择。 </li>
                <li>程序可以动态检测打开的文件夹，当有增加或删除SCSS文件时，会自动更新左侧的文件列表。 </li>
            </ol>
            <h2><a name="参考" class="anchor" href="#-"><span class="header-link"></span></a>参考</h2>
            <ul>
                <li><a  @click = "open('http://www.tranway.cn')"    href = "#" title="创威公司官网">创威公司官网</a></li>
                <li><a  @click = "open('http://sass-lang.com/')"    href = "#" title="SCSS官网">SCSS官网</a> </li>
                <li>此说明使用<a  @click = "open('https://github.com/guot/edit.markdown')"    href = "#" title="Edit.markdown">Edit.markdown</a>进行编辑排版</li>
            </ul>
            <p>© 2016-2018 Tranway.cn, All rights reserved.</p>
        </div>
        <div class="modal-footer">
            <a href="#!" class=" modal-action modal-close waves-effect waves-green btn-flat">关闭</a>
        </div>
    </div>
</template>
<script>
module.exports = { 
   
    data: () => {
            return {

            }
        },
        methods: {
            open: function(url) {
                // body...
                 nw.Shell.openExternal(url);
                 
            }
        },
        events: {
            showAbout: function() {
                $('#modal1').openModal();
            }
        }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ol {
    font-size: 16px;
}

h2 {
    text-decoration: strong;
    font-size: 24px;
}
</style>
