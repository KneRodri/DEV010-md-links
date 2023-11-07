const fs = require('fs');
const path = require('path');
// const { marked } = require('marked');

const extensionMD = [
    '.md', '.mkd', '.mdwn', '.mdown', '.mdtxt', '.mdtext', '.markdown', '.text',
];
/** Return true if path is absolute
* @param {String} filePath
* @returns {String}
*/
const isAbsolute = (filePath) => path.isAbsolute(filePath);

/** Transform the path to absolute
* @param {String} filePath
* @returns {String}
*/
const transformPath = (filePath) => {
    return path.resolve(filePath);
};

/** Valida si el formato del archivo es válido.
 * @param {String} filePath
 */
const existPath = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.access(filePath, fs.constants.F_OK, (error) => {
            if (error) {
                reject('The path/file does not exist');
            } else {
                resolve('The path/file exist');
            }
        });
    });
}

const checkPathExtension = (filePath) => {
    const extension = path.extname(filePath);
    const pathIsMarkdow = extensionMD.includes(extension);
    return pathIsMarkdow;
}

const readFiles = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (error, data) => {
            if (error) {
                reject('Could not read the file' + error);
            } else {
                const links = extractLinks(data, filePath);
                resolve(links);
            }
        });
    });
};

const extractLinks = (data, file) => {
   const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
   const links = [];
   let match;

   while ((match = linkRegex.exec(data)) !== null) {
    const text = match[1];
    const href = match[2];
    const link = {
        href,
        text,
        file,
    };
    links.push(link);
   }
   return links;
};

module.exports = {
    isAbsolute,
    transformPath,
    existPath,
    readFiles,
    checkPathExtension,
    extractLinks,
};
