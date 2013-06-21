var path = require('path');
var swig = require('swig')

module.exports = function(grunt) {

  grunt.registerMultiTask( 'swig', 'Process Handlebars templates', function() {
    var opts = this.options();

    swig.init({
      root: [opts.templates],
      allowErrors: true
    });

    this.files.forEach( function( file ) {

      file.src.forEach( function( filepath ) {
        // read file
        var src = grunt.file.read( filepath );

        var context = {
          basename: path.basename(filepath, path.extname(filepath)),
          isDev: grunt.option('dev')
        };

        // process source into page template
        var splitPath = filepath.split( path.sep );
        // remove leading directory
        if (splitPath.length > 2) {
          splitPath.splice(0, 2);
        }

        var output = swig.compile(src)(context);
        var dest = file.dest + splitPath.join( path.sep );

        grunt.file.write(dest, output);
      });
    });


  });

};