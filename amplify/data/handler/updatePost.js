import { util } from "@aws-appsync/utils";
import * as ddb from "@aws-appsync/utils/dynamodb";

// export function request(ctx) {
//   const { id, expectedVersion, ...rest } = ctx.args;
//   const values = Object.entries(rest).reduce((obj, [key, value]) => {
//     obj[key] = value ?? ddb.operations.remove();
//     return obj;
//   }, {});

//   return ddb.update({
//     key: { id },
//     condition: { version: { eq: expectedVersion } },
//     update: { ...values, version: ddb.operations.increment(1) },
//   });
// }

export function request(ctx) {
  const { id, expectedVersion, ...rest } = ctx.args;
  return {
    operation: 'UpdateItem',
    key: util.dynamodb.toMapValues({ id }),
    update: {
      expression: 'ADD #voteField :plusOne, version :plusOne',
      expressionNames: { '#voteField': 'upvotes' },
      expressionValues: { ':plusOne': { N: 1 } }
    }
  };
}

export function response(ctx) {
  const { error, result } = ctx;
  if (error) {
    util.appendError(error.message, error.type);
  }
  return result;
}