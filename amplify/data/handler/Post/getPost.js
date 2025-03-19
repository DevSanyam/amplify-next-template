import { util } from "@aws-appsync/utils";

export function request(ctx) {
  const { id } = ctx.args;
  return {
    operation: "GetItem",
    key: util.dynamodb.toMapValues({ id }),
    consistentRead: true,
  };
}

export const response = (ctx) => ctx.result;
