## Chapter 5

### End-to-end tests

E2E tests are used to test the system as a whole.
These tests can directly validate the app desired use cases.
For that, we'll use Cypress, takeaways:

* Cypress won't start the servers for us, so the frontend and backend should be running before tests.
* Cypress uses some functionalities from Mocha.
Because of that, the usage of arrow functions is discouraged when writing the tests.
The arrow functions will bypass the Mocha context created by the tests and will cause some tests to false-negative fail.
Instad of evaluating case by case if the arrow functions will interfere in the test, we'll leave them aside entirely, this simplifies things a lot.

* Cypress works asynchronous and uses timeouts to be tolerant to how web applications work.
If we are looking for an element that depends on initial data fetch, cypress will wait and check again for that element later on.
Only when a set timeout is reached, the test is considered a fail.
This also prevents flake, because the time-dependent behavior is removed from tests.

* Cypress commands work in a separated queue.
They will only start to execute once the entire test function is run.
This means that we should not insert synchronous code directly in the test.
To use it, we can chain it after a `cy` command, using `.then()`.
The queue is used to better predict the behavior of the DOM.
This approach ensures the correct order of execution of each command, again preventing flake.

* Cypress chains commands as a promise chain.
Lot's of cypress methods will yield a DOM element, which will allow other commands to be chained.
We can easily select an element and then simulate user interaction with it.

* Cypress does not have access to the database, so we need to define API endpoints in the backend for tests.
The endpoint will be used to clean the db before each test.


