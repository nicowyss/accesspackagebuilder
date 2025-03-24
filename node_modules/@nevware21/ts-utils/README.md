<h1 align="center">@nevware21/ts-utils</h1>
<h2 align="center">Common JavaScript/TypeScript helper functions for better minification</h2>


![GitHub Workflow Status (main)](https://img.shields.io/github/actions/workflow/status/nevware21/ts-utils/ci.yml?branch=main)
[![codecov](https://codecov.io/gh/nevware21/ts-utils/branch/main/graph/badge.svg?token=8YCAMUA7VB)](https://codecov.io/gh/nevware21/ts-utils)
[![npm version](https://badge.fury.io/js/%40nevware21%2Fts-utils.svg)](https://badge.fury.io/js/%40nevware21%2Fts-utils)
[![downloads](https://img.shields.io/npm/dt/%40nevware21/ts-utils.svg)](https://www.npmjs.com/package/%40nevware21/ts-utils)
[![downloads](https://img.shields.io/npm/dm/%40nevware21/ts-utils.svg)](https://www.npmjs.com/package/%40nevware21/ts-utils)

## Description

This is a collection of general JavaScript functions (written in and for TypeScript) to aid with removing code duplication to assist with minification, the provided functions are expected to only rarely be included in their namespaced environment.

Support for standard JavaScript functions (ES5+) that are not support in all environments will be backed by internal polyfill implementations when not available.

### Test Environments

- Node (16, 18, 20)
- Browser (Chromium - headless)
- Web Worker (Chromium - headless)

All of the polyfill functions are tested against the standard native implementations for node, browser and web-worker to ensure compatibility.

### Documentation and details

See the documentation [generated from source code](https://nevware21.github.io/ts-utils/typedoc/index.html) via typedoc for a full list and details of all of the available types,  functions and interfaces.

See [Browser Support](#browser-support) for details.

| Type                       | Functions / Helpers / Aliases / Polyfills
|----------------------------|---------------------------------------------------
| Runtime Environment Checks | <code>[getCancelIdleCallback](https://nevware21.github.io/ts-utils/typedoc/functions/getCancelIdleCallback.html)(); [getDocument](https://nevware21.github.io/ts-utils/typedoc/functions/getDocument.html)(); [getGlobal](https://nevware21.github.io/ts-utils/typedoc/functions/getGlobal.html)(); [getHistory](https://nevware21.github.io/ts-utils/typedoc/functions/getHistory.html)(); [getIdleCallback](https://nevware21.github.io/ts-utils/typedoc/functions/getIdleCallback.html)(); [getInst](https://nevware21.github.io/ts-utils/typedoc/functions/getInst.html)(); [getNavigator](https://nevware21.github.io/ts-utils/typedoc/functions/getNavigator.html)(); [getPerformance](https://nevware21.github.io/ts-utils/typedoc/functions/getPerformance.html)(); [getWindow](https://nevware21.github.io/ts-utils/typedoc/functions/getWindow.html)(); [hasDocument](https://nevware21.github.io/ts-utils/typedoc/functions/hasDocument.html)(); [hasHistory](https://nevware21.github.io/ts-utils/typedoc/functions/hasHistory.html)(); [hasNavigator](https://nevware21.github.io/ts-utils/typedoc/functions/hasNavigator.html)(); [hasPerformance](https://nevware21.github.io/ts-utils/typedoc/functions/hasPerformance.html)(); [hasWindow](https://nevware21.github.io/ts-utils/typedoc/functions/hasWindow.html)(); [isNode](https://nevware21.github.io/ts-utils/typedoc/functions/isNode.html)(); [isWebWorker](https://nevware21.github.io/ts-utils/typedoc/functions/isWebWorker.html)(); [hasIdleCallback](https://nevware21.github.io/ts-utils/typedoc/functions/hasIdleCallback.html)(); [lazySafeGetInst](https://nevware21.github.io/ts-utils/typedoc/functions/lazySafeGetInst.html)(); </code>
| Type Identity              | <code>[isArray](https://nevware21.github.io/ts-utils/typedoc/functions/isArray.html)(); [isArrayBuffer](https://nevware21.github.io/ts-utils/typedoc/functions/isArrayBuffer.html)(); [isBlob](https://nevware21.github.io/ts-utils/typedoc/functions/isBlob.html)(); [isBoolean](https://nevware21.github.io/ts-utils/typedoc/functions/isBoolean.html)(); [isDate](https://nevware21.github.io/ts-utils/typedoc/functions/isDate.html)(); [isError](https://nevware21.github.io/ts-utils/typedoc/functions/isError.html)(); [isFile](https://nevware21.github.io/ts-utils/typedoc/functions/isFile.html)(); [isFormData](https://nevware21.github.io/ts-utils/typedoc/functions/isFormData.html)(); [isFunction](https://nevware21.github.io/ts-utils/typedoc/functions/isFunction.html)(); [isIterable](https://nevware21.github.io/ts-utils/typedoc/functions/isIterable.html)(); [isIterator](https://nevware21.github.io/ts-utils/typedoc/functions/isIterator.html)(); [isNullOrUndefined](https://nevware21.github.io/ts-utils/typedoc/functions/isNullOrUndefined.html)(); [isNumber](https://nevware21.github.io/ts-utils/typedoc/functions/isNumber.html)(); [isObject](https://nevware21.github.io/ts-utils/typedoc/functions/isObject.html)(); [isPlainObject](https://nevware21.github.io/ts-utils/typedoc/functions/isPlainObject.html)(); [isPrimitive](https://nevware21.github.io/ts-utils/typedoc/functions/isPrimitive.html)(); [isPrimitiveType](https://nevware21.github.io/ts-utils/typedoc/functions/isPrimitiveType.html)(); [isPromise](https://nevware21.github.io/ts-utils/typedoc/functions/isPromise.html)(); [isPromiseLike](https://nevware21.github.io/ts-utils/typedoc/functions/isPromiseLike.html)(); [isThenable](https://nevware21.github.io/ts-utils/typedoc/functions/isThenable.html)(); [isRegExp](https://nevware21.github.io/ts-utils/typedoc/functions/isRegExp.html)(); [isStrictNullOrUndefined](https://nevware21.github.io/ts-utils/typedoc/functions/isStrictNullOrUndefined.html)(); [isStrictUndefined](https://nevware21.github.io/ts-utils/typedoc/functions/isStrictUndefined.html)(); [isString](https://nevware21.github.io/ts-utils/typedoc/functions/isString.html)(); [isTypeof](https://nevware21.github.io/ts-utils/typedoc/functions/isTypeof.html)(); [isUndefined](https://nevware21.github.io/ts-utils/typedoc/functions/isUndefined.html)();</code>
| Value Check                | <code>[hasValue](https://nevware21.github.io/ts-utils/typedoc/functions/hasValue.html)(); [isDefined](https://nevware21.github.io/ts-utils/typedoc/functions/isDefined.html)(); [isNotTruthy](https://nevware21.github.io/ts-utils/typedoc/functions/isNotTruthy.html)(); [isNullOrUndefined](https://nevware21.github.io/ts-utils/typedoc/functions/isNullOrUndefined.html)(); [isStrictNullOrUndefined](https://nevware21.github.io/ts-utils/typedoc/functions/isStrictNullOrUndefined.html)(); [isStrictUndefined](https://nevware21.github.io/ts-utils/typedoc/functions/isStrictUndefined.html)(); [isTruthy](https://nevware21.github.io/ts-utils/typedoc/functions/isTruthy.html)(); [isUndefined](https://nevware21.github.io/ts-utils/typedoc/functions/isUndefined.html)();</code>
| Value                      | <code>[getValueByKey](https://nevware21.github.io/ts-utils/typedoc/functions/getValueByKey.html)(); [setValueByKey](https://nevware21.github.io/ts-utils/typedoc/functions/setValueByKey.html)(); [getValueByIter](https://nevware21.github.io/ts-utils/typedoc/functions/getValueByIter.html)(); [setValueByIter](https://nevware21.github.io/ts-utils/typedoc/functions/setValueByIter.html)(); [encodeAsJson](https://nevware21.github.io/ts-utils/typedoc/functions/encodeAsJson.html)(); [encodeAsHtml](https://nevware21.github.io/ts-utils/typedoc/functions/encodeAsHtml.html)(); [asString](https://nevware21.github.io/ts-utils/typedoc/functions/asString.html)(); [getIntValue](https://nevware21.github.io/ts-utils/typedoc/functions/getIntValue.html)(); [normalizeJsName](https://nevware21.github.io/ts-utils/typedoc/functions/normalizeJsName.html)();</code>
| &nbsp;                     | &nbsp;
| Array                      | <code>[arrAppend](https://nevware21.github.io/ts-utils/typedoc/functions/arrAppend.html)(); [arrContains](https://nevware21.github.io/ts-utils/typedoc/functions/arrContains.html)(); [arrEvery](https://nevware21.github.io/ts-utils/typedoc/functions/arrEvery.html)(); [arrFilter](https://nevware21.github.io/ts-utils/typedoc/functions/arrFilter.html)(); [arrFind](https://nevware21.github.io/ts-utils/typedoc/functions/arrFind.html)(); [arrFindIndex](https://nevware21.github.io/ts-utils/typedoc/functions/arrFindIndex.html)(); [arrFindLast](https://nevware21.github.io/ts-utils/typedoc/functions/arrFindLast.html)(); [arrFindLastIndex](https://nevware21.github.io/ts-utils/typedoc/functions/arrFindLastIndex.html)(); [arrForEach](https://nevware21.github.io/ts-utils/typedoc/functions/arrForEach.html)(); [arrFrom](https://nevware21.github.io/ts-utils/typedoc/functions/arrFrom.html)(); [arrIncludes](https://nevware21.github.io/ts-utils/typedoc/functions/arrIncludes.html)(); [arrIndexOf](https://nevware21.github.io/ts-utils/typedoc/functions/arrIndexOf.html)(); [arrLastIndexOf](https://nevware21.github.io/ts-utils/typedoc/functions/arrLastIndexOf.html)(); [arrMap](https://nevware21.github.io/ts-utils/typedoc/functions/arrMap.html)(); [arrReduce](https://nevware21.github.io/ts-utils/typedoc/functions/arrReduce.html)(); [arrSlice](https://nevware21.github.io/ts-utils/typedoc/functions/arrSlice.html)(); [arrSome](https://nevware21.github.io/ts-utils/typedoc/functions/arrSome.html)(); [getLength](https://nevware21.github.io/ts-utils/typedoc/functions/getLength.html)(); [isArray](https://nevware21.github.io/ts-utils/typedoc/functions/isArray.html)();<br/>[polyIsArray](https://nevware21.github.io/ts-utils/typedoc/functions/polyIsArray.html)(); [polyArrIncludes](https://nevware21.github.io/ts-utils/typedoc/functions/polyArrIncludes.html)(); [polyArrFind](https://nevware21.github.io/ts-utils/typedoc/functions/polyArrFind.html)(); [polyArrFindIndex](https://nevware21.github.io/ts-utils/typedoc/functions/polyArrFindIndex.html)(); [polyArrFindLast](https://nevware21.github.io/ts-utils/typedoc/functions/polyArrFindLast.html)(); [polyArrFindLast](https://nevware21.github.io/ts-utils/typedoc/functions/polyArrFindLast.html)(); [polyArrFindLastIndex](https://nevware21.github.io/ts-utils/typedoc/functions/polyArrFindLastIndex.html)(); [polyArrFrom](https://nevware21.github.io/ts-utils/typedoc/functions/polyArrFrom.html)();</code>
| ArrayLike                  | <code>[arrContains](https://nevware21.github.io/ts-utils/typedoc/functions/arrContains.html)(); [arrEvery](https://nevware21.github.io/ts-utils/typedoc/functions/arrEvery.html)(); [arrFilter](https://nevware21.github.io/ts-utils/typedoc/functions/arrFilter.html)(); [arrFind](https://nevware21.github.io/ts-utils/typedoc/functions/arrFind.html)(); [arrFindIndex](https://nevware21.github.io/ts-utils/typedoc/functions/arrFindIndex.html)(); [arrFindLast](https://nevware21.github.io/ts-utils/typedoc/functions/arrFindLast.html)(); [arrFindLastIndex](https://nevware21.github.io/ts-utils/typedoc/functions/arrFindLastIndex.html)(); [arrForEach](https://nevware21.github.io/ts-utils/typedoc/functions/arrForEach.html)(); [arrFrom](https://nevware21.github.io/ts-utils/typedoc/functions/arrFrom.html)(); [arrIncludes](https://nevware21.github.io/ts-utils/typedoc/functions/arrIncludes.html)(); [arrIndexOf](https://nevware21.github.io/ts-utils/typedoc/functions/arrIndexOf.html)(); [arrLastIndexOf](https://nevware21.github.io/ts-utils/typedoc/functions/arrLastIndexOf.html)(); [arrMap](https://nevware21.github.io/ts-utils/typedoc/functions/arrMap.html)(); [arrReduce](https://nevware21.github.io/ts-utils/typedoc/functions/arrReduce.html)(); [arrSlice](https://nevware21.github.io/ts-utils/typedoc/functions/arrSlice.html)(); [arrSome](https://nevware21.github.io/ts-utils/typedoc/functions/arrSome.html)(); [getLength](https://nevware21.github.io/ts-utils/typedoc/functions/getLength.html)(); [objEntries](https://nevware21.github.io/ts-utils/typedoc/functions/objEntries.html)(); [objValues](https://nevware21.github.io/ts-utils/typedoc/functions/objValues.html)();</code>
| Enum                       | <code>[createEnum](https://nevware21.github.io/ts-utils/typedoc/functions/createEnum.html)(); [createEnumKeyMap](https://nevware21.github.io/ts-utils/typedoc/functions/createEnumKeyMap.html)(); [createEnumValueMap](https://nevware21.github.io/ts-utils/typedoc/functions/createEnumValueMap.html)(); [createSimpleMap](https://nevware21.github.io/ts-utils/typedoc/functions/createSimpleMap.html)(); [createTypeMap](https://nevware21.github.io/ts-utils/typedoc/functions/createTypeMap.html)();</code>
| Error                      | <code>[createCustomError](https://nevware21.github.io/ts-utils/typedoc/functions/createCustomError.html)(); [isError](https://nevware21.github.io/ts-utils/typedoc/functions/isError.html)(); [throwError](https://nevware21.github.io/ts-utils/typedoc/functions/throwError.html)(); [throwRangeError](https://nevware21.github.io/ts-utils/typedoc/functions/throwRangeError.html)(); [throwTypeError](https://nevware21.github.io/ts-utils/typedoc/functions/throwTypeError.html)(); [throwUnsupported](https://nevware21.github.io/ts-utils/typedoc/functions/throwUnsupported.html)();</code>
| Function                   | <code>[fnApply](https://nevware21.github.io/ts-utils/typedoc/functions/fnApply.html)(); [fnBind](https://nevware21.github.io/ts-utils/typedoc/functions/fnBind.html)(); [fnCall](https://nevware21.github.io/ts-utils/typedoc/functions/fnCall.html)(); [createFnDeferredProxy](https://nevware21.github.io/ts-utils/typedoc/functions/createFnDeferredProxy.html)(); [createProxyFuncs](https://nevware21.github.io/ts-utils/typedoc/functions/createProxyFuncs.html)(); [readArgs](https://nevware21.github.io/ts-utils/typedoc/functions/readArgs.html)();</code>
| Idle | <code>[getCancelIdleCallback](https://nevware21.github.io/ts-utils/typedoc/functions/getCancelIdleCallback.html)(); [getIdleCallback](https://nevware21.github.io/ts-utils/typedoc/functions/getIdleCallback.html)(); [hasIdleCallback](https://nevware21.github.io/ts-utils/typedoc/functions/hasIdleCallback.html)();  </code>
| Iterator                   | <code>[createArrayIterator](https://nevware21.github.io/ts-utils/typedoc/functions/createArrayIterator.html)(); [createIterator](https://nevware21.github.io/ts-utils/typedoc/functions/createIterator.html)(); [createIterable](https://nevware21.github.io/ts-utils/typedoc/functions/createIterable.html)(); [createRangeIterator](https://nevware21.github.io/ts-utils/typedoc/functions/createRangeIterator.html)(); [iterForOf](https://nevware21.github.io/ts-utils/typedoc/functions/iterForOf.html)(); [isIterable](https://nevware21.github.io/ts-utils/typedoc/functions/isIterable.html)(); [isIterator](https://nevware21.github.io/ts-utils/typedoc/functions/isIterator.html)(); [makeIterable](https://nevware21.github.io/ts-utils/typedoc/functions/makeIterable.html)(); [arrAppend](https://nevware21.github.io/ts-utils/typedoc/functions/arrAppend.html)(); [arrFrom](https://nevware21.github.io/ts-utils/typedoc/functions/arrFrom.html)();</code>
| Math                       | <code>[mathCeil](https://nevware21.github.io/ts-utils/typedoc/functions/mathCeil.html)(); [mathFloor](https://nevware21.github.io/ts-utils/typedoc/functions/mathFloor.html)(); [mathMax](https://nevware21.github.io/ts-utils/typedoc/functions/mathMax.html)(); [mathMin](https://nevware21.github.io/ts-utils/typedoc/functions/mathMin.html)(); [mathRound](https://nevware21.github.io/ts-utils/typedoc/functions/mathRound.html)(); [mathToInt](https://nevware21.github.io/ts-utils/typedoc/functions/mathToInt.html)(); [mathTrunc](https://nevware21.github.io/ts-utils/typedoc/functions/mathTrunc.html)();</code>
| Object                     | <code>[deepExtend](https://nevware21.github.io/ts-utils/typedoc/functions/deepExtend.html)(); [isObject](https://nevware21.github.io/ts-utils/typedoc/functions/isObject.html)(); [objAssign](https://nevware21.github.io/ts-utils/typedoc/functions/objAssign.html)(); [objCopyProps](https://nevware21.github.io/ts-utils/typedoc/functions/objCopyProps.html)(); [objCreate](https://nevware21.github.io/ts-utils/typedoc/functions/objCreate.html)(); [objDeepCopy](https://nevware21.github.io/ts-utils/typedoc/functions/objDeepCopy.html)(); [objDeepFreeze](https://nevware21.github.io/ts-utils/typedoc/functions/objDeepFreeze.html)(); [objDefine](https://nevware21.github.io/ts-utils/typedoc/functions/objDefine.html)(); [objDefineAccessors](https://nevware21.github.io/ts-utils/typedoc/functions/objDefineAccessors.html)(); [objDefineGet](https://nevware21.github.io/ts-utils/typedoc/functions/objDefineGet.html)(); [objDefineProp](https://nevware21.github.io/ts-utils/typedoc/functions/objDefineProp.html)(); [objDefineProps](https://nevware21.github.io/ts-utils/typedoc/functions/objDefineProps.html)(); [objDefineProperties](https://nevware21.github.io/ts-utils/typedoc/functions/objDefineProperties.html)(); [objEntries](https://nevware21.github.io/ts-utils/typedoc/functions/objEntries.html)(); [objExtend](https://nevware21.github.io/ts-utils/typedoc/functions/objExtend.html)(); [objForEachKey](https://nevware21.github.io/ts-utils/typedoc/functions/objForEachKey.html)(); [objFreeze](https://nevware21.github.io/ts-utils/typedoc/functions/objFreeze.html)(); [objGetOwnPropertyDescriptor](https://nevware21.github.io/ts-utils/typedoc/functions/objGetOwnPropertyDescriptor.html)(); [objHasOwn](https://nevware21.github.io/ts-utils/typedoc/functions/objHasOwn.html)(); [objHasOwnProperty](https://nevware21.github.io/ts-utils/typedoc/functions/objHasOwnProperty.html)(); [objKeys](https://nevware21.github.io/ts-utils/typedoc/functions/objKeys.html)(); [objSeal](https://nevware21.github.io/ts-utils/typedoc/functions/objSeal.html)(); [objGetPrototypeOf](https://nevware21.github.io/ts-utils/typedoc/functions/objGetPrototypeOf.html)(); [objSetPrototypeOf](https://nevware21.github.io/ts-utils/typedoc/functions/objSetPrototypeOf.html)(); [objToString](https://nevware21.github.io/ts-utils/typedoc/functions/objToString.html)(); [objValues](https://nevware21.github.io/ts-utils/typedoc/functions/objValues.html)();<br/>[polyObjEntries](https://nevware21.github.io/ts-utils/typedoc/functions/polyObjEntries.html)(); [polyObjKeys](https://nevware21.github.io/ts-utils/typedoc/functions/polyObjKeys.html)(); [polyObjHasOwn](https://nevware21.github.io/ts-utils/typedoc/functions/polyObjHasOwn.html)(); [polyObjValues](https://nevware21.github.io/ts-utils/typedoc/functions/polyObjValues.html)();</code>
| String                     | <code>[asString](https://nevware21.github.io/ts-utils/typedoc/functions/asString.html)(); [getLength](https://nevware21.github.io/ts-utils/typedoc/functions/getLength.html)(); [isString](https://nevware21.github.io/ts-utils/typedoc/functions/isString.html)(); [strEndsWith](https://nevware21.github.io/ts-utils/typedoc/functions/strEndsWith.html)(); [strIndexOf](https://nevware21.github.io/ts-utils/typedoc/functions/strIndexOf.html)(); [strIsNullOrEmpty](https://nevware21.github.io/ts-utils/typedoc/functions/strIsNullOrEmpty.html)(); [strIsNullOrWhiteSpace](https://nevware21.github.io/ts-utils/typedoc/functions/strIsNullOrWhiteSpace.html)(); [strLastIndexOf](https://nevware21.github.io/ts-utils/typedoc/functions/strLastIndexOf.html)(); [strLeft](https://nevware21.github.io/ts-utils/typedoc/functions/strLeft.html)(); [strPadEnd](https://nevware21.github.io/ts-utils/typedoc/functions/strPadEnd.html)(); [strPadStart](https://nevware21.github.io/ts-utils/typedoc/functions/strPadStart.html)(); [strRepeat](https://nevware21.github.io/ts-utils/typedoc/functions/strRepeat.html)(); [strRight](https://nevware21.github.io/ts-utils/typedoc/functions/strRight.html)(); [strSlice](https://nevware21.github.io/ts-utils/typedoc/functions/strSlice.html)(); [strStartsWith](https://nevware21.github.io/ts-utils/typedoc/functions/strStartsWith.html)(); [strSubstr](https://nevware21.github.io/ts-utils/typedoc/functions/strSubstr.html)(); [strSubstring](https://nevware21.github.io/ts-utils/typedoc/functions/strSubstring.html)(); [strTrim](https://nevware21.github.io/ts-utils/typedoc/functions/strTrim.html)(); [strTrimEnd](https://nevware21.github.io/ts-utils/typedoc/functions/strTrimEnd.html)(); [strTrimLeft](https://nevware21.github.io/ts-utils/typedoc/functions/strTrimLeft.html)(); [strTrimRight](https://nevware21.github.io/ts-utils/typedoc/functions/strTrimRight.html)(); [strTrimStart](https://nevware21.github.io/ts-utils/typedoc/functions/strTrimStart.html)(); [strLetterCase](https://nevware21.github.io/ts-utils/typedoc/functions/strLetterCase.html)(); [strCamelCase](https://nevware21.github.io/ts-utils/typedoc/functions/strCamelCase.html)(); [strKebabCase](https://nevware21.github.io/ts-utils/typedoc/functions/strKebabCase.html)(); [strSnakeCase](https://nevware21.github.io/ts-utils/typedoc/functions/strSnakeCase.html)(); [strUpper](https://nevware21.github.io/ts-utils/typedoc/functions/strUpper.html)(); [strLower](https://nevware21.github.io/ts-utils/typedoc/functions/strLower.html)(); [strContains](https://nevware21.github.io/ts-utils/typedoc/functions/strContains.html)(); [strIncludes](https://nevware21.github.io/ts-utils/typedoc/functions/strIncludes.html)(); <br/>[polyStrSubstr](https://nevware21.github.io/ts-utils/typedoc/functions/polyStrSubstr.html)(); [polyStrTrim](https://nevware21.github.io/ts-utils/typedoc/functions/polyStrTrim.html)(); [polyStrTrimEnd](https://nevware21.github.io/ts-utils/typedoc/functions/polyStrTrimEnd.html)(); [polyStrTrimStart](https://nevware21.github.io/ts-utils/typedoc/functions/polyStrTrimStart.html)(); [polyStrIncludes](https://nevware21.github.io/ts-utils/typedoc/functions/polyStrIncludes.html)(); </code>
| Symbol                     | <code>[WellKnownSymbols](https://nevware21.github.io/ts-utils/typedoc/enums/WellKnownSymbols.html) (const enum);<br/>[getKnownSymbol](https://nevware21.github.io/ts-utils/typedoc/functions/getKnownSymbol.html)(); [getSymbol](https://nevware21.github.io/ts-utils/typedoc/functions/getSymbol.html)(); [hasSymbol](https://nevware21.github.io/ts-utils/typedoc/functions/hasSymbol.html)(); [isSymbol](https://nevware21.github.io/ts-utils/typedoc/functions/isSymbol.html)(); [newSymbol](https://nevware21.github.io/ts-utils/typedoc/functions/newSymbol.html)(); [symbolFor](https://nevware21.github.io/ts-utils/typedoc/functions/symbolFor.html)(); [symbolKeyFor](https://nevware21.github.io/ts-utils/typedoc/functions/symbolKeyFor.html)();<br/>[polyGetKnownSymbol](https://nevware21.github.io/ts-utils/typedoc/functions/polyGetKnownSymbol.html)(); [polyNewSymbol](https://nevware21.github.io/ts-utils/typedoc/functions/polyNewSymbol.html)(); [polySymbolFor](https://nevware21.github.io/ts-utils/typedoc/functions/polySymbolFor.html)(); [polySymbolKeyFor](https://nevware21.github.io/ts-utils/typedoc/functions/polySymbolKeyFor.html)();</code><br/>Polyfills are used to automatically backfill runtimes that do not support `Symbol`, not all of the Symbol functionality is provided.
| Timer                      | <code>[elapsedTime](https://nevware21.github.io/ts-utils/typedoc/functions/elapsedTime.html)(); [perfNow](https://nevware21.github.io/ts-utils/typedoc/functions/perfNow.html)(); [utcNow](https://nevware21.github.io/ts-utils/typedoc/functions/utcNow.html)(); [scheduleIdleCallback](https://nevware21.github.io/ts-utils/typedoc/functions/scheduleIdleCallback.html)(); [scheduleInterval](https://nevware21.github.io/ts-utils/typedoc/functions/scheduleInterval.html)(); [scheduleTimeout](https://nevware21.github.io/ts-utils/typedoc/functions/scheduleTimeout.html)(); [scheduleTimeoutWith](https://nevware21.github.io/ts-utils/typedoc/functions/scheduleTimeoutWith.html)(); [hasIdleCallback](https://nevware21.github.io/ts-utils/typedoc/functions/hasIdleCallback.html)(); </code><br/>For runtimes that don't support `requestIdleCallback` normal setTimeout() is used with the values from [`setDefaultIdleTimeout`](https://nevware21.github.io/ts-utils/typedoc/functions/setDefaultIdleTimeout.html)() and [`setDefaultMaxExecutionTime`](https://nevware21.github.io/ts-utils/typedoc/functions/setDefaultMaxExecutionTime.html)(); <br /><code>[polyUtcNow](https://nevware21.github.io/ts-utils/typedoc/functions/polyUtcNow.html)();</code>
| Conversion                 | <code>[encodeAsJson](https://nevware21.github.io/ts-utils/typedoc/functions/encodeAsJson.html)(); [encodeAsHtml](https://nevware21.github.io/ts-utils/typedoc/functions/encodeAsHtml.html)(); [asString](https://nevware21.github.io/ts-utils/typedoc/functions/asString.html)(); [getIntValue](https://nevware21.github.io/ts-utils/typedoc/functions/getIntValue.html)(); [normalizeJsName](https://nevware21.github.io/ts-utils/typedoc/functions/normalizeJsName.html)(); [strLetterCase](https://nevware21.github.io/ts-utils/typedoc/functions/strLetterCase.html)(); [strCamelCase](https://nevware21.github.io/ts-utils/typedoc/functions/strCamelCase.html)(); [strKebabCase](https://nevware21.github.io/ts-utils/typedoc/functions/strKebabCase.html)(); [strSnakeCase](https://nevware21.github.io/ts-utils/typedoc/functions/strSnakeCase.html)(); [strUpper](https://nevware21.github.io/ts-utils/typedoc/functions/strUpper.html)(); [strLower](https://nevware21.github.io/ts-utils/typedoc/functions/strLower.html)(); </code>
| Cache                      | <code>[createCachedValue](https://nevware21.github.io/ts-utils/typedoc/functions/createCachedValue.html)(); [createDeferredCachedValue](https://nevware21.github.io/ts-utils/typedoc/functions/createDeferredCachedValue.html)();
| Lazy                       | <code>[getLazy](https://nevware21.github.io/ts-utils/typedoc/functions/getLazy.html)(); [getWritableLazy](https://nevware21.github.io/ts-utils/typedoc/functions/getWritableLazy.html)(); [lazySafeGetInst](https://nevware21.github.io/ts-utils/typedoc/functions/lazySafeGetInst.html)(); [safeGetLazy](https://nevware21.github.io/ts-utils/typedoc/functions/safeGetLazy.html)(); </code>
| Safe                       | <code>[safe](https://nevware21.github.io/ts-utils/typedoc/functions/safe.html)(); [safeGetLazy](https://nevware21.github.io/ts-utils/typedoc/functions/safeGetLazy.html)(); [safeGet](https://nevware21.github.io/ts-utils/typedoc/functions/safeGet.html)(); [lazySafeGetInst](https://nevware21.github.io/ts-utils/typedoc/functions/lazySafeGetInst.html)(); [safeGetLazy](https://nevware21.github.io/ts-utils/typedoc/functions/safeGetLazy.html)(); [safeGetWritableLazy](https://nevware21.github.io/ts-utils/typedoc/functions/safeGetWritableLazy.html)(); </code>
| Diagnostic                 | <code>[dumpObj](https://nevware21.github.io/ts-utils/typedoc/functions/dumpObj.html)(); </code>


> Unless otherwise stated in the functions documentation polyfills are used to automatically backfill unsupported functions in older ES5 runtimes

## Language ECMAScript Support

### ES5

This library plans to maintain ES5 compatibility for all versions of v0.x and v1.x releases

### ES(future [6 next, etc])

Future versions of this library starting at version 2.x are planned to lift and remove the internal polyfills to support the new targetted baseline once it is defined.
ie. It may or may not be ES6 depending on the runtime landscape and requests received.

When we release v2.x the supported browser matrix will also shift as required to match the defined language level supported at that time. 

## TypeScript Support

This library is built using TypeScript v4.9.5 and uses some keywords that where added in v2.8, so while it is recommended that you use at least v4.9.5, but the definitions will require at least v2.8 and therefore this will be the current minimum support version. If there are issues with any versions of TypeScript please open an issue and we will review whether its possible to work around any limitations with any specific features. 

## Quickstart

Install the npm packare: `npm install @nevware21/ts-utils --save`

> It is suggested / recommended that you use the following definition in your `package.json` so that you are compatible with any future releases as they become available
> we do not intend to make ANY known breaking changes moving forward until v2.x 
> ```json
> "@nevware21/ts-utils": ">= 0.11.8 < 2.x"
> ```

And then just import the helpers and use them.

### Simple Example

These are simple representations of using some of the basic function vs the standard provided JavaScript versions.
Examples are also being included in the source and generated typedoc documentation.

__Using Helpers__

```TypeScript
import { isArray, arrForEach, objForEachKey, objHasOwnProperty } from "@nevware21/ts-utils";

export function simpleTest(theValue: any): string[] {
    let result: any[] = [];

    if (isArray(theValue)) {
        arrForEach(theValue, (value, idx) => {
            if (objHasOwnProperty(theValue, value)) {
                result.push(idx + ":" + value);
            }
        });
    } else {
        objForEachKey(theValue, (key, value) => {
            if (value) {
                result.push(key + "=" + value);
            }
        });
    }

    return result;
}
```

Or checking if a variable is a string

```TypeScript

import { isString } from "@nevware21/ts-utils";

function checkString(value: any) {
    let ug = 1;

    return isString(value);
}
```

__Using standard JS functions__

```TypeScript
export function simpleTest2(theValue: any): string[] {
    let result: any[] = [];

    if (Array.isArray(theValue)) {
        for (let idx = 0; idx < theValue.length; idx++) {
            if (idx in theValue) {
                let value = theValue[idx];
                if (theValue.hasOwnProperty(value)) {
                    result.push(idx + ":" + value);
                }
            }
        }
    } else {
        Object.keys(theValue).forEach((key) => {
            let value = theValue[key];
            if (value) {
                result.push(key + "=" + value);
            }
        });
    }

    return result;
}
```

Just from use the helpers you can visually see that the code you write is visually simpler and it removes the need for some standard biolerplate code that you should use when iterating over objects.

But if we have a look at what the minified version might look like the difference becomes even more obvious, as while the helper function names can be minified (because they are not global and they are not namespaced against any object) while the standard public classes and their any functions cannot (normally) be minified. (There are tricks you can do in your own code but it can become messy, this library actually uses those techniques internally to aid with minification).

__Minified Using Helpers (~160 bytes)__
but <u>not</u> including the actual helpers

```JavaScript
function simpleTest(t){var r=[];if (a(t)) {f(t,function(v, i){if (h(t,v)) {r.push(i+":"+v);}});}else{e(t,function(k,v){if(v){r.push(k+"="+v);}});}return r;}
```

__Minified Without helpers (~240 bytes)__

```JavaScript
function simpleTest2(t){var r=[];if(Array.isArray(t)){for(var i=0;i<t.length;i++){if(i in t){var v=t[i];if(t.hasOwnProperty(v)){r.push(i+":"+v);}}}}else{Object.keys(t).forEach(function(k){var v=t[k];if(v){r.push(k+"="+v);}});}return r;}
```

While there are obvious savings here (~80 bytes), for this derrived simple case once you add the helper implementations back to the `simpleTest` instance (about 240 bytes the 4 used functions) then you would be better off just using the normal functions as you would still be using 160 bytes less.

For any real world code though you will find that the normal JS functions are repeated a lot and that is when the savings kick in. Lets just take these 2 sinple examples and assume some very simple duplication of the same code.

| Instances | Real functions<br/>Total = count * 240 bytes | Using Helpers<br/>Total = (count * 160) + 240 bytes<br/><sub>assuming 240 bytes are only required once as the helpers don't need to be duplicated</sub><br/> | Delta
|-----------|---------------|--------------|------
| 1 | 240 | 400 | -160 bytes
| 2 | 480 | 560 | -80 bytes
| 3 | 720 | 720 | 0 bytes (break even)
| 4 | 960 | 880 | 80 bytes
| 5 | 1200 | 1040 | 160 bytes
| 10 | 2400 | 1840 | 560 bytes

In practice the savings are not so easily calculated as it really does depend on which functions you are using, how many times and the "length" of the function name and how you call the function. For example in the above this calls __`theValue.hasOwnProperty`__`(value)` which assumes that the `any` value passed is always an object and therefore has this function available, while the helper actually always calls __`Object.prototype.hasOwnProperty.call`__`(theValue,value)`, so it will always call the object instance and if you do this in your code suddenly you have 37 bytes of uncompressable code vs 15 (for just `hasOwnProperty`), while when you always use the helper each usage generally becomes a single byte __`h`__`(theValue)`.

What does this mean? Generally, that you savings will vary, but you _should_ find that by using these utility functions instead of the standard JavaScript versions (when available) you code will be smaller.

Could you do all of this yourself and create your own "helper" function -- Yes. In fact before publishing this set of utilities that is exactly what we did in every project, mostly just copying from the previous project. And whenever we "fixed" a bug or updated the functionality guess what happened... Update nightmare finding all of the instances in every project.

## Browser Support

General support is currently set to ES5 supported runtimes and higher.

Internal polyfills are used to backfill ES5 functionality which is not provided by older browsers.

![Chrome](https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![IE](https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![Opera](https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Safari](https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png)
--- | --- | --- | --- | --- |
Latest ✔ | Latest ✔ | <center>9+ ✔</center> | Latest ✔ | Latest ✔ |

> Note: While some polyfills are provided to "somewhat" support ES3/IE8 this library does not intend to become a fully fledged polyfill library. And the polyfills provided (or contributed) are just the minimum set that have been required over time. And should be less necessary are time moves forward.

### Polyfills

All of the included polyfills are tested against the current native implementation running in `node`, `browser` and `worker` environments to ensure that they conform to the current specification, these polyfills are only internally used for ES5 compatibility and when running in an environment (mostly IE) that does not support the required function.

Some additional polyfills are provided for simple backward compatability to enable the utility functions in older environments (such as ES3 / IE8), however, you don't have to use or include these provided polyfils. If you need to use them you will need to import the pre-packaged "polyfill" bundle (`bundle/ts-polyfills-utils.min.js`) directly by hosting it on your own CDN or all of the non-internal polyfill implementations are exported so you could implement your own version of the [polyfill initializer](https://github.com/nevware21/ts-utils/blob/main/lib/src/polyfills.ts) or more simply provide your own alternatives.

> Note: Several functions use the [Object.defineProperty](https://caniuse.com/?search=Object.defineProperty) and therefore support is limited to runtimes or good polyfills that can correctly implement this functionality. (eg. createIterator; createIterable)

## Contributing

Read our [contributing guide](./CONTRIBUTING.md) to learn about our development process, how to propose bugfixes and improvements, and how to build and test your changes.

