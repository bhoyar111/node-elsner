import sCode from "../custom/status-codes";
const { ok, created, bad_request, server_error } = sCode;
import { pageLimit, checkDataIsValid, getDecryptId } from '../custom/secure';

import {
    getValidationErrMsg,
    getIdNotFoundCommonMsg,
    getServerErrorMsg,
} from '../custom/error-msg';

// models import here
import model from '../db/models';
const { User, Role } = model;

// validation import here
import validateUser from '../requests/userRequest';

export default {
    async getUsersDS() {
        try {
            let roles = [];
            roles = await Role.getDS(model);
            res.status(ok).send({ roles });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async getUsers(req, res) {
        try {
            const { pageNo } = req.query;
            const page = checkDataIsValid(pageNo) ? pageNo : 1;
            const pageSize = pageLimit();

            let usersRes = [];
            usersRes = await User.getList(page, pageSize);
            const pages = Math.ceil(usersRes.count / pageSize);

            const pageData = {
                total_record : usersRes.count,
                per_page     : pageSize,
                current_page : page,
                total_pages  : pages
            }
            // const users = usersRes.rows;
            const users = checkDataIsValid(usersRes.rows) ? usersRes.rows : [];
            res.status(ok).send({ users, pageData });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async addUser(req, res) {
        try {
            const { error } = validateUser(req.body);
            if (error) return res.status(bad_request).send({ error: getValidationErrMsg(error) });
            //check email id is already present
            const userExist = await User.checkUser(req.body);
            if (userExist) return res.status(bad_request).send({ error: { email_id: " This email has been already used."} });

            const user = await User.saveRecord(req.body);
            if (!user) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(created).send({ user});
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async getUser(req, res) {
        try {
            const { id } = req.params;
            const decId = getDecryptId(id);
            const recordExist = await User.getRecordById(decId);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('user') });
            const roles = await Role.getDS();
            res.status(ok).send({ user: recordExist, roles });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async updateUser(req, res,) {
        try {
            const { id } = req.params;
            const decId = getDecryptId(id);

            const { error } = validateUser(req.body, decId); //decId
            if (error) return res.status(bad_request).send({ error: getValidationErrMsg(error) });

            let recordExist = await User.getRecordById(decId); //decId
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('user') });
            //validate email already used
            const userExist = await User.checkUser(req.body); //decId
            if (userExist !== null && userExist.id != decId) return res.status(bad_request).send({ error: { email_id: " This email has been already used."} });

            const user = await User.updateRecord( recordExist, req.body );
            if (!user) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(created).send({ user });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            const decId = getDecryptId(id);
            let recordExist = await User.getRecordById(decId);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('user') });

            const user = await User.deleteRecord( recordExist );
            if (!user) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(ok).send({ user });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    }
}