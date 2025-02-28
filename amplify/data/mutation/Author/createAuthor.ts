import { a } from "@aws-amplify/backend";

export const addAuthor = a
  .mutation()
  .arguments({
    id: a.id().required(),
    name: a.string().required(),
    email: a.string(),
    phone: a.string(),
  })
  .returns(a.ref("Author"))
  .authorization((allow) => [allow.authenticated()])
  .handler(
    a.handler.custom({
      dataSource: "MyAuthorTable",
      entry: "../../handler/Author/addAuthor.js", // Path to the resolver function
    })
  );
