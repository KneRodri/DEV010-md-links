const fetch = require('node-fetch');

/** Validate links by checking the status
* @param {String} filePath
* @returns {Promise}
*/
const validateLink = (filePath) => {
    if (!filePath.href) {
        return {
            ...filePath,
            isValid: false,
            isBroken: true,
            status: 'No URL',
       };
    }
    return fetch(filePath.href) 
        .then((response) => {
            if (response.ok) {
                return {
                    ...filePath,
                    status: response.status,
                    statusText: response.statusText,
                    isValid: true,
                    isBroken: false,
                };
            } else {
                if (response.status === 400) {
                return {
                    ...filePath,
                    status: response.status,
                    statusText: `Error 404 - Page not found: ${filePath.href}`,
                    isValid: false,
                    isBroken: true,
                };
                } else {
                    return {
                        ...filePath,
                        status: response.status,
                        statusText: response.statusText,
                        isValid: false,
                        isBroken: true,
                    };

                }
            }
        })
        .catch((error) => {
            console.error(`Error an invalid link ${filePath.href}`, error);
            return {
                ...filePath,
                isValid: false,
                isBroken: true,
                error: error.message,
            };
        });
}

module.exports = validateLink;