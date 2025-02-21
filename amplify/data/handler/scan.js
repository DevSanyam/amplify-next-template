import { util } from "@aws-appsync/utils";
export function request(ctx) {
    return { operation: 'Scan' };
  }
  export function response(ctx) {
    return ctx.result.items;
  }