export function getValidationErrMsg(error) {
    let errorObj = {};
    error.details.forEach(el => {
        if(el.path.length === 1){
            errorObj[el.context.key] = el.message;
        }

        if(el.path.length === 3){

            let newKey      = el.path[0];
            let newInd      = el.path[1];
            let newLineKey  = el.path[2];

            if(errorObj[newKey] === undefined){
                errorObj[newKey] = [];
            }

            if(errorObj[newKey][newInd] === undefined){
                errorObj[newKey][newInd] = {};
            }

            errorObj[newKey][newInd][newLineKey] = el.message;
        }
    });
    return errorObj;
}

export function getIdNotFoundCommonMsg(modelName) {
    return `The ${modelName} for defind id not found`;
}

export function getNoRecordFoundMsg(modelName) {
    return `No ${modelName} result found`;
}

export function getIdAssignedMsg(modelName) {
    return `Cannot delete ${modelName}, related record found`;
}

export function getServerErrorMsg() {
    return `Internal Server Error`;
}