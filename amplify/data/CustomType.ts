import { a } from "@aws-amplify/backend";


export const   Post = a.customType({
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
    name: a.string().required(),
    email: a.string(),
    phone: a.string()
  });
  export const TransactionResult = a.customType({
    keys_post_id: a.id(),
    keys_author_id: a.id(),
    cancellation_type: a.string(),
    cancellation_message: a.string(),
    cancellation_post_id: a.id(),
    cancellation_post_title: a.string(),
    cancellation_post_description: a.string(),
  });