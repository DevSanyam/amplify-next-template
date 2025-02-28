import { a } from "@aws-amplify/backend";

export const updateAuthor = a
    .mutation()
    .arguments({
        id: a.id().required(),
        name: a.string(),
        email: a.string(),
        phone: a.string(),
    })
    .returns(a.ref("Author"))
    .authorization((allow) => [allow.authenticated()])
    .handler(
      a.handler.custom({
        dataSource: "MyAuthorTable",
        entry: "../../handler/Author/updateAuthor.js", // Path to the resolver function
      })
    );