const http = require("http");
const { readFileSync } = require("fs");

// get all files
const home_page = readFileSync("./navbar-app/index.html");
const styles = readFileSync("./navbar-app/styles.css");
const browser_js = readFileSync("./navbar-app/browser-app.js");
const logo_svg = readFileSync("./navbar-app/logo.svg");

const server = http.createServer((req, res) => {
  const url = req.url;
  if (url === "/") {
    res.writeHead(200, { "content-type": "text/html" });
    res.write(home_page);
    res.end();
  } else if (url === "/styles.css") {
    res.writeHead(200, { "content-type": "text/css" });
    res.write(styles);
    res.end();
  } else if (url === "/browser-app.js") {
    res.writeHead(200, { "content-type": "text/javascript" });
    res.write(browser_js);
    res.end();
  } else if (url === "/logo.svg") {
    res.writeHead(200, { "content-type": "image/svg+xml" });
    res.write(logo_svg);
    res.end();
  } else if (url === "/about") {
    res.writeHead(200, { "content-type": "text/html" });
    res.write("<h1>About Page</h1>");
    res.end();
  } else {
    res.writeHead(200, { "content-type": "text/html" });
    res.write("<h1>Page not found</h1>");
    res.end();
  }
});

server.listen(5000, () => {
  console.log("Server started on http://localhost:5000");
});
