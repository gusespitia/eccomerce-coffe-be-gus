"use strict";

// @ts-ignore
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

/**
 * order controller

*/

const { createCoreController } = require("@strapi/strapi").factories;

// module.exports = createCoreController("api::order.order");
module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    const { products } = ctx.request.body;
    try {
      console.log('Received products:', products);

      const lineItems = await Promise.all(
        products.map(async (product) => {
          console.log('Fetching product with ID:', product.id);

          const item = await strapi.db.query("api::product.product").findOne({
            where: { id: parseInt(product.id, 10) },
          });

          console.log('Fetched product:', item);

          if (!item) {
            throw new Error(`Product with id ${product.id} not found`);
          }

          return {
            price_data: {
              currency: "eur",
              product_data: {
                name: item.productName,
              },
              unit_amount: Math.round(item.price * 100),
            },
            quantity: 1,
          };
        })
      );

      console.log('Line items:', lineItems);
      const session = await stripe.checkout.sessions.create({
        shipping_address_collection: {
          allowed_countries: ["ES", "FR", "GB", "NL", "BE", "DE", "IT"],
        },
        payment_method_types: ["card", "bancontact"], // Agregar Payconiq
        mode: "payment",
        success_url: `${process.env.CLIENT_URL}/success`,
        cancel_url: `${process.env.CLIENT_URL}/successError`,
        line_items: lineItems,
      });
      

      console.log('Stripe session created:', session);

      await strapi
        .service("api::order.order")
        .create({ data: { products, stripeId: session.id } });

      return { stripeSession: session };
    } catch (error) {
      console.error('Error during order creation:', error);
      ctx.response.status = 500;
      return { error: error.message || error };
    }
  },
}));



