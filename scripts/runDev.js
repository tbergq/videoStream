import { execSync } from 'child_process';
import path from 'path';

const rootDir = path.join(__dirname, '..');

execSync('yarn build &', { cwd: rootDir, stdio: 'inherit' });
execSync('yarn start', { cwd: rootDir, stdio: 'inherit' });
