const fse = require('fs-extra');

const srcDir = `styles/tokens`;
const opubUI = `../../packages/opub-ui/styles`;

try {
  fse.copySync(srcDir, opubUI, { overwrite: true | false });
  console.log('copied to opub-ui');
} catch (err) {
  console.error(err);
}
