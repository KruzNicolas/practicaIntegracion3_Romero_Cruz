import { Router } from "express";
import userModel from "../models/users.models.js";
import CustomError from "../services/error.custom.class.js";
import errorDictionary from "../services/error.dictionary.js";

const router = Router();

router.post("/premium/:uid", async (req, res, next) => {
  if (!req.params.uid) {
    req.logger.error(`GET /api/products/${pId}`);
    return next(new CustomError(errorDictionary.ID_NOT_FOUND));
  }

  const userId = req.params.uid;

  const user = await userModel.findOne({ _id: userId }).lean();

  if (user.role === "USER") {
    await userModel.updateOne({ _id: userId }, { role: "PREMIUM" });
    res.status(200).send({
      status: "OK",
      data: `User: ${user.username} role update to Premium`,
    });
  } else if (user.role === "PREMIUM") {
    await userModel.updateOne({ _id: userId }, { role: "USER" });
    res.status(200).send({
      status: "OK",
      data: `User: ${user.username} role update to User`,
    });
  }
});

export default router;
