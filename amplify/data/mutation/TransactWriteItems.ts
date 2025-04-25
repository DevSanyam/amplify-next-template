import { a } from "@aws-amplify/backend";

export const updatePostAndAuthor = a
  .mutation()
  .arguments({
    postId: a.id().required(),
    title: a.string().required(),
    content: a.string().required(),
    oldTitle: a.string().required(),
    authorId: a.id().required(),
    authorName: a.string().required(),
  })
  .returns(a.ref("KeyType3"))
  .authorization((allow) => [allow.authenticated()])
  .handler(
    a.handler.custom({
      dataSource: "MyPostTable",
      entry: "../handler/transactWriteItems.js", // Path to the custom handler
    }) 
  );