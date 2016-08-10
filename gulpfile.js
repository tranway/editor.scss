 var webpack = require('webpack-stream');
 // var webpack = require('webpack');
 var webpackConfig = require('./build/webpack.prod.conf.js');
 var WebpackDevServer = require('webpack-dev-server');
 var vinylPaths = require('vinyl-paths');
 var plumber = require('gulp-plumber');
 var merge = require('webpack-merge')
 require('shelljs/global');
 var gulp = require('gulp'),
     del = require('del'),
     fs = require('fs');
 livereload = require('gulp-livereload'),

     runSequence = require('gulp-run-sequence');
 var utils = require('./build/utils')

 var path = require('path')
 var config = require('./config')

 var assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)


 console.log('assetsPath:', assetsPath, config.distRoot);


 gulp.task('webpack', function() {
     livereload.listen();
     process.env.NODE_ENV = 'production';
     try {
         rm('-rf', assetsPath)
         mkdir('-p', assetsPath)
         cp('-R', 'src/lib', assetsPath)

         webpackConfig.watch = true;


         gulp.src('src/index.js')
            .pipe(plumber())
             .pipe(webpack(webpackConfig, null, function(err, stats) {
                 if (!err) {
                     console.log("webpack. finished compile:", stats.toString({
                         colors: true,
                         chunks: false, 
                          children: false
                            
                     }));
                 }else{
                    console.log('webpack compile error:',err);
                 }


             })) 
             .pipe(gulp.dest(assetsPath))
             .on('data', function(file) {

                 fp = file.path;

                 let ind = fp.search(/index.html$/);
                 if (ind > -1) {
                     console.log("reload.path:", fp);

                     livereload.changed(fp);
                 }

             });

     } catch (e) {
         console.log(e);
     }

 })


 gulp.task('init:dev', function() {
     rm('-rf', config.distRoot)
     mkdir('-p', assetsPath)
     cp('src/package.json', 'dist/');
     if (exec('cd dist&&npm install"').code !== 0) {
         echo('Error: Git commit failed');
         exit(1);
     }

     cp('-R', 'dist_temp/dev/', config.distRoot);
 });
 gulp.task('init:prod', function() {
     rm('-rf', config.distRoot)
     mkdir('-p', assetsPath)
     cp('-R', 'dist_temp/prod/', config.build.assetsRoot);
 });
 gulp.task('default', ['webpack']);

 //gulp.task('default', ['init:dev']);
