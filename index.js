const mdLinks = require("./lib/components/mdLinks");

mdLinks("./lib/examples/example1.md")
  .then((links) => {
    console.table(links);
  })
  .catch((error) => {
    console.error(error);
  });
