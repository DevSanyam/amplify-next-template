import { a } from "@aws-amplify/backend";

export const allPostsByAuthor = a
  .query()
  .arguments({
    author: a.string().required()
  })
  .returns(a.ref("Post").array()) // Assuming PaginatedPosts is a custom type
  .authorization((allow) => [allow.authenticated()])
  .handler(
    a.handler.custom({
      dataSource: "MyPostTable",
      entry: "../handler/allPostsByAuthor.js", // Path to the resolver
    })
  );
