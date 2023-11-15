const fs = require('fs');
const path = require('path');
const validateLink = require('./validate');

const extensionMD = [
    '.md', '.mkd', '.mdwn', '.mdown', '.mdtxt', '.mdtext', '.markdown', '.text',
];
/** Return true if path is absolute
* @param {String} filePath
* @returns {Boolean}
*/
const isAbsolute = (filePath) => path.isAbsolute(filePath);

/** If the path is relative, transform it to absolute
* @param {String} filePath
* @returns {String}
*/
const transformPath = (filePath) => path.resolve(filePath);

/** Check if the route exists
 * @param {String} filePath
 * @returns {Promise}
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

/** Check the extension of the route
* @param {String} filePath
* @returns {Boolean}
*/
const checkPathExtension = (filePath) => {
    const extension = path.extname(filePath);
    const pathIsMarkdow = extensionMD.includes(extension);
    return pathIsMarkdow;
}

/** Reads the file and returns its contents
* @param {String} filePath
* @returns {Promise}
*/
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

/** Extracts the links found within the same
* @param {String} filePath - The path of the file containing the data.
* @param {String} data - The text data from which to extract links.
* @returns {Promise} - A promise that resolves with an array of validated links.
*/
const extractLinks = (data, filePath) => {
   const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
   const links = [];
   let match;

   while ((match = linkRegex.exec(data)) !== null) {  
    const text = match[1];
    const href = match[2];
    const link = {
        href,
        text,
        filePath,
    };
    if (validateLink) {
        const validatedLinkPromise = validateLink(link);
        links.push(validatedLinkPromise);
    } else {
        links.push(Promise.resolve(link));
    }
   }
   return Promise.all(links);
};


module.exports = {
    isAbsolute,
    transformPath,
    existPath,
    readFiles,
    checkPathExtension,
    extractLinks,
};
