const fse = require('fs-extra');

const srcDir = `styles/tokens`;
const opubUI = `../../packages/opub-ui/styles`;
const opubViz = `../../packages/opub-viz/styles/tokens`;

try {
  fse.copySync(srcDir, opubUI, { overwrite: true | false });
  console.log('copied to opub-ui');
  fse.copySync(srcDir, opubViz, { overwrite: true | false });
  console.log('copied to opub-viz');
} catch (err) {
  console.error(err);
}
