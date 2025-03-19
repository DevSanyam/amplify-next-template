import { util } from "@aws-appsync/utils";

export function request(ctx) {
  const { id, expectedVersion } = ctx.args;
  return {
    operation: "DeleteItem",
    key: util.dynamodb.toMapValues({ id }),
    condition: {
      expression: "attribute_exists(id) AND version = :expectedVersion",
      expressionValues:util.dynamodb.toMapValues({ ":expectedVersion": expectedVersion }),
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