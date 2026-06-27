import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::order.order', ({ strapi }) => ({

  async create(ctx) {

    // 1️⃣ Get logged in user
    const user = ctx.state.user;

    if (!user) {
      return ctx.unauthorized("You must be logged in to place an order");
    }

    // 2️⃣ Get request body
    const { data } = ctx.request.body;

    // 3️⃣ Attach user to order
    data.users_permissions_user = user.id;

    // 4️⃣ Create order
    const entity = await strapi.entityService.create('api::order.order', {
      data: data,
      populate: ['users_permissions_user'],
    });

    return { data: entity };
  },

}));