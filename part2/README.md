## Part 2

### Rendering a collection, modules

The subpart a starts with a review on debugging techniches and event handlers. It also mentions a few of JS functional programming methods. JS has higher order functions, which are functions that receive another functions as parameters. These passed functions are called callbacks. An example is map, that will aply the callback to each element of an array and return another array. Another example is reduce, which is a bit more complex. Reduce accepts a callback with two params, sometimes named as an accumulator and an element. It also takes another param, which is the initial value for the accumulator. The callback is applied to each element of the array, and the accumulator is returned and passed in-between each element. In the end, the array is reduced to a single value.

* Rendering Collections: We can map an array to generate HTML tags. Each child in an array should have an unique key prop. The key is used to determine which components should be re-rendered. One anti-pattern that I used once in a Vue app is to use the array indexes as keys. This is an "easy solution" because we can retrieve the indexes from map just by setting a second argument to it. The problem is that if the array is changed (we delete the first item, for example) the keys will all change and this will be interpreted as having to re-render the child components.

* Import modules: contents of JS modules are automatically in strict mode. Strict mode is a change introduced in ES5, it is a bit more rigorous to errors (meaning that previous-accepted mistakes are considered errors) and better optimizable. The list of changes is in the []mozilla dev docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode).

Different types of imports:

    Imports the entire module:
```
    import * as myModule from '/modules/my-module.js'
```
    Imports several named modules:
```
    import {foo, bar} from '/modules/my-module.js';
```
    Imports a default module (defined as export default):
```
    import fooDefault from '/modules/my-module.js';
```
    Dinamically imports (module is not loaded on page load, only when the function is called)
```
    () => import('/modules/my-module.js')
```

* Default x named imports

What does a default module means? Default imports have no name during imports. They are defined as a name in their modules, but are exported as `default`, so they became nameless and are renamed during the import. 
A named import is actually a destructuring of the module to get the specifc symbol. If the symbol is not there, we will be warned by the console. This seems better as it provides an extra layer of code safety.

---

### Forms

To access input values from a form, we can use _controlled components_. Controlled components are input form elements whose values are controlled by React. We can add a listener to changes in the input and have a handler updating the state of a variable in every change. That way, the value inside the input is controlled by React and can be passed to other elements in our code. To summarize:

```
//Set the state of someProp
const [someProp, setSomeProp] = useState('')

//...

//Event handler that will pass the value in the input to someProp
const handleSomePropChange = (event) => {
  setSomeProp(event.target.value)
}

//Event handler to post someProp
const postSomeProp = (event) => {
    event.preventDefault()  //prevents default behavior, eg page refresh
    //code that performs the post
    setSomeProp('') //resets the value to clear the input field
}

//...

<form onSubmit={postSomeProp}>
    <input type=text onChange={handleSomePropChange} />
    <button type="submit">Post</button>
</form>

```

---

### Getting data from server

JSON Server is presented as a way to mock a server. A nice thing I learned is to set a custom script for the server, so we can start the server much easily.

The asynchronous model in JS is discussed in this part. The JS engines are single threaded, so they cannot afford to have blocking code. HTTP requests, for example, are slow when comparing to the code execution. The solution is to have APIs that will remove certain calls of the stack and place them in a task queue. An event loop is responsible for coordinating the completed tasks back into the call stack. While the 'costly and slow' calls are in the task queue, the code continues to execute in a non-blocking way.

The Node package manager is used to install external libraries as project dependencies. A list of these dependencies is included in _package.json_.
Some dependencies can be installed only for development, like the examples of _json-server_ in this part.

As with _fetch_, axios returns a promise.

> A Promise is an object representing the eventual completion or failure of an asynchronous operation.

A promise will have 3 states: pending (haven't received the final value), fulfilled/resolved (final value received with success) and rejected (operation failed). To access the result of the promise, we use the method `.then()`. This method is provided with a response object, that has valuable information, such as the data, headers and status code. Axios parses the data from text to JSON automatically for us.

Effect hooks are used in function components to perform side effects, the most common side effect may be to fetch data. By default, the effect is always run after each render, but we  can change this easily. An empty array, for example, will make the effect run only in the first render.

