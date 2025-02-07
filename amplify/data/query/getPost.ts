import { a } from "@aws-amplify/backend";

export const getPost = a
  .query()
  .arguments({ id: a.id().required() })
  .returns(a.ref("Post"))
  .authorization((allow) => [allow.authenticated()])
  .handler(
    a.handler.custom({
      dataSource: "MyPostTable",
      entry: "../handler/getPost.js", // Path to the resolver function
    })
  );
