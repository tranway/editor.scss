  <template  >
      <div class="slide-bar z-depth-1 collection with-header">
        <item   >
        </item>
    </div>
  </template>
 

    <script>
    import Vue from 'vue'

    // demo data
    var data = {
        name: '目录',
        children: [
            {
            name: '1-1.readme.md'
            },
            {
            name: '1-2.index.html'
            },
            {
            name: '1-3.lic.txt',
            children: [
            {
                name: '1-3-1.Src',
                children: [
                    {
                    name: '1-3-1-1.javascriptcode1.js'
                    }, {
                    name: '1-3-1-2.javascriptcode2.js'
                    }
                ]
            }   ]
        }]
    }

    // define the item component
    var itemtemplate  =` <div  ">
            <div 
            @click="toggle"
            @dblclick="changeType">
               <a href="#!" :class="{collection-header: isFolder,collection-item:!isFolder} class="  no-pad-r lighten-2"> <i class="material-icons secondary-content   ">rounded_corner</i>  
                <span v-if="isFolder">
                    [{{open ? '-' : '+'}}]
                </span>{{model.name}}
                </a>
            </div>
            <div v-show="open" class="collection-item " v-if="isFolder">
                <item  :class="{active:!isFolder&&iscurrent}"
                class="no-pad-r"
                v-for="model in model.children"
                :model="model">
                </item>
                <div @click="addChild">
                    +
                </div>
            </div>
        </div>`;
 var item ={
        name:"item",
        template: itemtemplate,
        props: {
            model:{default:()=>data}
        },
        data: function() {
            return {
                open: false
            }
        },
        computed: {
            isFolder: function() {
                return this.model.children &&
                    this.model.children.length
            },
            iscurrent:function  () {
                return true;
            }
        },
        methods: {
            toggle: function() {
                if (this.isFolder) {
                    this.open = !this.open
                }
            },
            changeType: function() {
                if (!this.isFolder) {
                    Vue.set(this.model, 'children', [])
                    this.addChild()
                    this.open = true
                }
            },
            addChild: function() {
                this.model.children.push({
                    name: '新项目'
                })
            }
        }
   };
  module.exports = {
        data:function  () {
            return {};
        },
        props:{'treeData':{default:()=>data}},
        components:{item:item}
           
  }
    </script>


    <style>
   .collection .collection-item{
        padding-right:0;
   }
   
    </style>