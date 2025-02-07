import { a } from "@aws-amplify/backend";

export const updatePost= a.mutation()
  .arguments({
    id: a.id().required(),
    author: a.string().required(),
    title: a.string(),
    content: a.string(),
    url: a.string(),
    expectedVersion: a.integer().required(),
  })
  .returns(a.ref("Post"))
  .authorization((allow) => [allow.authenticated()])
  .handler(
    a.handler.custom({
      dataSource: "MyPostTable",
      entry: "../handler/updatePost.js", // Path to the resolver function
    })
  );
