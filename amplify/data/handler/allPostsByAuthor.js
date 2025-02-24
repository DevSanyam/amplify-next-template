import { util } from '@aws-appsync/utils';

export function request(ctx) {
  const { author } = ctx.args;
  return {
    operation: 'Query',
    query: {
      expression: 'author = :authorId',
      expressionValues: util.dynamodb.toMapValues({ ':authorId': author })
    },
    index: 'author-index'
  };
}

export function response(ctx) {
  if (ctx.error) {
    util.error(ctx.error.message, ctx.error.type);
  }
  return ctx.result.items || [];
}