import { errors } from '@strapi/utils';

export default {
  async beforeCreate(event) {
    const ctx = strapi.requestContext.get();

    if (!ctx || !ctx.state || !ctx.state.user) {
      throw new errors.UnauthorizedError('You must be logged in');
    }

    // attach the logged in user automatically
    event.params.data.user = ctx.state.user.id;
  },
};
