const py = require('python-shell');



let options = {
    mode: 'text',
    pythonPath: '/home/arturo/virtualenv/ml/bin/python',
    pythonOptions: ['-u'], // get print results in real-time
    scriptPath: '/home/arturo/documents/diplomado/loldata/python',
    args: [-0.58555118,  0.44308731, -0.81616605, -0.6856315 ,  0.25881508,
        -0.60760662,  0.33737662,  1.35112967, -0.3516955 , -0.61677804,
         0.53291148, -0.46107132,  1.21907951, -0.20491036,  0.25881508,
        -0.60760662,  0.33737662,  1.35112967, -1.        ,  1.0702591 ,
        -0.94233752, -0.7365349 , -0.96665725, -0.76412867, -0.66154119,
        -0.288916  , -0.72424708, -0.50489518, -0.76412867]
  };
  
py.PythonShell.run('test.py', options, function (err, results) {
if (err) throw err;
// results is an array consisting of messages collected during execution
console.log('results: %j', results);
});