
'use strict';

import rename  from 'gulp-rename';
import svgstore from 'gulp-svgstore';
import inject from 'gulp-inject';
import path from 'path';

export default function(gulp, plugins, args, config, taskTarget, browserSync) {
  let dirs = config.directories;
  let dest = path.join(taskTarget, dirs.images.replace(/^_/, ''));
  // Svg
  gulp.task('svg-icons', function () {
    var svgs = gulp
        .src(path.join(dirs.source, dirs.icons, '*.svg'))
        .pipe(plugins.changed(dest))
        .pipe(rename({prefix: 'icon-'}))
        .pipe(svgstore({
          inlineSvg: true
        }));
    function fileContents(filePath, file) {
      return file.contents.toString();
    }
    return gulp
      .src('./src/_icons/sprite/sprite.svg')
      .pipe(inject(svgs, {
        transform: fileContents
      }))
      .pipe(gulp.dest(dest));
  });
}
