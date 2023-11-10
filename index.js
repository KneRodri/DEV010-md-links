const mdLinks = require("./lib/components/mdLinks");

mdLinks("./lib/examples/example1.md")
  .then(links => {
    console.table(links);
  })
  .catch((error) => {
    console.error(error);
  })
mdLinks("./lib/examples/prueba.md", true)
  .then(links => {
    console.table(links);
  })
  .catch((error) => {
    console.error(error);
  })
mdLinks("./lib/examples/README.md", false)
  .then(links => {
    console.table(links);
  })
  .catch((error) => {
    console.error(error);
  });