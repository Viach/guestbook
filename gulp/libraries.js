'use strict';

import path from 'path';

export default function(gulp, plugins, args, config, taskTarget, browserSync) {
  let dirs = config.directories;
  let dest = path.join(taskTarget, dirs.scripts.replace(/^_/, ''));

  // Libraries
  gulp.task('libraries', () => {
    return gulp.src(path.join(dirs.source, dirs.libraries, '**/*.js'))
      .pipe(plugins.plumber())
      .pipe(gulp.dest(dest + '/libs'));
  });
}
