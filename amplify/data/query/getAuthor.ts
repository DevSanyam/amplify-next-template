import { a } from "@aws-amplify/backend";

export const getAuthor = a
    .query()
    .arguments({ id: a.id().required() })
    .returns(a.ref("Author"))
    .authorization((allow) => [allow.authenticated()])
  .handler(
    a.handler.custom({
      dataSource: "MyAuthorTable",
      entry: "../handler/getAuthor.js", // Path to the resolver function
    })
  );