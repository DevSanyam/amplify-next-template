import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { Post } from "./CustomType";
import { addPost } from "./createPost";

const schema = a.schema({
  Post,
  Todo: a
    .model({
      content: a.string(),
      post:a.ref("Post")
    })
    .authorization((allow) => [allow.owner()]),
    addPost,
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
