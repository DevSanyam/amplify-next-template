import { a } from "@aws-amplify/backend";

export const deletePost = a
  .mutation()
  .arguments({
    id: a.id().required(),
    expectedVersion: a.integer(),
  })
  .returns(a.ref("Post"))
  .authorization((allow) => [allow.authenticated()])
  .handler(
    a.handler.custom({
      dataSource: "MyPostTable",
      entry: "../handler/deletePost.js", // Path to the resolver function
    })
  );
