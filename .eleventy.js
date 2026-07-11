module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/styles.css");
  eleventyConfig.addPassthroughCopy("src/script.js");

  return {
    dir: { input: "src", output: "dist" },
    htmlTemplateEngine: "njk",
  };
};
