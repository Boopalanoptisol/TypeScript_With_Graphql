# Typescript_With_Graphql

Install the nodeModules by using the Command **npm install**
**Compile** the TypeScript code by running **tsc** in the **root directory**
**Start the server** with the following command: **node dist/index.js**.

Test the API using a tool like GraphQL Playground or Postman.

Example queries/mutations:
 **To SignUp **
mutation {
  signup(mobileNumber: "+1234567890")
}

**To login**

mutation {
  login(mobileNumber: "+1234567890", otp: "1234")
}

**To get a list of users:**
query {
  users {
    id
    mobileNumber
  }
}
