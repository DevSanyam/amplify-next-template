import { a } from "@aws-amplify/backend";

export const Post = a.customType({
  id: a.id(),
  author: a.string(),
  title: a.string(),
  content: a.string(),
  url: a.string(),
  ups: a.integer(),
  downs: a.integer(),
  version: a.integer(),
  expectedVersion: a.integer(),
  upvotes: a.integer(),
});

export const Author = a.customType({
  id: a.id().required(),
  name: a.string(),
  email: a.string(),
  phone: a.string(),
});

export const KeyType = a.customType({
  post:a.ref("Post").array(),
  Author:a.ref("Author").array(),
});