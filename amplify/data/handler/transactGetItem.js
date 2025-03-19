import { util } from '@aws-appsync/utils';

export function request(ctx) {
  const { authorId, postId } = ctx.args;
  return {
    operation: 'TransactGetItems',
    transactItems: [
      {
        table: 'PostTable',
        key: util.dynamodb.toMapValues({ id:postId }),
      },
      {
        table: 'AuthorTable',
        key: util.dynamodb.toMapValues({ id:authorId }),
      },
    ],
  };
}

export function response(ctx) {
  if (ctx.error) {
    console.error("Transaction Error:", ctx.error);
    util.error(
      ctx.error.message,
      ctx.error.type,
      null,
      ctx.result.cancellationReasons
    );
  }

  // Extract keys from transaction result
  const posts = ctx.result.items?.[0] ? [ctx.result.items[0]] : [];
  const authors = ctx.result.items?.[1] ? [ctx.result.items[1]] : [];

  return { post: posts, Author: authors };
}