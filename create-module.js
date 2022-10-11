var fs = require('fs');
var baseDir = './src/modules/';

const moduleName = process.env.npm_config_moduleName;

const basicFolders = [
  '/components',
  '/hooks',
  '/mutations',
  '/queries',
  '/recoil',
];

if (!moduleName)
  return console.log(
    "It's necccesary define the arg '--moduleName' in the comnmand"
  );
const path = baseDir + process.env.npm_config_moduleName;
fs.mkdir(path, err => {
  if (err) {
    console.error(`The module "${moduleName}", exist in the current project`);
    return;
  }

  fs.writeFile(path + '/index.tsx', '//Add your code here', function (err) {
    if (err) throw err;
    console.info(`index.tsx is created successfully in the path: ${path}.`);
  });

  basicFolders.forEach(element => {
    fs.mkdirSync(path + element);
    console.info(`Created subfolder: ${element}`);
    fs.writeFile(
      path + element + '/index.tsx',
      '//Add your code here',
      function (err) {
        if (err) throw err;
        console.info(
          `index.tsx is created successfully in the path: ${path}${element}.`
        );
      }
    );
  });

  console.info(`Module ${moduleName} created in the path ${path}`);
});
