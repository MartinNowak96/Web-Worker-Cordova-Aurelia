import gulp from 'gulp';
import {CLIOptions, build as buildCLI} from 'aurelia-cli';
import transpile from './transpile';
import processMarkup from './process-markup';
import processCSS from './process-css';
import copyFiles from './copy-files';
import watch from './watch';
import project from '../aurelia.json';
import del from 'del';

let build = gulp.series(
  readProjectConfiguration,
  gulp.parallel(
    transpile,
    processMarkup,
    processCSS,
    copyFiles
  ),
  writeBundles,
  copyToCordova
);

let main;

if (CLIOptions.taskName() === 'build' && CLIOptions.hasFlag('watch')) {
  main = gulp.series(
    build,
    (done) => { watch(); done(); }
  );
} else {
  main = build;
}

function readProjectConfiguration() {
  return buildCLI.src(project);
}

function writeBundles() {
  return buildCLI.dest();
}

function copyToCordova() {   
  del(['../www/**/*'], {force:true});
  return gulp.src([
    '**/*',
    '!node_modules',
    'worker/**',
    '!node_modules/**',
    '!aurelia_project',
    '!aurelia_project/**',
    '!custom_typings',
    '!custom_typings/**',
    '!typings',
    '!typings/**',
    '!src',
    '!src/**',
    '!test',
    '!test/**',
    '!*.js',    
    '!*.json'

    ])
    .pipe(gulp.dest('../www'))
  }



export { main as default };
