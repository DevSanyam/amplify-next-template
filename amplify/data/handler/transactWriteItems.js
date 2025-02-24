import { util } from "@aws-appsync/utils";

export function request(ctx) {
  const { authorId, postId, title, description, oldTitle, authorName } =
    ctx.args;
  return {
    operation: "TransactWriteItems",
    transactItems: [
      {
        table: "MyPostTable",
        operation: "PutItem",
        key: util.dynamodb.toMapValues({ postId }),
        attributeValues: util.dynamodb.toMapValues({ title, description }),
        condition: {
            expression: "title = :oldTitle",
            expressionValues: util.dynamodb.toMapValues({ ":oldTitle": oldTitle }),
          },          
      },
      {
        table: "MyAuthorTable",
        operation: "UpdateItem",
        key: util.dynamodb.toMapValues({ authorId }),
        update: {
          expression: "SET author = :name",
          expressionValues: util.dynamodb.toMapValues({ ":name": authorName }),
        },
      },
    ],
  };
}
export function response(ctx) {
  return ctx.result;
}
