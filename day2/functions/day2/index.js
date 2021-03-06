const fs = require("fs");
const path = require("path");

function render(tpl, variables) {
  for (let key in variables) {
    const reg = new RegExp("\\$\\{" + key + "\\}", "g");
    tpl = tpl.replace(reg, variables[key]);
  }
  return tpl;
}

exports.main = async (event) => {
  let html = fs.readFileSync(path.resolve(__dirname, "./demo.html"), {
    encoding: "utf-8",
  });

  html = render(html, {
    ip: event.headers["x-real-ip"],
  });

  return {
    isBase64Encoded: false,
    statusCode: 200,
    headers: { "Content-Type": "text/html" },
    body: html,
  };
};
