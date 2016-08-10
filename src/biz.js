const path = require('path');
const _ = require('lodash');
const chokidar = require('chokidar');//文件监控
/*业务处理*/
 
const sass = require('node-sass');
var  data = {
    fileList: [],
    currentDir: '',
    historyDirs:[],
    previewCnt:''
}
const methods = {
    changeCurrentDir: changeCurrentDir,
    openFile: openFile,
    changFile: changFile,
    save: save
}
const fs = require('fs');
var currentFile = ""; //当前打开的文件 


restoreConfig();
watchDir();

 


function changeCurrentDir(fpath) {
    // 当选择目录后执行
    
    console.log('change dir is:', fpath);
   	data.historyDirs= _.union([fpath], data.historyDirs);
   	if(data.historyDirs.length>3){
   		data.historyDirs=_.dropRight(data.historyDirs);
   	}
   	console.log('historyDirs is :',data.historyDirs);
    if (_.isEmpty(fpath)) return;
    data.currentDir = path.normalize(fpath + '/');
    data.fileList = [];
    var list = fs.readdirSync(fpath)
    var result = [];
    list.forEach(function(file) {
        let pfile = fpath + '/' + file;
        console.log(file);
        if (file.search(/scss$/i) == -1) return; //不是SCSS文件不加入到列表中。 

        fs.stat(pfile, function(err, stat) {
            // 检测文件类型
            if (stat && !stat.isDirectory()) {
                data.fileList.push({
                    name: file,
                    conent: "",
                    isChanged: false,
                    abspath: pfile, //文件的绝对路径。
                    cssfile:pfile.replace(/scss$/i,'css')
                });
            }
        })
    })
    watchDir();

}

function openFile(name) {
    //打开文件 
    let filename = path.normalize(data.currentDir + name);
    console.log(path)
    var cnt = fs.readFileSync(filename, 'utf-8');
    let fileObj = _.find(data.fileList, {
        'name': name
    });
    fileObj.content = cnt;
    currentFile = name;
    return cnt;
}

function changFile(chagneFlag, content) {
    // 当文件修改时执行。
    let fileObj = _.find(data.fileList, {
        'name': currentFile
    });
    console.log('doc has change:',content);
    fileObj.content = content;
    fileObj.isChanged = chagneFlag;
    gencss(content);
    


}

function gencss (conent,saveflag) {
	// body...
	console.log('gencss:',conent);
	let fileObj = _.find(data.fileList, {'name': currentFile});
 	 sass.render({
 	 		file:fileObj.abspath,
 	        data: conent,
 	    }, function(err, result) { /*...*/
 	        if (err) {
 	        	let errmsg="Parser Error:\n";
			    /*let errmsg="error status:["+err.status+"]";*/
			    errmsg=errmsg+"@"+err.line+" 行，"+err.column+" 列\n";
			    errmsg=errmsg+" "+err.message+"\n";
			 
				data.previewCnt =errmsg;
 	            console.log("gentcss err:", errmsg);
 	            return;
 	        }
 	        try {
 	            
 	            data.previewCnt = result.css.toString();
 	            console.log(data.previewCnt);
 	            if (saveflag) {
 	                savefile(fileObj.cssfile, result.css);
 	            }
 	        } catch (e) {
 	        	console.log("gencss error:",e);
 	        }


 	    });
 	   

	
 
}

function save () {
	// 保存文件
	let fileObj = _.find(data.fileList, {
        'name': currentFile
    });
    console.log('save content:',fileObj.content);
    if (fileObj) {       
    	savefile(fileObj.abspath, fileObj.content);
        fileObj.isChanged = false;
        gencss(fileObj.content,true);
    }
	
}


function savefile(filename,content) {
    // 保存当前编辑的文件
      !_.isEmpty(content)&&fs.writeFile(filename, content, (err) => {
            if (err) throw err; 
     });  
    
      
}

/**
 * 监控目录，路径为data.currentDir
 */
 
function watchDir() {
	if(!data.currentDir){
		return ;
	}
    var watcher = chokidar.watch(data.currentDir+"*.scss",{}).on('all', (event, fpath) => {
        console.log(event, fpath);
         let filename=path.basename(fpath);
        let fileObj = _.find(data.fileList, {'name': filename});
        let hasfile =_.includes(data.fileList, filename);
       
        if(event==='add'&&!fileObj){
        	data.fileList.push({
                    name: filename,
                    conent: "",
                    isChanged: false,
                    abspath: fpath, //文件的绝对路径。
                    cssfile:fpath.replace(/scss$/i,'css')
                })
        }
        if(event=='unlink'&&fileObj){
        	data.fileList=_.dropWhile(data.fileList, function(o) { return  o.name==fpath; });
        }
    }); 
}
function restoreConfig () {
	// body...
	//加载配置
	let config =(localStorage.config&&JSON.parse(localStorage.config))||{};

	config.fileList=config.fileList&&config.fileList.filter(function(fileObj) {  
		 try {
		     fs.accessSync(configDir, fs.F_OK);
		     return true;
		 } catch (e) {
		     return false;
		 }

		 
    });
    data =config;
}

 


/*处理Native事件*/
var win = nw.Window.get();
 
// Listen to the minimize event
win.on('closed', function() {
	try{
		localStorage.config=JSON.stringify(data); 
	}catch(e){
		console.log('close is error:',e);
	}

	 win = null;
});


module.exports = {
    bd: data,
    bf: methods
}