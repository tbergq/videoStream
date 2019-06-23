// @flow

import { execSync } from 'child_process';
import path from 'path';

const rootDir = path.join(__dirname, '..');

execSync('yarn webpack --mode development &', {
  cwd: rootDir,
  stdio: 'inherit',
});
execSync('yarn workspace @tbergq/vs-server dev', {
  cwd: rootDir,
  stdio: 'inherit',
});
