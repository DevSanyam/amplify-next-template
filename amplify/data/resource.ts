import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { Author, Post} from "./CustomType";
import { addPost } from "./mutation/createPost";
import { getPost } from "./query/getPost";
import { updatePost } from "./mutation/updatePost";
import { deletePost } from "./mutation/deletePost";
import { addAuthor } from "./mutation/createAuthor";
import { getAuthor } from "./query/getAuthor";
import { updateAuthor } from "./mutation/updateAuthor";
import { deleteAuthor } from "./mutation/deleteAuthor";
import { scanItems } from "./query/scan";

const schema = a.schema({
  Post,
  Author,
  Todo: a
    .model({
      content: a.string(),
      post:a.ref("Post")
    })
    .authorization((allow) => [allow.owner()]),
    addPost,
    getPost,
    updatePost,
    deletePost,
    addAuthor,
    getAuthor,
    updateAuthor,
    deleteAuthor,
    scanItems,
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
