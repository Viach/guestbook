'use strict';

import path from 'path';
import rollup from 'gulp-rollup';
import babel from 'rollup-plugin-babel';

export default function(gulp, plugins, args, config, taskTarget, browserSync) {
  let dirs = config.directories;
  let dest = path.join(taskTarget, dirs.scripts.replace(/^_/, ''));

  // Scripts
  gulp.task('scripts', () => {
    return gulp.src(path.join(dirs.source, dirs.scripts, '**/*.js'))
      .pipe(plugins.plumber())
      .pipe(rollup({
        // any option supported by Rollup can be set here.
        'format': 'iife',
        'plugins': [
          babel({
            presets: [
              [
                'es2015', {
                  'modules': false
                }
              ]
            ],
            babelrc: false,
            exclude: 'node_modules/**'
          })
        ],
        input: path.join(dirs.source, dirs.scripts, 'main.js')
      }))
      .pipe(gulp.dest(dest));
  });
}
