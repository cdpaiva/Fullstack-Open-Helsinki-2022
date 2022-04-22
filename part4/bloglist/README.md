(WIP)

## Part 4: Testing Express servers, user administration

### Unit 2: Testing the backend

Instead of testing the backend separetely, we'll test it using requests, that will work as an integration testing, for both the backend and the database. In some situations, it may be preferable to mock the entire database to test the backend in isolation.

The tests should be run in a database that is installed and runs in the developer's local machine. In our case, we'll have two separe mongo DBs. This is OK because there will be no concurrent modification of the test database.

For the tests we will use supertest, which is designed specifically to test node.js HTTP servers.

Jest offers several functions to execute operation before and after the tests run.


