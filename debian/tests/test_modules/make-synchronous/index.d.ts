import {AsyncReturnType} from 'type-fest';

// TODO: Move these to https://github.com/sindresorhus/type-fest
type AsyncFunction = (...args: any[]) => Promise<unknown>;
type ReplaceReturnType<T extends (...arguments_: any) => unknown, NewReturnType> = (...arguments_: Parameters<T>) => NewReturnType;

/**
Returns a wrapped version of the given async function which executes synchronously. This means no other code will execute (not even async code) until the given async function is done.

The given function is executed in a subprocess, so you cannot use any variables/imports from outside the scope of the function. You can pass in arguments to the function. To import dependencies, use either `require(…)` or `await import(…)` in the function body.

It uses the V8 serialization API transfer arguments, return values, errors between the subprocess and the current process. It supports most values, but not functions and symbols.

@example
```
import makeSynchronous = require('make-synchronous');

const fn = makeSynchronous(async number => {
	const delay = require('delay');

	await delay(100);

	return number * 2;
});

console.log(fn(2));
//=> 4
```
*/
declare function makeSynchronous<T extends AsyncFunction>(asyncFunction: T): ReplaceReturnType<T, AsyncReturnType<T>>;

export = makeSynchronous;
