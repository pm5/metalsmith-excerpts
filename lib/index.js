
var debug = require('debug')('metalsmith-excerpts');
var extname = require('path').extname;
var cheerio = require('cheerio');

/**
 * Expose `plugin`.
 */

module.exports = plugin;

/**
 * A Metalsmith plugin to extract an excerpt from Markdown files.
 *
 * @param {Object} options
 * @return {Function}
 */

function plugin(options){
  return function(files, metalsmith, done){
    setImmediate(done);
    Object.keys(files).forEach(function(file){
      debug('checking file: %s', file);
      if (!html(file)) return;
      var data = files[file];

      debug('storing excerpt: %s', file);
      var $ = cheerio.load(data.contents.toString());
      var first = true;
      $('p').each(function () {
        var p = $(this).text();
        if (p && first && p.length > 20) {
          data.excerpt = p
          first = false;
        }
      })
    });
  };
}

/**
 * Check if a `file` is markdown.
 *
 * @param {String} file
 * @return {Boolean}
 */

function html(file){
  return /\.html?/.test(extname(file));
}
