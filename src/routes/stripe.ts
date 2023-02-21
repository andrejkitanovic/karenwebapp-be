import {
  postStripeCheckoutSession as postStripeCheckoutSessionController,
  webhookStripe as webhookStripeController,
} from "controllers/stripe";
import { Router } from "express";
import defineRoutes from "helpers/defineRoutes";
// import {
//     postStripeCheckoutSession as postStripeCheckoutSessionValidator,
//     webhookStripe as webhookStripeValidator,
//   } from "validators/stripe";

const router = Router();
defineRoutes(router, [
  {
    method: "post",
    route: "/checkout",
    roles: ["business"],
    // validator: ,
    controller: postStripeCheckoutSessionController,
  },
  {
    method: "post",
    route: "/webhook",
    // validator: ,
    controller: webhookStripeController,
  },
]);

export default router;
