import sCode from "../custom/status-codes";
const { ok, created, bad_request, server_error } = sCode;
import { getDecryptId, pageLimit, checkDataIsValid, moveFileFunction } from '../custom/secure';

import {
    getValidationErrMsg,
    getIdNotFoundCommonMsg,
    getServerErrorMsg,
    // getIdAssignedMsg
} from '../custom/error-msg';

// models import here
import model from '../db/models';
const { Product } = model;

// validation import here
import validateProduct from '../requests/productRequest';

export default {
    async getProducts(req, res) {
        try {
            const { pageNo } = req.query;
            const page = checkDataIsValid(pageNo) ? pageNo : 1;
            const pageSize = pageLimit();

            let productsRes = [];
            productsRes = await Product.getList(page, pageSize);
            const pages = Math.ceil(productsRes.count / pageSize);

            const pageData = {
                total_record : productsRes.count,
                per_page     : pageSize,
                current_page : page,
                total_pages  : pages
            }
            const products = checkDataIsValid(productsRes.rows) ? productsRes.rows : [];
            res.status(ok).send({ products, pageData });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async addProduct(req, res) {
        try {
            const { error } = validateProduct(req.body);
            if (error) return res.status(bad_request).send({ error: getValidationErrMsg(error) });
            //  image upload code starts
            let doc_url = "";
            if (req.files) {
                const uploadLocation = 'public/product/';
                const { message, up_file_path } = await moveFileFunction(req.files.doc_url, `./${uploadLocation}`);
                if (message) return  res.status(server_error).send({ message });
                if(!checkDataIsValid(up_file_path)) res.status(server_error).send({ message: getServerErrorMsg() });
                doc_url = up_file_path;
            }
            const sData = req.body;
            const product = await Product.saveRecord({...sData, doc_url });
            if (!product) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(created).send({ product });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async getProduct(req, res) {
        try {
            const { id } = req.params;
            const decId = getDecryptId(id);
            const recordExist = await Product.getRecordById(decId);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('Product') });
            res.status(ok).send({ product: recordExist });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async updateProduct(req, res) {
        try {
            const { error } = validateProduct(req.body);
            if (error) return res.status(bad_request).send({ error: getValidationErrMsg(error) });

            const { id } = req.params;
            const decId = getDecryptId(id);
            let recordExist = await Product.getRecordById(decId);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('Product') });
             //  image upload code starts
             if (req.files) {
                 const uploadLocation = 'public/product/';
                 const { message, up_file_path } = await moveFileFunction(req.files.doc_url, `./${uploadLocation}`);
                 if (message) return  res.status(server_error).send({ message });
                 if(!checkDataIsValid(up_file_path)) res.status(server_error).send({ message: getServerErrorMsg() });
                 req.body.doc_url = up_file_path;
             }

            const product = await Product.updateRecord( recordExist, req.body );
            if (!product) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(created).send({ product });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async deleteProduct(req, res) {
        try {
            const { id } = req.params;
            const decId = getDecryptId(id);
            let recordExist = await Product.getRecordById(decId);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('Product') });

            const product = await Product.deleteRecord( recordExist );
            if (!product) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(ok).send({ product });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

}