import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

console.log('--- Step 1: Building project for production ---');
execSync('npm run build', { stdio: 'inherit' });

const distDir = path.resolve('dist');
const zipName = 'nchm-cpanel-deploy.zip';
const zipPath = path.resolve(zipName);

// Verify .htaccess
const publicHtaccess = path.resolve('public', '.htaccess');
const distHtaccess = path.resolve(distDir, '.htaccess');
if (fs.existsSync(publicHtaccess) && !fs.existsSync(distHtaccess)) {
  fs.copyFileSync(publicHtaccess, distHtaccess);
}

console.log(`\n--- Step 2: Packaging dist folder into ${zipName} ---`);
if (fs.existsSync(zipPath)) {
  fs.unlinkSync(zipPath);
}

if (process.platform === 'win32') {
  execSync(`powershell -NoProfile -Command "Get-ChildItem -Path 'dist' -Force | Compress-Archive -DestinationPath '${zipName}' -Force"`, { stdio: 'inherit' });
} else {
  execSync(`cd dist && zip -r ../${zipName} .`, { stdio: 'inherit' });
}

const stats = fs.statSync(zipPath);
const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
console.log(`\nDone! Package created: ${zipName} (${sizeMB} MB)`);
console.log('Ready to upload and extract directly inside cPanel public_html/');

