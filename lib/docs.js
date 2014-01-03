var spawn = require('child_process').spawn;

module.exports = function(path, cb){
   var
      childProcess = spawn('./node_modules/.bin/jsdoc', [path, '-t', 'templates/haruki', '-d', 'console', '-q', 'format=json']),
      stdOut = '',
      stdErr = '';

   childProcess.stdout.on('data', function(data){
      stdOut += data;
   });

   childProcess.stderr.on('data', function(data){
      stdErr += data;
   });

   childProcess.on('close', function(){
      var
         error = null,
         result;
      if (stdErr){
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