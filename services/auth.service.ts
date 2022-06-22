// // const User = require("../models/User");
// // const Token = require("../models/Token");
// // const Task = require("../models/Task")
// // const jwt = require("jsonwebtoken");
// // const loginValidates = require("../services/authValidates");
// // const UserTokens = require("../services/userTokens");
// //
// // const asyncWrapper = require("../middleware/async");
// // const {refreshSecret} = require("../config");
// // const mongoose = require("mongoose");
// // const ActiveEmail = require("../services/activeEmail");
// // const {get} = require("mongoose");
// //
// import {Request} from "express";
// import {Error} from "mongoose";
// class AuthService{
//      registration = async (req:Request, res:Response) => {
//         const {email, username, password} = req.body;
//         try {
//             const user = await UserTokens.createUser(res,username,email,password)
//             await ActiveEmail.senderMail(email,user)
//             return res.status(200).json({message:"Successfully create account"});
//         } catch (e) {
//             return res.status(400).json(e.message);
//         }
//     };
//
//      login = async (req:Request, res:Response) => {
//         // const user = await loginValidates(req, res);
//         // user ВАЛИДАЦИЯ
//         const tokens = await UserTokens.updateToken(user);
//         return res.status(200).json(tokens);
//     };
//
//      logout = async (req:Request, res:Response) => {
//         const token = await Token.findOneAndUpdate(
//             {user: req.body.user},
//             {accessToken: null, refreshToken: null}
//         );
//         if (token.accessToken === null) {
//             return res.status(200).json("You already logout");
//         }
//         if (token) {
//             return res.status(200).json("Successfully logout");
//         }
//         return res.status(400).json("Something went wrong");
//     };
//      refresh = async (req:Request, res:Response) => {
//         const {refreshToken} = req.body;
//         const decodedRefresh = await jwt.verify(refreshToken, refreshSecret);
//
//
//         const user = await User.findOne({_id: decodedRefresh.id});
//         const getTokens = await UserTokens.createTokens(user);
//         const token = await Token.findOneAndUpdate(
//             {refreshToken: refreshToken},
//             {accessToken: getTokens.accessToken, refreshToken: getTokens.refreshToken}
//         );
//
//         if (!token) {
//             return res.status(402).json("Refresh token not found");
//         }
//         return res.status(200).json({
//             accessToken: getTokens.accessToken,
//             refreshToken: getTokens.refreshToken,
//         });
//     };
//
//
// }
//
