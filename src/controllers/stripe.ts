import { RequestHandler } from "express";
import { IUser } from "models/user";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2022-08-01",
});

export const stripeCheckoutSession = async (stripeId: string) => {
  return await stripe.checkout.sessions.create({
    billing_address_collection: "auto",
    payment_method_types: ["card"],
    // line_items: [{ price: products[type][plan], quantity: 1 }],
    customer: stripeId,
    // customer_update: {
    //   name: "auto",
    //   address: "auto",
    // },
    // tax_id_collection: {
    //   enabled: true,
    // },
    mode: "subscription",
    success_url: `${process.env.FRONTEND_URL}`,
    cancel_url: `${process.env.FRONTEND_URL}/login`,
    // automatic_tax: {
    //   enabled: true,
    // },
  });
};

export const stripeGetBalances = async () => {
  const { available: balances } = await stripe.balance.retrieve();
  return balances;
};

export const stripeGetBalanceTransactions = async () => {
  const { data: balanceTransactions } = await stripe.balanceTransactions.list();
  return balanceTransactions;
};

export const stripeGetProducts = async () => {
  const { data: products } = await stripe.products.list();
  return products;
};

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
