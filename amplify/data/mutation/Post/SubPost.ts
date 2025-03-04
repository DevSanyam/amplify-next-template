import { a } from "@aws-amplify/backend";
export const onAddPost = a.subscription()
.for([a.ref("addPost"), a.ref("updatePost")])
    .authorization(allow => [allow.authenticated()])
    .handler(
        a.handler.custom({
          entry: "../../handler/Post/onCratePost.js",
        })
      );
