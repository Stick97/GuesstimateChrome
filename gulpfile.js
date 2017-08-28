var gulp = require('gulp'),
    deporder = require('gulp-deporder'),
    stripdebug = require('gulp-strip-debug'),
    uglify = require('gulp-uglify'),
    open = require('gulp-open'),
    livereload = require('gulp-livereload'),

    devBuild = (process.env.NODE_ENV !== 'production'),
    
    folder = {
        src: 'src',
        build: 'build'
    }

gulp.task('js', function(){
    var jsbuild = gulp.src(folder.src + '/js/*')
        .pipe(deporder())
        .pipe(livereload());

    if(!devBuild){
        jsbuild = jsbuild
            .pipe(stripdebug())
            .pipe(uglify());
    }

    return jsbuild
        .pipe(gulp.dest(folder.build + '/js/'))
        .pipe(open({uri: 'http://reload.extensions', app:'chrome'}))
        .pipe(livereload());
})
gulp.task('everything', function(){
    var build = gulp.src([folder.src + '/**/*', '!' + folder.src + '/js/*'])

    return build.pipe(gulp.dest(folder.build));
})
gulp.task('jslibraries', function(){
    var jquerySrc = 'node_modules/jquery/dist/jquery.js',
        arriveSrc = 'node_modules/arrive/src/arrive.js'

    if(!devBuild){
        jquerySrc = 'node_modules/jquery/dist/jquery.min.js'
        arriveSrc = 'node_modules/arrive/minified/arrive.min.js'
    }

    var build = gulp.src([jquerySrc, arriveSrc]);

    return build.pipe(gulp.dest(folder.build + '/js/'));
})

gulp.task('watch', function(){
    livereload.listen();
    gulp.watch(folder.src + '/**/*', ['js', 'everything']);
})