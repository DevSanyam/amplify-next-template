import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource.js';
import { data } from './data/resource.js';
import { aws_dynamodb } from "aws-cdk-lib";

export const backend = defineBackend({
  auth,
  data,
});


const externalDataSourcesStack = backend.createStack("MyExternalDataSources");


const externalTable = aws_dynamodb.Table.fromTableName(
  externalDataSourcesStack,
  "MyExternalPostTable",
  "PostTable"
);


backend.data.addDynamoDbDataSource(
  "MyPostTable",
  externalTable
);

const externalAuthorTable = aws_dynamodb.Table.fromTableName(
  externalDataSourcesStack,
  "MyExternalAuthorTable",
  "AuthorTable"
);

backend.data.addDynamoDbDataSource(
  "MyAuthorTable",
  externalAuthorTable
);