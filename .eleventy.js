const fs = require("fs");
const htmlmin = require("html-minifier");

module.exports = function (eleventyConfig) {
  if (process.env.ELEVENTY_PRODUCTION) {
    eleventyConfig.addTransform("htmlmin", htmlminTransform);
  } else {
    eleventyConfig.setBrowserSyncConfig({
      callbacks: { ready: browserSyncReady },
    });
  }

  eleventyConfig.setLiquidOptions({
    dynamicPartials: true,
  });

  // Passthrough
  eleventyConfig.addPassthroughCopy({ "src/_11ty/_static/*.*": "." });

  // Watch targets
  eleventyConfig.addWatchTarget("./src/_11ty/_tailwind/");

  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  var pathPrefix = "";
  if (process.env.GITHUB_REPOSITORY) {
    pathPrefix = process.env.GITHUB_REPOSITORY.split("/")[1];
  }

  return {
    passthroughFileCopy: true,
    dir: {
      input: "./src/",
      includes: "/_11ty/_includes/",
      layouts: "/_11ty/_layouts/",
      data: "/_11ty/_data/",
      output: "./_site/",
    },
    pathPrefix,
  };
};

function browserSyncReady(err, bs) {
  bs.addMiddleware("*", (req, res) => {
    const content_404 = fs.readFileSync("_site/404.html");
    // Add 404 http status code in request header.
    res.writeHead(404, { "Content-Type": "text/html; charset=ETF-8" });
    // Provides the 404 content without redirect.
    res.write(content_404);
    res.end();
  });
}

function htmlminTransform(content, outputPath) {
  if (outputPath.endsWith(".html")) {
    let minified = htmlmin.minify(content, {
      useShortDoctype: true,
      removeComments: true,
      collapseWhitespace: true,
    });
    return minified;
  }
  return content;
}