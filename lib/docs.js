var
   nodePath = require('path'),
   spawn = require('child_process').spawn;

/**
 * jsdoc postinstall script creates wrong symlink to temp directory.
 * Delete wrong link and rerun postinstall.js
 */
spawn('rm', ['-rf', './node_modules/jsdoc/node_modules/jsdoc']);
spawn('node', ['./node_modules/jsdoc/node/postinstall.js']);

module.exports = function(path, cb){
   var
      childProcess = spawn(
         './node_modules/.bin/jsdoc',
         [path, '-t', 'templates/haruki', '-d', 'console', '-q', 'format=json'],
         {cwd : nodePath.resolve(__dirname, '../')}
      ),
      stdOut = '',
      stdErr = '',
      error = null;

   childProcess.on('error', function(err){
      error = err;
   });

   childProcess.stdout.on('data', function(data){
      stdOut += data;
   });

   childProcess.stderr.on('data', function(data){
      stdErr += data;
   });

   childProcess.on('close', function(){
      var result;
      if (error){
         cb(error)
      }
      else if (stdErr){
         cb(new Error(stdErr));
      }
      else{
         try{
            result = JSON.parse(stdOut);
         }
         catch (e){
            error = e;
         }
         cb(error, result);
      }
   });
};