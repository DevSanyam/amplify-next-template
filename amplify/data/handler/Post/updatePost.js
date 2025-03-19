import { util } from "@aws-appsync/utils";

export function request(ctx) {
  const { id, title,expectedVersion, author, content, url } = ctx.args;

  return {
    operation: 'UpdateItem',
    key: util.dynamodb.toMapValues({ id }),
    update: {
      expression: 'ADD #voteField :plusOne, version :plusOne SET title = :title, author = :author, content = :content, #url = :url',
      expressionNames: { '#voteField': 'upvotes','#url':'url' },
      expressionValues: util.dynamodb.toMapValues({
        ":plusOne": 1,
        ":title": title,
        ":author": author,
        ":content": content,
        ":url": url,
        ":expectedVersion": expectedVersion,
      }),
    },
    condition: {
      expression: "attribute_exists(id) AND version = :expectedVersion",
      expressionValues: util.dynamodb.toMapValues({
        ":expectedVersion": expectedVersion,
      }),
    },
  };
}

export function response(ctx) {
  const { error, result } = ctx;
  if (error) {
    util.appendError(error.message, error.type);
  }
  return result;
}