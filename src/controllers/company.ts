import { RequestHandler } from "express";
import Company from "models/company";

export const putMyCompany: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.auth;
    const { address, state, zip, phone } = req.body;

    await Company.findByIdAndUpdate(id, {
      address,
      state,
      zip,
      phone,
    });

    res.json({
      message: i18n.__("CONTROLLER.COMPANY.PUT_MY_COMPANY.UPDATED"),
    });
  } catch (err) {
    next(err);
  }
};
