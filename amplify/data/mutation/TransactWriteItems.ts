import { a } from "@aws-amplify/backend";

export const updatePostAndAuthor = a.mutation()
  .arguments({
    postId: a.id().required(),
    authorId: a.id().required(),
    title: a.string().required(),
    description: a.string().required(),
    oldTitle: a.string().required(),
    authorName: a.string().required(),
  })
  .returns(a.ref("TransactionResult"))
  .authorization((allow) => [allow.authenticated()])
  .handler(
    a.handler.custom({
        dataSource:"MyPostTable",
      entry: "../handler/transactWriteItems.js", // Path to the custom handler
    })
  );
