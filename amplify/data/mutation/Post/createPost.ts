import { a } from "@aws-amplify/backend";

export const addPost = a
  .mutation()
  .arguments({
    id: a.id(),
    author: a.string().required(),
    title: a.string(),
    content: a.string(),
    url: a.string(),
  })
  .returns(a.ref("Post"))
  .authorization((allow) => [allow.authenticated()])
  .handler(
    a.handler.custom({
      dataSource: "MyPostTable",
      entry: "../../handler/Post/addPost.js", // Path to the resolver function
    })
  );