import { util } from "@aws-appsync/utils";
import * as ddb from "@aws-appsync/utils/dynamodb";

// export function request(ctx) {
//   const { id, ...rest } = ctx.args;
//   const values = Object.entries(rest).reduce((obj, [key, value]) => {
//     obj[key] = value ?? ddb.operations.remove();
//     return obj;
//   }, {});

//   return ddb.update({
//     key: { id },
//     update: { ...values },
//   });
// }

export function request(ctx) {
    const { id, ...rest } = ctx.args;
  
    console.log("Updating item with ID:", id);
  
    const values = Object.entries(rest).reduce((obj, [key, value]) => {
      obj[key] = value ?? ddb.operations.remove();
      return obj;
    }, {});
  
    return ddb.update({
      key: { id },
      update: { ...values },
    });
  }
  

export function response(ctx) {
  const { error, result } = ctx;
  if (error) {
    util.appendError(error.message, error.type);
  }
  return result;
}