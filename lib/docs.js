var
   nodePath = require('path'),
   spawn = require('child_process').spawn;

module.exports = function(path, cb){
   var
      childProcess = spawn(
         nodePath.resolve(__dirname, '../node_modules/.bin/jsdoc'),
         [path, '-t', 'templates/haruki', '-d', 'console', '-q', 'format=json'],
         {cwd : nodePath.resolve(__dirname, '../node_modules/jsdoc')}
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