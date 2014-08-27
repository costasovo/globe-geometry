gulp = require 'gulp'

GulpEste = require 'gulp-este'
runSequence = require 'run-sequence'

yargs = require 'yargs'
_ = require 'lodash'

este = new GulpEste __dirname, true, '../../../..'

paths =
  coffee: 'globe-geometry/**/*.coffee'
  scripts: [
    'bower_components/closure-library/**/*.js'
    'globe-geometry/**/*.js'
  ]
  unittest: [
    'globe-geometry/**/*_test.js'
  ]
  compiler: 'bower_components/closure-compiler/compiler.jar'
  externs: []
  packages: './*.json'

dirs =
  googBaseJs: 'bower_components/closure-library/closure/goog'
  watch: ['globe-geometry']

gulp.task 'coffee', ->
  este.coffee paths.coffee

gulp.task 'deps', ->
  este.deps paths.scripts

gulp.task 'concat-deps', ->
  este.concatDeps()

gulp.task 'unittest', ->
  este.unitTest dirs.googBaseJs, paths.unittest

gulp.task 'transpile', (done) ->
  runSequence 'coffee', done

gulp.task 'js', (done) ->
  runSequence [
    'deps' if este.shouldCreateDeps()
    'concat-deps'
    'unittest'
    done
  ].filter((task) -> task)...

gulp.task 'build', (done) ->
  runSequence 'transpile', 'js', done

gulp.task 'compile', (done) ->
  runSequence 'build', 'run-compile-concat', 'run-compile-min', done

gulp.task 'run-compile-concat', ->
  runCompile
    compilation_level: 'WHITESPACE_ONLY'
    debug: true
    formatting: 'PRETTY_PRINT'

gulp.task 'run-compile-min', ->
  runCompile()

runCompile = (params) ->
  namespaces = este.getProvidedNamespaces './tmp/deps.js', /\['(globeGeometry\.[^']+)/g
  defaults =
    closure_entry_point: namespaces # ensures that whole este-library is checked by compiler
    externs: paths.externs
    generate_exports: true

  flags = _.merge defaults, params

  este.compile paths.scripts, 'dist',
    fileName: 'globeGeometry.min.js'
    compilerPath: paths.compiler
    compilerFlags:
      flags

gulp.task 'watch', ->
  este.watch dirs.watch,
    coffee: 'coffee'
    js: 'js'
  , (task) -> gulp.start task

gulp.task 'run', (done) ->
  runSequence 'watch', done

gulp.task 'default', (done) ->
  runSequence 'build', 'run', done

gulp.task 'bump', ['compile'], (done) ->
  este.bump './*.json', yargs, done