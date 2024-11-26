import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::product.product', ({ strapi }) => ({
  async findOne(ctx) {
    const { id } = ctx.params;

    // Consulta personalizada
    const product = await strapi.db.query('api::product.product').findOne({
      where: { id: parseInt(id, 10) }, // O elimina parseInt si `id` es un string
    });

    // Log para depuración
    strapi.log.info(`Product found: ${JSON.stringify(product)}`);

    if (!product) {
      return ctx.notFound('Product not found');
    }

    return product;
  },
}));
