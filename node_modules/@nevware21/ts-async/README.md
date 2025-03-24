<h1 align="center">@nevware21/ts-async</h1>
<h2 align="center">Promise support implementations and helpers for TypeScript built for minification</h2>

![GitHub Workflow Status (main)](https://img.shields.io/github/actions/workflow/status/nevware21/ts-async/ci.yml?branch=main)
[![codecov](https://codecov.io/gh/nevware21/ts-async/branch/main/graph/badge.svg?token=KA05820FMO)](https://codecov.io/gh/nevware21/ts-async)
[![npm version](https://badge.fury.io/js/%40nevware21%2Fts-async.svg)](https://badge.fury.io/js/%40nevware21%2Fts-async)
[![downloads](https://img.shields.io/npm/dt/%40nevware21/ts-async.svg)](https://www.npmjs.com/package/%40nevware21/ts-async)
[![downloads](https://img.shields.io/npm/dm/%40nevware21/ts-async.svg)](https://www.npmjs.com/package/%40nevware21/ts-async)

## Description

This package provides support for asynchronous development with a Promise based task Scheduler, several different Promise implementations (synchronous, idle, asynchronous and native runtime wrappers), await helpers, and aliases all built and tested using TypeScript.
One of the primary focuses of this package is to provide support for the creation of code that can be better minified, resulting in a smaller runtime payload which can directly assist with Page Load performance.

The Promise based Task Scheduler supports the serialized execution of tasks using promises to control when the next task should be executed (after the previous task completes), this leverages the supplied Promise implementations so that you can easily create an Idle Task Scheduler which executes the tasks using `requestIdleCallback` when using the `createIdlePromise` implementation.

> All of the provided Promise implementations support usage patterns via either `await` or with the included helper functions (`doAwait`, `doFinally`, `doAwaitresponse`), you can also mix and match them (use both helper and `await`) as required by your use cases.

### Test Environments 
- Node (16, 18, 20)
- Browser (Chromium - headless)
- Web Worker (Chromium - headless)

### Documentation and details

See the documentation [generated from source code](https://nevware21.github.io/ts-async/typedoc/index.html) via typedoc for a full list and details of all of the available types, functions, interfaces with included examples.

See [Browser Support](#browser-support) for details on the supported browser environments.


| Type / Function       | Since | Details
|-----------------------|-------|-----------------------
| **Promise based Scheduler**
| [`createTaskScheduler`](https://nevware21.github.io/ts-async/typedoc/functions/createTaskScheduler.html) | |Create a Task Scheduler using the optional promise implementation and scheduler name. The newPromise can be any value promise creation function, where the execution of the queued tasks will be processed based on how the promise implementation processes it's chained promises (asynchrounsly; synchronously; idle processing, etc)<br />There is no limit on the number of schedulers that you can create, when using more than one scheduler it is recommended that you provide a `name` to each scheduler to help identify / group promises during debugging.
| [`ITaskScheduler`](https://nevware21.github.io/ts-async/typedoc/interfaces/ITaskScheduler.html) | 0.2.0 |Defines a Task Scheduler that uses IPromise implementations to serialize the execution of the tasks. Each added task will not get executed until the previous task has completed.
| [`StartQueuedTaskFn`](https://nevware21.github.io/ts-async/typedoc/types/StartQueuedTaskFn.html) | 0.2.0 | Identifies the function to call to start and execute the task when its ready to be executed.
| **Interfaces**
| [`IPromise`](https://nevware21.github.io/ts-async/typedoc/interfaces/IPromise.html) | |This package uses and exports the `IPromise<T>` interface which extends both the `PromiseLike<T>` and `Promise<T>` to provide type compatibility when passing the Promises created with this package to any function that expects a `Promise` (including returning from an `async function`). As part of it's definition it exposes an [optional] string `status` to represent the current state of the `Promise`. These values include `pending`, `resolved` `rejected` and `resolving` which is a special case when a Promise is being `resolved` via another Promise returned via the `thenable` onResolved / onRejected functions.
| [`AwaitResponse`](https://nevware21.github.io/ts-async/typedoc/interfaces/AwaitResponse.html) | |This interface is used to represent the result whether resolved or rejected when using the [`doAwaitResponse`](https://nevware21.github.io/ts-async/typedoc/functions/doAwaitResponse.html), this function is useful when you want to avoid creating both a `resolved` and `rejected` functions, as this function only requires a single callback function to be used which will receive an object that conforms to this interface.
| [`IWhileState`](https://nevware21.github.io/ts-async/typedoc/interfaces/IWhileState.html) | 0.5.0| The current state of the while loop while processing the callback function, this is passed to eht callback function.
| [`IPromiseResult`](https://nevware21.github.io/ts-async/typedoc/interfaces/IPromiseResult.html) | 0.5.0 |The result of a promise. It can either be fulfilled with a value, or rejected with a reason.
| **Alias**
| [`createPromise`](https://nevware21.github.io/ts-async/typedoc/functions/createPromise.html)<br/> [`createAllPromise`](https://nevware21.github.io/ts-async/typedoc/functions/createAllPromise.html) <br/> [`createAllSettledPromise`](https://nevware21.github.io/ts-async/typedoc/functions/createAllSettledPromise.html) <br/> [`createAnyPromise`](https://nevware21.github.io/ts-async/typedoc/functions/createAnyPromise.html) <br/> [`createRacePromise`](https://nevware21.github.io/ts-async/typedoc/functions/createRacePromise.html) <br/> [`createRejectedPromise`](https://nevware21.github.io/ts-async/typedoc/functions/createRejectedPromise.html) <br/> [`createResolvedPromise`](https://nevware21.github.io/ts-async/typedoc/functions/createResolvedPromise.html) <br /> <br/> [`setCreatePromiseImpl`](https://nevware21.github.io/ts-async/typedoc/functions/setCreatePromiseImpl.html) | <br /> <br /> 0.5.0 <br /> 0.5.0 <br /> 0.5.0 <br /> <br /> <br /> <br /> <br /> | These function use the current promise creator implementation that can be set via <code>[`setCreatePromiseImpl`](https://nevware21.github.io/ts-async/typedoc/functions/setCreatePromiseImpl.html)(creator: &lt;T&gt;(executor: PromiseExecutor&lt;T&gt;, timeout?: number) => IPromise&lt;T&gt;): void</code> <br/>Unless otherwise set this defaults to the `createNativePromise` implementation, to provide a simplified wrapper around any native runtime Promise support. <br/>Available implementation: <ul><li>[`createNativePromise`](https://nevware21.github.io/ts-async/typedoc/functions/createNativePromise.html) <li>[`createAsyncPromise`](https://nevware21.github.io/ts-async/typedoc/functions/createAsyncPromise.html) <li>[`createSyncPromise`](https://nevware21.github.io/ts-async/typedoc/functions/createSyncPromise.html) <li>[`createIdlePromise`](https://nevware21.github.io/ts-async/typedoc/functions/createIdlePromise.html) </ul> By using these aliases, it's possible to switch between any of these implementations as needed without duplicating your code. This will not change any existing promises, it only affects new promises. 
| [`createNativePromise`](https://nevware21.github.io/ts-async/typedoc/functions/createNativePromise.html) <br/> [`createNativeAllPromise`](https://nevware21.github.io/ts-async/typedoc/functions/createNativeAllPromise.html) <br/> [`createNativeAllSettledPromise`](https://nevware21.github.io/ts-async/typedoc/functions/createNativeAllSettledPromise.html) <br/> [`createNativeAnyPromise`](https://nevware21.github.io/ts-async/typedoc/functions/createNativeAnyPromise.html) <br/> [`createNativeRacePromise`](https://nevware21.github.io/ts-async/typedoc/functions/createNativeRacePromise.html) <br/> [`createNativeRejectedPromise`](https://nevware21.github.io/ts-async/typedoc/functions/createNativeRejectedPromise.html) <br/> [`createNativeResolvedPromise`](https://nevware21.github.io/ts-async/typedoc/functions/createNativeResolvedPromise.html) | <br /> <br /> 0.5.0 <br /> 0.5.0 <br /> 0.5.0 <br /> <br /> <br /> | These are effectively wrappers around the runtime `Promise` class, so this is effectivly the same as `new Promise(...)` but as a non-global class name it can be heavily minified to something like `a(...)`. These wrappers also add an accessible `status` property for identifying the current status of this promise. However, the `status` property is NOT available on any returned chained Promise (from calling `then`, `catch` or `finally`) 
| **Asynchronous Promise**
| [`createAsyncPromise`](https://nevware21.github.io/ts-async/typedoc/functions/createAsyncPromise.html) <br/> [`createAsyncAllPromise`](https://nevware21.github.io/ts-async/typedoc/functions/createAsyncAllPromise.html) <br/> [`createAsyncAllSettledPromise`](https://nevware21.github.io/ts-async/typedoc/functions/createAsyncAllSettledPromise.html) <br/> [`createAsyncAnyPromise`](https://nevware21.github.io/ts-async/typedoc/functions/createAsyncAnyPromise.html) <br/> [`createAsyncRacePromise`](https://nevware21.github.io/ts-async/typedoc/functions/createAsyncRacePromise.html) <br/> [`createAsyncRejectedPromise`](https://nevware21.github.io/ts-async/typedoc/functions/createAsyncRejectedPromise.html) <br/> [`createAsyncResolvedPromise`](https://nevware21.github.io/ts-async/typedoc/functions/createAsyncResolvedPromise.html) | <br /> <br /> 0.5.0 <br /> 0.5.0 <br /> 0.5.0 <br /> <br /> <br /> | Provides an implementation of the `Promise` contract that uses timeouts to process any chained promises (returned by `then(...)`, `catch(...)`, `finally(...)`), when creating the initial promise you can also provide (override) the default duration of the timeout (defaults to 0ms) to further delay the execution of the chained Promises.<br/>, but can also be provided) to process any chained promises (of any type)
| **Synchronous Promise**
| [`createSyncPromise`](https://nevware21.github.io/ts-async/typedoc/functions/createSyncPromise.html) <br/> [`createSyncAllPromise`](https://nevware21.github.io/ts-async/typedoc/functions/createSyncAllPromise.html) <br/> [`createSyncAllSettledPromise`](https://nevware21.github.io/ts-async/typedoc/functions/createSyncAllSettledPromise.html) <br/> [`createSyncAnyPromise`](https://nevware21.github.io/ts-async/typedoc/functions/createSyncAnyPromise.html) <br/> [`createSyncRacePromise`](https://nevware21.github.io/ts-async/typedoc/functions/createSyncRacePromise.html) <br/> [`createSyncRejectedPromise`](https://nevware21.github.io/ts-async/typedoc/functions/createSyncRejectedPromise.html) <br/> [`createSyncResolvedPromise`](https://nevware21.github.io/ts-async/typedoc/functions/createSyncResolvedPromise.html)  | <br /> <br /> 0.5.0 <br /> 0.5.0 <br /> 0.5.0 <br /> <br /> <br /> | Also implements the `Promise` contract but will immediately execute any chained promises at the point of the original promise getting resolved or rejected, or if already resolved, rejected then at the point of registering the `then`, `catch` or `finally`
| **Idle Promise**
| [`createIdlePromise`](https://nevware21.github.io/ts-async/typedoc/functions/createIdlePromise.html) <br/> [`createIdleAllPromise`](https://nevware21.github.io/ts-async/typedoc/functions/createIdleAllPromise.html) <br/> [`createIdleAllSettledPromise`](https://nevware21.github.io/ts-async/typedoc/functions/createIdleAllSettledPromise.html) <br/> [`createIdleAnyPromise`](https://nevware21.github.io/ts-async/typedoc/functions/createIdleAnyPromise.html) <br/> [`createIdleRacePromise`](https://nevware21.github.io/ts-async/typedoc/functions/createIdleRacePromise.html) <br/> [`createIdleRejectedPromise`](https://nevware21.github.io/ts-async/typedoc/functions/createIdleRejectedPromise.html) <br/> [`createIdleResolvedPromise`](https://nevware21.github.io/ts-async/typedoc/functions/createIdleResolvedPromise.html)  | <br /> <br /> 0.5.0 <br /> 0.5.0 <br /> 0.5.0 <br /> <br /> <br /> | Implements the `Promise` contract and will process any chained promises using the available `requestIdleCallback` (with no timeout by default - but can also be changes by `setDetaultIdlePromiseTimeout`). And when `requestIdleCallback` is not supported this will default to using a timeout via the [`scheduleIdleCallback` from `@nevware21/ts-utils`](https://nevware21.github.io/ts-utils/typedoc/functions/scheduleIdleCallback.html)
| **Timeout**
| [`createTimeoutPromise`](https://nevware21.github.io/ts-async/typedoc/functions/createTimeoutPromise.html) | | Creates a Promise instance that resolve or reject after the specified timeout.
| **Helpers**
| [`createTimeoutPromise`](https://nevware21.github.io/ts-async/typedoc/functions/createTimeoutPromise.html) | 0.5.0 | Creates a Promise instance that resolve or reject after the specified timeout.
| [`doAwait`](https://nevware21.github.io/ts-async/typedoc/functions/doAwait.html)             | | Helper which handles `await` "handling" via callback functions to avoid the TypeScript boilerplate code that is added for multiple branches. Internal it handles being passed an `IPromise` or a result value so you avoid needing to test whether the result you have is also a `Promise`.<br />It takes three (3) optional callback functions for `resolved`, `rejected` and `finally`.
| [`doAwaitResponse`](https://nevware21.github.io/ts-async/typedoc/functions/doAwaitResponse.html)     | | Helper which handles `await` "handling" via a single callback where `resolved` and `rejected` cases are handled by the same callback, this receives an `AwaitResponse` object that provides the `value` or `reason` and a flag indicating whether the Promise was `rejected`
| [`doFinally`](https://nevware21.github.io/ts-async/typedoc/functions/doFinally.html)           | | Helper to provide `finally` handling for any promise using a callback implementation, analogous to using `try` / `finally` around an `await` function or using the `finally` on the promise directly
| [`arrForEachAsync`](https://nevware21.github.io/ts-async/typedoc/functions/arrForEachAsync.html) | 0.5.0 | Performs an asynchronous for loop where the calling function may return an [`IPromise`](https://nevware21.github.io/ts-async/typedoc/interfaces/IPromise.html) which must be fulfilled before the next iteration is called.
| [`doWhileAsync`](https://nevware21.github.io/ts-async/typedoc/functions/doWhileAsync.html) | 0.5.0          | Performs a while loop where the calling function may return an [`IPromise`](https://nevware21.github.io/ts-async/typedoc/interfaces/IPromise.html) which must be fulfilled before the next iteration is called.
| [`iterForOfAsync`](https://nevware21.github.io/ts-async/typedoc/functions/iterForOfAsync.html) | 0.5.0           | Iterates over the iterator where the calling function may return an [`IPromise`](https://nevware21.github.io/ts-async/typedoc/interfaces/IPromise.html) which must be fulfilled before the next iteration is called.
| **Polyfill**
| [`PolyPromise`](https://nevware21.github.io/ts-async/typedoc/classes/PolyPromise.html) | 0.5.0 | A full polyfill for the Promise class

All promise implementations are validated using TypeScript with `async` / `await` and the internal helper functions `doAwait`, `doFinally` and `doAwaitResponse` helpers. Usage of the `doAwait` or `doAwaitResponse` is recommended as this avoids the additional boiler plate code that is added by TypeScript when handling the branches in an `async` / `await` operations, this does however, mean that your calling functions will also need to handle this `async` operations via callbacks rather than just causing the code path to "halt" at the `await` and can therefore may be a little more complex (depending on your implementation).
> However, you are NOT restricted to only using `await` OR `doAwait` they can be used together. For example your public API can still be defined as asynchronous, but internally you could use `doAwait`
```ts
async function myApi() 
{
    await doAwait(thePromise, (result) => { ... }, (reason) => { ... });
}
```

### Unhandled Promise Rejection Event

All implementations will "emit/dispatch" the unhandled promise rejections event (`unhandledRejection` (node) or `unhandledrejection`) (if supported by the runtime) using the standard runtime mechanisms. So any existing handlers for native (`new Promise`) unhandled rejections will also receive them from the `idle`, `sync` and `async` implementations. The only exception to this is when the runtime (like IE) doesn't support this event in those cases "if" an `onunhandledrejection` function is registered it will be called and if that also doesn't exist it will logged to the console (if possible).

### Pollyfill

The package provides a simple polyfill wrapper which is built around the `asynchronous` promise implementation which is tested and validated against the standard native (`Promise()`) implementations for node, browser and web-worker to ensure compatibility.

## Language ECMAScript Support

### ES5

This library plans to maintain ES5 compatibility for all versions of v0.x and v1.x releases

### ES(future [6 next, etc])

Future versions of this library starting at version 2.x are planned to lift and remove the internal polyfills to support the new targetted baseline once it is defined.
ie. It may or may not be ES6 depending on the runtime landscape and requests received.

When we release v2.x the supported browser matrix will also shift as required to match the defined language level supported at that time. 

## Quickstart

Install the npm packare: `npm install @nevware21/ts-async --save`

> It is suggested / recommended that you use the following definition in your `package.json` so that you are compatible with any future releases as they become available
> we do not intend to make ANY known breaking changes moving forward until v2.x 
> ```json
> "@nevware21/ts-async": ">= 0.5.4 < 2.x"
> ```

And then just import the helpers and use them.

### Simple Examples

#### Using Task Scheduler

```ts
import { createTaskScheduler } from "@nevware21/ts-async";
import { scheduleTimeout } from "@nevware21/ts-utils";

let scheduler = createTaskScheduler();

// Schedule (and start) task 1 using native promise
// Because this is a new scheduler there are no other
// pending tasks so this will be started synchronously
let task1 = scheduler.queue(() => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(42);
    }, 100);
  });
});

// task1.status; => "pending" (and running)

// Schedule task 2 using helper function
// The startTask function for task2 will not be called
// until task1 has completed
let task2 = scheduler.queue(() => {
  return createPromise((resolve) => {
    scheduleTimeout(() => {
      resolve(21);
    }, 100);
  });
});

// task2.status; => "pending" (not running)

await task1;
// task1.status => "resolved"
// task2.status => "pending" (but running)
```

#### Using Promise Helpers

```ts
import { createPromise } from "@nevware21/ts-async";
import { scheduleTimeout } from "@nevware21/ts-utils";

const myPromise = createPromise((resolve, reject) => {
    scheduleTimeout(() => {
        resolve("foo");
    }, 300);
});

myPromise
  .then(handleFulfilledA, handleRejectedA)
  .then(handleFulfilledB, handleRejectedB)
  .then(handleFulfilledC, handleRejectedC)
  .catch(handleRejectedAny);

// Create a new promise that resolves with an inner promise that will auto resolve after 1 second
createPromise((resolveOuter) => {
  resolveOuter(
    createPromise((resolveInner) => {
      scheduleTimeout(resolveInner, 1000);
    })
  );
});

doAwait(myPromise, (result) => {
    // Handle the result this would normally be
    // let result = await myPromise;
}, (reason) => {
    // Handle cases when the `myPromise` is rejected
    // Using await you would handle this via try / catch
});
```

While the examples above are using the `createPromise` you can directly use the `createSyncPromise`, `createAsyncPromise`, `createIdlePromise` or `createNativePromise`, you can also mix and match them (ie. they don't all have to be the same implementation). The `createPromise` alias is provided to enable switching the underlying Promise implementation without changing any of your code.

## Release Notes

- [Releases](https://github.com/nevware21/ts-async/releases)
- [Changelist Notes](./CHANGELIST.md)

## Browser Support

General support is currently set to ES5 supported runtimes and higher.

Internal polyfills are used to backfill ES5 functionality which is not provided by older browsers.

![Chrome](https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![IE](https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![Opera](https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Safari](https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png)
--- | --- | --- | --- | --- |
Latest ✔ | Latest ✔ | <center>9+ ✔</center> | Latest ✔ | Latest ✔ |

> Note: A PolyFill `PolyPromise` provides the standard promise implementations for IE and ES5+ environments.

## Contributing

Read our [contributing guide](./CONTRIBUTING.md) to learn about our development process, how to propose bugfixes and improvements, and how to build and test your changes.
