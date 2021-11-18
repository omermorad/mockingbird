## [3.0.2](https://github.com/omermorad/mockingbird/compare/@mockingbird/parser@3.0.2...@mockingbird/parser@3.0.2) (2021-11-18)


### Bug Fixes

* **parser:** fix import and handler priority of regex + randexp ([704d392](https://github.com/omermorad/mockingbird/commit/704d39282cd2056dc4baac8bedf164bdaa95d712))


### Code Refactoring

* **parser:** add mock generator and remove analyzer ([#107](https://github.com/omermorad/mockingbird/issues/107)) ([32c0ff6](https://github.com/omermorad/mockingbird/commit/32c0ff62895a18d9e892e1280572aea3ad500491))


### Features

* **parser:** add regex functionality/handler ([#98](https://github.com/omermorad/mockingbird/issues/98)) ([ae1bac8](https://github.com/omermorad/mockingbird/commit/ae1bac8629047385741f85620a725405a3c3fa27))


### BREAKING CHANGES

* **parser:** ClassAnalayzer has been removed and all the logic has been moved to ClassParser

* test(parser): add (move) mock generator integration test

* chore(parser): config jest and typescript to run integration test

* fix(mockingbird-ts): use mock generator differently (singleton)

Remove mock generator from mockingbird-ts and import it from @mockinbird/parser instead
mock generator acts as a singleton now

* refactor(mockingbird-ts): fix mock factory

* chore(mockingbird-ts): config jest to collect coverage properly



## 2.1.1 (2021-08-21)


### Bug Fixes

* fix broken packages because of 'types' (instead common) ([#94](https://github.com/omermorad/mockingbird/issues/94)) ([fca274a](https://github.com/omermorad/mockingbird/commit/fca274aca495251b9b74a51f99f4e15c6fae5a4c))



# 2.1.0 (2021-08-21)


### Bug Fixes

* **mockingbird-ts:** change ignore term to omit (deprecation) ([#86](https://github.com/omermorad/mockingbird/issues/86)) ([f3b3ab9](https://github.com/omermorad/mockingbird/commit/f3b3ab9c53baa3c9a114775f64961ddfa59124e6))


### Code Refactoring

* **parser:** add ability to pick properties, change dependecies, add class analyzer ([1312ea9](https://github.com/omermorad/mockingbird/commit/1312ea98af94ba0b0ce62f4160f646e9c2075514)), closes [#84](https://github.com/omermorad/mockingbird/issues/84)


### Features

* **parser:** add faker as part of mutations (with callback) + test case ([59dfde7](https://github.com/omermorad/mockingbird/commit/59dfde7174e3d820506a6243f226278ce9558908))
* **types:** add exported function is-primitive ([24a4a56](https://github.com/omermorad/mockingbird/commit/24a4a5644dadc050758db2040bd0519fe2d7c8e2))


### Reverts

* Revert "chore(packages): version packages [skip ci]" ([5cbc7d6](https://github.com/omermorad/mockingbird/commit/5cbc7d67c5a62343c65fb1401e73df505cbadf52))


### BREAKING CHANGES

* **parser:** The reflector dependency is no longer injected to ClassParser



# 2.0.0 (2021-07-31)


### chore

* **release:** release version v2.0.0 ([#53](https://github.com/omermorad/mockingbird/issues/53)) ([f598ef3](https://github.com/omermorad/mockingbird/commit/f598ef35d5b9111f66202f119b8961314483f4fb)), closes [#51](https://github.com/omermorad/mockingbird/issues/51) [#40](https://github.com/omermorad/mockingbird/issues/40) [#42](https://github.com/omermorad/mockingbird/issues/42) [#37](https://github.com/omermorad/mockingbird/issues/37) [#46](https://github.com/omermorad/mockingbird/issues/46) [#47](https://github.com/omermorad/mockingbird/issues/47) [#49](https://github.com/omermorad/mockingbird/issues/49) [#50](https://github.com/omermorad/mockingbird/issues/50) [#52](https://github.com/omermorad/mockingbird/issues/52) [#54](https://github.com/omermorad/mockingbird/issues/54) [#42](https://github.com/omermorad/mockingbird/issues/42) [#55](https://github.com/omermorad/mockingbird/issues/55) [#42](https://github.com/omermorad/mockingbird/issues/42) [#56](https://github.com/omermorad/mockingbird/issues/56) [#57](https://github.com/omermorad/mockingbird/issues/57) [#58](https://github.com/omermorad/mockingbird/issues/58) [#59](https://github.com/omermorad/mockingbird/issues/59) [#60](https://github.com/omermorad/mockingbird/issues/60) [#42](https://github.com/omermorad/mockingbird/issues/42) [#61](https://github.com/omermorad/mockingbird/issues/61) [#62](https://github.com/omermorad/mockingbird/issues/62) [#64](https://github.com/omermorad/mockingbird/issues/64) [#63](https://github.com/omermorad/mockingbird/issues/63) [#67](https://github.com/omermorad/mockingbird/issues/67) [#68](https://github.com/omermorad/mockingbird/issues/68)


### BREAKING CHANGES

* **release:** MockFactory is now an instance (TClass) and not ClassLiteral<TClass>

* chore: fix typo in the test name

* chore: change methods order

* chore: added source map and some jest configs

* refactor: change some var names and error

* test(class-processor): refactor test turning into integration instead of unit

* chore(lib): move files into lib folder and change imports

* feat(fluent-api): add fluent api (builder) functionality and persistence

Add fluent API to enable methods chaining with ability to persist the mock
* **release:** MockFactory is now a function and not a class, changed the original to
MockGenerator. Add fluent API and ability to persist mock data
* **release:** MockFactory changed to be MockGenerator
* **release:** MockFactory changed to be MockGenerator
* **release:** MockGenerator is not exported anymore, use MockFactory instead



