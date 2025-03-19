import { a } from "@aws-amplify/backend";

export const TransactGetItem = a
  .query()
  .arguments({
    postId: a.id().required(),
    authorId: a.id().required(),
  })
  .returns(a.ref("KeyType"))
  .authorization((allow) => [allow.authenticated()])
  .handler(
    a.handler.custom({
      dataSource: "MyPostTable",
      entry: "../handler/transactGetItem.js", // Path to the custom handler
    })
  );
