import sCode from "../../custom/status-codes";
const { ok, bad_request, un_authorized, server_error } = sCode;

import { getValidationErrMsg } from '../../custom/error-msg';

// models import here
import model from '../../db/models';
const { User, UserRefreshToken } = model;

// validation import here
import validateLogin from '../../requests/loginRequest';

export default {
    async getLogin(req, res) {
        try {
            const { error } = validateLogin(req.body);
            if (error) return res.status(bad_request).send({ error: getValidationErrMsg(error) });

            const user = await User.getUser(req.body);
            if (!user) return res.status(bad_request).send({ error: { email_id: "Email does't exists."} });

            if (!User.validatePassword(req.body.password, user.password)) return res.status(un_authorized).send({ error: { password: "Incorrect Password"} });

            const { id, email_id, first_name, last_name, role_id, mobile_no } = user;
            const userSerialize = { id, email_id, first_name, last_name, role_id, mobile_no };
            const token = User.generateTokens(userSerialize);

            // create data for current user in refresh token table
            const tokenSave = await UserRefreshToken.saveUserAndTokenData(user, token);
            if(!tokenSave) return res.status(server_error).send({ message: 'Internal Server Error' });

            Object.assign(token, { user_refresh_token_id: tokenSave.id });
            res.status(ok).send({ user, token });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async getLogout(req, res) {
        try {
            const {refresh_token, user_refresh_token_id} = req.body;
            if (!refresh_token) return res.status(un_authorized).send({ message: 'Refresh token not found' });
            if (!user_refresh_token_id) return res.status(un_authorized).send({ message: 'Refresh token Id not found' });
            await UserRefreshToken.removeUserToken(req.body);
            res.status(ok).send({ message: "logout successfully" });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    }
};