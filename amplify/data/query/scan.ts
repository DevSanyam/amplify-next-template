import { a } from "@aws-amplify/backend";

export const scanItems = a.query()
  .returns(a.ref("Post").array())
  .authorization((allow) => [allow.authenticated()])
  .handler(
    a.handler.custom({
      dataSource: "MyPostTable",
      entry: "../handler/scan.js", // Path to the resolver function
    })
  );
