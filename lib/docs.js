var spawn = require('child_process').spawn;

module.exports = function(path, cb){
   var
      childProcess = spawn('./node_modules/.bin/jsdoc', [path, '-t', 'templates/haruki', '-d', 'console', '-q', 'format=json']),
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
         cb(new Error(stdErr))
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