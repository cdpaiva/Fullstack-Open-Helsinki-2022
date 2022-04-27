(WIP)

## Part 4: Testing Express servers, user administration

### Unit 2: Testing the backend

Instead of testing the backend separetely, we'll test it using requests, that will work as an integration testing, for both the backend and the database. In some situations, it may be preferable to mock the entire database to test the backend in isolation.

The tests should be run in a database that is installed and runs in the developer's local machine. In our case, we'll have two separe mongo DBs. This is OK because there will be no concurrent modification of the test database.

For the tests we will use supertest, which is designed specifically to test node.js HTTP servers.

Jest offers several functions to execute operation before and after the tests run.

### Unit 3: User administration

In this unit, we add authentication and authorization features. The blog posts created need to be linked to users, and only the user who created a blog post should be able to delete or edit it.

In a relational database, this could be done by setting a _foreign key_ to the blog table. Users would have a one-to-many relationship to blogs, and the blog table would have a reference to that user id.

In NoSQL databases, there are different ways to set this relationship, for example:

1. Apply the same principle of a foreing key, with two collections (users and blogs), where blogs would have references to the user id.
2. Use the same two collections, but now have a list of blog ids in the user collection.
3. Use the same two collections, but store references in both collections.
4. Create a single collection, that would list users and nest the blogs inside each user.

Which option to follow is up to us. This is nicely pointed out in the course material: 

> Paradoxically, schema-less databases like Mongo require developers to make far more radical design decisions about data organization at the beginning of the project than relational databases with schemas.






