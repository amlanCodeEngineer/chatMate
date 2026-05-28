import jwt from "jsonwebtoken"
import {ENV} from "./env.js"
export const generateToken = (userId, res) =>{
    const token = jwt.sign({userId},ENV.JWT_SECRET,{
        expiresIn: "7d",
    });
    res.cookie("jwt", token, {
        maxAge: 7*24*60*60*1000 , //ms
        httpOnly:true, //prevent css attacks : cross-site scripting
        samSite:"strict", //CSRF attacks
        secure: ENV.NODE_ENV = "developmet" ? false: true,

    });

    return token

};