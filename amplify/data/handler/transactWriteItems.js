import { util } from "@aws-appsync/utils";

export function request(ctx) {
  const { authorId, postId, title, content, oldTitle, authorName } = ctx.args;

  console.log("Received input:", ctx.args); // Debugging

  return {
    operation: "TransactWriteItems",
    transactItems: [
      {
        table: "PostTable",
        operation: "PutItem", 
        key: util.dynamodb.toMapValues({ id:postId }),
        attributeValues: util.dynamodb.toMapValues({ title:title, content:content }),
        // condition: {
        //   expression: "title = :oldTitle",
        //   expressionValues: util.dynamodb.toMapValues({ ":oldTitle": oldTitle }),
        // },          
      },
      {
        table: "AuthorTable",
        operation: "UpdateItem",
        key: util.dynamodb.toMapValues({ id:authorId }),
        update: {
          expression: "SET #name = :aname",
          expressionValues: util.dynamodb.toMapValues({ ":aname": authorName }),
          expressionNames: { "#name": "name" },
        },
      },
    ],
  };
}

export function response(ctx) {
  if (ctx.error) {
    console.error("Transaction Error:", ctx.error);
    util.error(ctx.error.message, ctx.error.type, null, ctx.result.cancellationReasons);
  }

  // Extract keys from transaction result
  const posts = ctx.result.keys?.[0] ? [ctx.result.keys[0]] : [];
  const authors = ctx.result.keys?.[1] ? [ctx.result.keys[1]] : [];

  return { post: posts, Author: authors };
}
