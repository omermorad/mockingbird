# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [3.0.0-rc.0](https://github.com/omermorad/mockingbird-ts/compare/@mockinbird/parser@2.0.0...@mockinbird/parser@3.0.0-rc.0) (2021-08-18)


### Bug Fixes

* **mockingbird-ts:** change ignore term to omit (deprecation) ([#86](https://github.com/omermorad/mockingbird-ts/issues/86)) ([f3b3ab9](https://github.com/omermorad/mockingbird-ts/commit/f3b3ab9c53baa3c9a114775f64961ddfa59124e6))


### Code Refactoring

* **parser:** add ability to pick properties, change dependecies, add class analyzer ([1312ea9](https://github.com/omermorad/mockingbird-ts/commit/1312ea98af94ba0b0ce62f4160f646e9c2075514)), closes [#84](https://github.com/omermorad/mockingbird-ts/issues/84)


### Features

* **parser:** add faker as part of mutations (with callback) + test case ([59dfde7](https://github.com/omermorad/mockingbird-ts/commit/59dfde7174e3d820506a6243f226278ce9558908))


### BREAKING CHANGES

* **parser:** The reflector dependency is no longer injected to ClassParser





# 2.0.0 (2021-07-31)


### chore

* **release:** release version v2.0.0 ([#53](https://github.com/omermorad/mockingbird-ts/issues/53)) ([f598ef3](https://github.com/omermorad/mockingbird-ts/commit/f598ef35d5b9111f66202f119b8961314483f4fb)), closes [#51](https://github.com/omermorad/mockingbird-ts/issues/51) [#40](https://github.com/omermorad/mockingbird-ts/issues/40) [#42](https://github.com/omermorad/mockingbird-ts/issues/42) [#37](https://github.com/omermorad/mockingbird-ts/issues/37) [#46](https://github.com/omermorad/mockingbird-ts/issues/46) [#47](https://github.com/omermorad/mockingbird-ts/issues/47) [#49](https://github.com/omermorad/mockingbird-ts/issues/49) [#50](https://github.com/omermorad/mockingbird-ts/issues/50) [#52](https://github.com/omermorad/mockingbird-ts/issues/52) [#54](https://github.com/omermorad/mockingbird-ts/issues/54) [#42](https://github.com/omermorad/mockingbird-ts/issues/42) [#55](https://github.com/omermorad/mockingbird-ts/issues/55) [#42](https://github.com/omermorad/mockingbird-ts/issues/42) [#56](https://github.com/omermorad/mockingbird-ts/issues/56) [#57](https://github.com/omermorad/mockingbird-ts/issues/57) [#58](https://github.com/omermorad/mockingbird-ts/issues/58) [#59](https://github.com/omermorad/mockingbird-ts/issues/59) [#60](https://github.com/omermorad/mockingbird-ts/issues/60) [#42](https://github.com/omermorad/mockingbird-ts/issues/42) [#61](https://github.com/omermorad/mockingbird-ts/issues/61) [#62](https://github.com/omermorad/mockingbird-ts/issues/62) [#64](https://github.com/omermorad/mockingbird-ts/issues/64) [#63](https://github.com/omermorad/mockingbird-ts/issues/63) [#67](https://github.com/omermorad/mockingbird-ts/issues/67) [#68](https://github.com/omermorad/mockingbird-ts/issues/68)


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





## [1.0.1-alpha.3](https://github.com/omermorad/mockingbird-ts/compare/@mockinbird/parser@1.0.1-alpha.2...@mockinbird/parser@1.0.1-alpha.3) (2021-07-23)

**Note:** Version bump only for package @mockinbird/parser





## 1.0.1-alpha.2 (2021-07-23)


### Bug Fixes

* **types:** add build to export a js file to include the faker instance (for runtime) ([#61](https://github.com/omermorad/mockingbird-ts/issues/61)) ([f4e3092](https://github.com/omermorad/mockingbird-ts/commit/f4e3092e683eb9c288d4e879113e71f74ec5038a))


### Reverts

* **repo:** release packages ([7f9390d](https://github.com/omermorad/mockingbird-ts/commit/7f9390d051f9c9c9c3eb172f4db8a9fe533b03c4))





## [1.0.1-alpha.1](https://github.com/omermorad/mockingbird-ts/compare/@mockinbird/parser@2.0.0...@mockinbird/parser@1.0.1-alpha.1) (2021-07-22)


### Reverts

* **repo:** release packages ([7f9390d](https://github.com/omermorad/mockingbird-ts/commit/7f9390d051f9c9c9c3eb172f4db8a9fe533b03c4))
