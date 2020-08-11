const core = require('@actions/core');
const { exec } = require('./utils');

const setup_cml = async () => {
  const version = core.getInput('version');

  try {
    core.info('Unintalling previous CML');
    await exec('sudo npm uninstall -g @dvcorg/cml');
  } catch (err) {
    try {
      await exec('npm uninstall -g @dvcorg/cml');
    } catch (err) {}
  }

  try {
    core.info(`Intalling CML version ${version}`);
    await exec(
      `sudo npm i -g @dvcorg/cml${version !== 'latest' ? `@${version}` : ''}`
    );
  } catch (err) {
    await exec(
      `npm i -g @dvcorg/cml${version !== 'latest' ? `@${version}` : ''}`
    );
  }
};

(async () => {
  try {
    await setup_cml();
  } catch (error) {
    core.setFailed(error.message);
  }
})();