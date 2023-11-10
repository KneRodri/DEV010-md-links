const app = require('./app');

const mdLinks = (filePath, validate) => {
    return new Promise((resolve, reject) => {
        if (app.checkPathExtension(filePath)) {
            app.existPath(filePath)
                .then(() => app.readFiles(filePath))
                .then((links) => {
                    if (validate) {
                        const validatedLinkPromise = links.map(link => app.validateLink(link));
                        Promise.all(validatedLinkPromise)
                            .then(validateLinks => resolve(validateLinks))
                            .catch(validationError => reject(validationError));
                    } else {
                        resolve(links);
                    }
                })
                .catch((error) => reject(error));
        } else {
            reject('File extension is not supported');
        }
    });
};
module.exports = mdLinks;

// const mdLinks = (filePath, validate) => {
//     return new Promise((resolve, reject) => {
//         if (app.checkPathExtension(filePath)) {
//             app.existPath(filePath)
//                 .then(() => app.readFiles(filePath))
//                 .then((links) => {
//                     if (validate) {
//                         const validatedLinkPromise = links.map(link => app.validateLink(link));
//                         Promise.all(validatedLinkPromise)
//                             .then(validateLink => resolve(validateLink))
//                             .catch(validationError => reject(validationError));
//                     } else {
//                         resolve(links);
//                     }
//                 })
//                 .catch((error) => reject(error));
//         } else {
//             reject('File extension is not supported');
//         }
//     });
// };
