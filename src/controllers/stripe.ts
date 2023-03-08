import { RequestHandler } from "express";
import User, { IUser } from "models/user";
import Stripe from "stripe";

const stripeProducts = {
  basic: {
    monthly: "price_1MdwuFEdk4mreq3LMNNwRNTH",
    yearly: "price_1MdwufEdk4mreq3LpedW6m8Z",
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2022-08-01",
});

// export const stripeGetBalances = async () => {
//   const { available: balances } = await stripe.balance.retrieve();
//   return balances;
// };

// export const stripeGetBalanceTransactions = async () => {
//   const { data: balanceTransactions } = await stripe.balanceTransactions.list();
//   return balanceTransactions;
// };

// export const stripeGetProducts = async () => {
//   const { data: products } = await stripe.products.list();
//   return products;
// };

export const stripeCreateCustomer = async (user: IUser) => {
  try {
    const stripeCustomer = await stripe.customers.create({
      name: user.name,
      email: user.email,
      address: {
        state: user.address?.state,
      },
      phone: user.phone,
    });

    return stripeCustomer;
  } catch (err) {
    console.log(`[STRIPE] Error creating customer `, err);
  }
};

// Routes

export const postStripeCheckoutSession: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const { id } = req.auth;
    const { type } = req.body;
    const user = await User.findById(id);

    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      billing_address_collection: "auto",
      payment_method_types: ["card"],
      line_items: [
        {
          price: stripeProducts["basic"][type as "monthly" | "yearly"],
          quantity: 1,
        },
      ],
      customer: user?.stripeId ?? "",
      // customer_update: {
      //   name: "auto",
      //   address: "auto",
      // },
      // tax_id_collection: {
      //   enabled: true,
      // },
      mode: "subscription",
      subscription_data: {
        trial_period_days: 15,
      },
      success_url: `${process.env.FRONTEND_URL}/register/business?step=checkout&success=true`,
      cancel_url: `${process.env.FRONTEND_URL}/register/business?step=checkout`,
      // automatic_tax: {
      //   enabled: true,
      // },
    });

    res.json({
      data: {
        url: stripeCheckoutSession.url,
      },
    });
  } catch (err) {
    console.log(`[STRIPE] Error creating checkout session `, err);
    next(err);
  }
};

export const webhookStripe: RequestHandler = async (req, res, next) => {
  try {
    const { data, type } = req.body;

    const main = data.object;
    console.log(`[STRIPE] Main Object ${main}`);

    const user = (await User.findOne({ stripeId: main.customer })) as IUser;

    switch (type) {
      case "invoice.paid":
        console.log(`[STRIPE] Invoice paid by: ` + user.name);
        break;
      default:
        console.log(`[STRIPE] Unhandled event type: ${type}`);
        break;
    }

    res.status(200).send();
  } catch (err) {
    next(err);
  }
};
