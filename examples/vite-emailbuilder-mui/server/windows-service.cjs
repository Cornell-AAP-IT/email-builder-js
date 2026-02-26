var Service = require("node-windows").Service;
var path = require("path");
var fs = require("fs");

console.log("Installing EmailBuilder.js Windows Service...");
console.log("Current time:", new Date().toISOString());

// Resolve paths relative to this script
var serverDir = __dirname;
var servicePath = path.join(serverDir, "serve.cjs");
var distPath = path.join(serverDir, "..", "dist");

// Check if the script file exists
if (!fs.existsSync(servicePath)) {
  console.error("ERROR: Service script not found at:", servicePath);
  process.exit(1);
}
console.log("Service script found at:", servicePath);

// Check if dist folder exists (build must be run first)
if (!fs.existsSync(distPath)) {
  console.error("ERROR: dist folder not found at:", distPath);
  console.error("Run 'npm run build' from the example directory first.");
  process.exit(1);
}
console.log("Dist folder found at:", distPath);

// Create the service
var svc = new Service({
  name: "email-builder-js-service",
  description: "EmailBuilder.js - Static file server for https://cornelurl.com/apps/email-builder",
  script: servicePath,
  nodeOptions: ["--max_old_space_size=2048"],
  env: [
    { name: "NODE_ENV", value: "production" },
    { name: "PORT", value: "3000" },
    { name: "VITE_BASE_PATH", value: "/apps/email-builder/" },
  ],
  workingDirectory: path.dirname(servicePath),
  restart: true,
  restartDelay: 5000,
  maxRestarts: 3,
  wait: 2,
  stopTimeout: 30,
});

svc.on("install", function () {
  console.log("Service installed successfully!");
  console.log("Service Name:", svc.name);
  console.log("Service Script:", svc.script);
  console.log("App will be available at: https://cornelurl.com/apps/email-builder/");
  console.log("Starting service...");
  svc.start();
});

svc.on("alreadyinstalled", function () {
  console.log("Service is already installed.");
  console.log("To uninstall, run: node windows-service-uninstall.cjs");
});

svc.on("invalidinstallation", function () {
  console.log("Invalid installation detected.");
  console.log("This could be due to: insufficient permissions, invalid path, or service already exists.");
});

svc.on("start", function () {
  console.log("Service started successfully!");
  console.log("EmailBuilder.js is running on port 3000");
  console.log("App accessible via: https://cornelurl.com/apps/email-builder/");
  console.log("Check Windows Event Viewer > Application for logs (source: email-builder-js-service)");
});

svc.on("stop", function () {
  console.log("Service stopped.");
});

svc.on("error", function (err) {
  console.error("Service error:", err.message);
});

console.log("Service Configuration:");
console.log("  Name:", svc.name);
console.log("  Description:", svc.description);
console.log("  Script:", svc.script);
console.log("  Working Directory:", svc.workingDirectory);
console.log("  Target URL: https://cornelurl.com/apps/email-builder/");

console.log("Attempting to install service...");
try {
  svc.install();
} catch (error) {
  console.error("Error during service installation:", error.message);
  console.error("Troubleshooting: Run as Administrator, verify paths, check node-windows is installed.");
}
