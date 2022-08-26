import { RequestHandler } from "express";
import { IUser } from "models/user";
import stripe from "utils/stripe";

export const stripeCreateCustomer = async (user: IUser) => {
  return await stripe.customers.create({
    name: user.name,
    email: user.email,
    address: {
      state: user.address?.state,
    },
    phone: user.phone,
  });
};

export const stripeWebhook: RequestHandler = async (req, res) => {
  const { data, type } = req.body;

  const main = data.object;
  console.log(`[STRIPE] Main Object ${main}`);

  switch (type) {
    default:
      console.log(`[STRIPE] Unhandled event type: ${type}`);
      break;
  }

  res.status(200).send();
};
