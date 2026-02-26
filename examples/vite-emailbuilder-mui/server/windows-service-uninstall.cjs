var Service = require('node-windows').Service;
var path = require('path');

console.log('Starting Windows Service Uninstallation...');
console.log('Current time:', new Date().toISOString());

var serverDir = __dirname;
var servicePath = path.join(serverDir, 'serve.cjs');

var svc = new Service({
  name: 'email-builder-js-service',
  description: 'EmailBuilder.js - Static file server for https://infra.aap.cornell.com/apps/email-builder',
  script: servicePath,
});

svc.on('uninstall', function () {
  console.log('Service uninstalled successfully!');
  console.log('Service Name:', svc.name);
  console.log('You can reinstall with: node windows-service.cjs');
});

svc.on('doesnotexist', function () {
  console.log('Service does not exist or is not installed.');
  console.log('Service Name:', svc.name);
  console.log('Nothing to uninstall.');
});

svc.on('stop', function () {
  console.log('Service stopped before uninstall.');
});

svc.on('error', function (err) {
  console.error('Error during uninstall:', err.message);
});

console.log('Service Configuration:');
console.log('  Name:', svc.name);
console.log('  Description:', svc.description);
console.log('  Script:', svc.script);

console.log('Attempting to uninstall service...');
try {
  svc.uninstall();
} catch (error) {
  console.error('Error during service uninstallation:', error.message);
  console.error('Troubleshooting: Run as Administrator, stop the service manually first.');
}
