import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { Author, Authortransact, KeyType, KeyType3, Post, Posttransact } from "./CustomType";
import { addPost } from "./mutation/Post/createPost";
import { getPost } from "./query/getPost";
import { updatePost } from "./mutation/Post/updatePost";
import { deletePost } from "./mutation/Post/deletePost";
import { addAuthor } from "./mutation/Author/createAuthor";
import { getAuthor } from "./query/getAuthor";
import { updateAuthor } from "./mutation/Author/updateAuthor";
import { deleteAuthor } from "./mutation/Author/deleteAuthor";
import { scanItems } from "./query/scan";
import { allPostsByAuthor } from "./query/PostsByAuthor";
import { updatePostAndAuthor } from "./mutation/TransactWriteItems";
import { onAddPost } from "./mutation/Post/SubPost";
import { TransactGetItem } from "./query/TransactGetItem";

const schema = a.schema({
  Post,
  Author,
  KeyType,
  KeyType3,
  Posttransact,
  Authortransact,
  Todo: a
    .model({
      content: a.string(),
      post: a.ref("Post"),
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
  allPostsByAuthor,
  updatePostAndAuthor,
  onAddPost,
  TransactGetItem,
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
