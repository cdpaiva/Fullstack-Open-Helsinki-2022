## Part 1

### Introduction to React

In this part, we learn how to create a new React App, how components work and how to pass props.

When the App is created, the application code resides in the _src_ folder. In _index.js_ we call `ReactDOM.render`, which will render the components passed in the selected element in _index.html_. This element is usually named `root`. By default, the file _public/index.html_ doesn't contain any HTML markup that is visible to us in the browser. The content is filled with the component we pass via `ReactDOM.render`.

In _App.js_ we define our components. So far, the components are defined as JS functions. Components return JSX, that looks like markup but is actually JS code. The JSX is compiled using Babel, and the custom tags of the components are transformed to `React.createElement` calls. JSX can embed dynamic content using curly braces. This is similar to Vue.js, where we can write code in the `<template>` using `{{}}` to access model properties.

Keep in mind that:

- In JSX, every tag needs to be closed, empty elements, such as <br> or <input> will need to be adapted to <br/> for example.
- Component names must be capitalized (to distinguish from built-in HTML elements).
- Props should be named from the component's POV, instead of the context it is used. This favors reusability.
- The content of a component usually needs to contain a single root element.
- To avoid several  `<div>` tags, we can wrap each component in a _fragment_ (empty tags).

We can have as many components as we want, and they can be nested inside other components. Components are usually defined in their own files, but it is convention to have a root component App. They also accept props, again just like in Vue.js. The props will be a parameter to the functions that define each component. props is an object, that has fields corresponding to the props the user of the component defines. Each field is an attribute of a custom tag (like in Vue.js).

How many components should we have?

Using components is a logical advantage for me, but I don't know how far should I go creating new components. A recomendation from the React docs is: 

> A good rule of thumb is that if a part of your UI is used several times (Button, Panel, Avatar), or is complex enough on its own (App, FeedStory, Comment), it is a good candidate to be extracted to a separate component.

---

### Javascript

This part is an overview on several of the JavaScript features that are useful or important when using React.

Takeaways:

- Opt for the functional programming paradigm. This means using immutable data structures. In the context of arrays, we should go for `concat` and `map`, for example.
- The [destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) is useful to manipulate arrays and objects.
- Possible issues may arise when working with method references, since in JS, `this` is defined based on how the method is called. This may cause `this` to refer to the global object instead of the object we wanted. Class methods are not bound by default, but by using React Hooks we won't run in these issues. This problem is common when working with class components.
- Although we have classes, they are objects that are based in prototypal inheritance. They are not classes as in the context of OO languages, like Java.

---

### Component state, event handlers

Object destructuring is presented as a nice way to simplify code, specially when receiving props and directly assigning it to variables directly as parameters.
Then, we are presented to stateful components. Components can have special functions that will modify their state. _React re-renders the component everytime those functions are executed._ The tutorial use a State Hook, so we don't need to write a class and pass `props` to its constructor. As stated in the [React Docs](https://reactjs.org/docs/hooks-state.html):
> `useState` is a Hook that lets you add React state to function components.
`useState` receives the initial state as an argument and returns a pair of values: the current state and a function that updates the state.

Next topic is event handling. To handle events, we can set the value of a listener, for example _onClick_ attribute to be a reference to a function. This function is defined inside our component and will be executed once that event is triggered. React will provide a synthetic event This is the same behavior we see and Vue, there is a difference is syntax, since in JSX we pass a function, rather than a string in the `<template>` of a Vue component.
It is important to understand that event handlers are functions, not function calls. If they were function calls that modified the state, each call would re-render the application and result in an infinite loop / overflow.
The state is passed to child components as custom attributes inside the component's tag. Again, just like Vue.

---

## A more complex state, debugging React apps

The last item of part 1 shows how to deal with more complex state, where we can have multiple state properties, created with multiple calls to `useState`. 
Another topic reinforced is to _not mutate state directly_. Changing state has to always be done by setting the state to a new object.

































