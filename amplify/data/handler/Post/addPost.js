import { util } from "@aws-appsync/utils";

export function request(ctx) {
  const item = { ...ctx.arguments, ups: 1, downs: 0, version: 1 };
  const key = { id: ctx.args.id ?? util.autoId() };
  return {
    operation: "PutItem",
    key: util.dynamodb.toMapValues({ key }),
    attributeValues: util.dynamodb.toMapValues(item),
    condition: {
      expression: "attribute_not_exists(id) OR NOT (author = :name OR content = :content OR title = :title)",
      expressionValues: util.dynamodb.toMapValues({
        ":name": ctx.args.author,
        ":content": ctx.args.content,
        ":title": ctx.args.title,
      }),
    },
  };
}

export function response(ctx) {
  return ctx.result;
}
