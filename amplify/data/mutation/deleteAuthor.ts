import { a } from "@aws-amplify/backend";

export const deleteAuthor = a
    .mutation()
    .arguments({ id: a.id().required() })
    .returns(a.ref("Author"))
    .authorization((allow) => [allow.authenticated()])
    .handler(
      a.handler.custom({
        dataSource: "MyAuthorTable",
        entry: "../handler/deleteAuthor.js", // Path to the resolver function
      })
    );