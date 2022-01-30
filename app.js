require("dotenv").config();
import apiRouter from './routes/api';
import express from 'express';
import logger from 'morgan';
import fileUpload from 'express-fileupload';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';

const app = express() // setup express application

app.use(logger('dev')); // log requests to the console

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/',
    createParentPath : true
}));

app.use(cors());
app.use('/admin',apiRouter);

app.use("/public", express.static(path.join(__dirname, 'public')));

app.listen(process.env.PORT, (err) => {
    if (err) return console.log(`con not listen to port: ${process.env.PORT}`);
    console.log(`server is listening to port: ${process.env.PORT}/`);
});