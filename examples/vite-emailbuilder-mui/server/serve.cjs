/**
 * Static file server for EmailBuilder.js production build.
 * Serves the dist folder with SPA fallback for client-side routing.
 * Used by the Windows service.
 */
var express = require("express");
var path = require("path");

var PORT = parseInt(process.env.PORT || "3000", 10);
var BASE_PATH = process.env.VITE_BASE_PATH || "/apps/email-builder/";
var distPath = path.join(__dirname, "..", "dist");

var app = express();

// Normalize base path (ensure leading slash, trailing slash for directory)
var basePath = BASE_PATH.startsWith("/") ? BASE_PATH : "/" + BASE_PATH;
if (!basePath.endsWith("/")) {
  basePath += "/";
}

// Serve static files from dist at the base path
app.use(basePath, express.static(distPath, { index: false }));

// SPA fallback: serve index.html for any route under base path
app.get(basePath + "*", function (req, res) {
  res.sendFile(path.join(distPath, "index.html"));
});

// Redirect root and base path without trailing slash
if (basePath !== "/") {
  app.get("/", function (req, res) {
    res.redirect(301, basePath);
  });
  var baseNoSlash = basePath.slice(0, -1);
  app.get(baseNoSlash, function (req, res) {
    res.redirect(301, basePath);
  });
}

app.listen(PORT, function () {
  console.log(
    "EmailBuilder.js server running at http://localhost:" + PORT + basePath
  );
  console.log("Serving dist from:", distPath);
});
