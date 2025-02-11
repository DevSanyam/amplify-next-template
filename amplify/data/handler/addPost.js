import { util } from "@aws-appsync/utils";
import * as ddb from "@aws-appsync/utils/dynamodb";

// export function request(ctx) {
//   const item = { ...ctx.arguments, ups: 1, downs: 0, version: 1 };
//   const key = { id: ctx.args.id ?? util.autoId() };
//   return ddb.put({ key, item });
// }

export function request(ctx) {
    const item = { ...ctx.arguments, ups: 1, downs: 0, version: 1 };
  const key = { id: ctx.args.id ?? util.autoId() };
  return {
    operation: 'PutItem',
    key: util.dynamodb.toMapValues({ key}),
    attributeValues: util.dynamodb.toMapValues(item)
  };
}

export function response(ctx) {
  return ctx.result;
}