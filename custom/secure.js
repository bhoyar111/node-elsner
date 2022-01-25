import path from 'path';

import aes256 from 'aes256';

const key = 'itscaledodokey';

const cipher = aes256.createCipher(key);

export const getEncryptId = (id) => {
    return encodeURIComponent(cipher.encrypt(id.toString()));
}

export const getDecryptId = (id) => {
    return cipher.decrypt(decodeURIComponent(id));
}

export const checkDataIsValid = (data) => {
    if(data !== null && data !== undefined && data !== ''){
        return true;
    }
    return false;
}

export const pageLimit = () => {
    return 10;
}

export const moveFileFunction = async (reqFile, reqPath) => {
    return new Promise(function (fulfill, reject){
        const fileName =  Date.now() + path.extname(reqFile.name);
        reqFile.mv(reqPath + fileName, (error) => {
            if (error) {
                reject(false);
            }
            fulfill(fileName);
        })
    });
}
// return path.resolve(__dirname); 

