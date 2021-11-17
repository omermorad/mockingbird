# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.0.3](https://github.com/omermorad/mockingbird/compare/@mockingbird/common@2.0.3-rc.2...@mockingbird/common@2.0.3) (2021-11-17)

**Note:** Version bump only for package @mockingbird/common





## [2.0.3-rc.2](https://github.com/omermorad/mockingbird/compare/@mockingbird/common@2.0.3-rc.1...@mockingbird/common@2.0.3-rc.2) (2021-11-17)

**Note:** Version bump only for package @mockingbird/common





## 2.0.3-rc.1 (2021-11-17)


### Features

* **common:** add regex constructor to exact value ([10263fb](https://github.com/omermorad/mockingbird/commit/10263fb17287eb86516bd4778960586106011c2f))



## 2.1.1 (2021-08-21)



# 2.1.0 (2021-08-21)





## 2.0.3-rc.0 (2021-11-13)

**Note:** Version bump only for package @mockingbird/common





## [2.0.2](https://github.com/omermorad/mockingbird/compare/@mockingbird/common@2.0.1...@mockingbird/common@2.0.2) (2021-08-21)

**Note:** Version bump only for package @mockingbird/common





## 2.0.1 (2021-08-21)

**Note:** Version bump only for package @mockingbird/common





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





# [2.0.0-alpha.2](https://github.com/omermorad/mockingbird/compare/@mockingbird/types@2.0.0-alpha.1...@mockingbird/types@2.0.0-alpha.2) (2021-07-23)


### Bug Fixes

* **types:** change the values inside 'files' array in package.json ([a858cb4](https://github.com/omermorad/mockingbird/commit/a858cb47ef8e80d87686724d4125bd213a77ecad))





# 2.0.0-alpha.1 (2021-07-23)


### Bug Fixes

* **types:** add build to export a js file to include the faker instance (for runtime) ([#61](https://github.com/omermorad/mockingbird/issues/61)) ([f4e3092](https://github.com/omermorad/mockingbird/commit/f4e3092e683eb9c288d4e879113e71f74ec5038a))


### Features

* **mockingbird:** add mock factory fluent/builder api ([#60](https://github.com/omermorad/mockingbird/issues/60)) ([cc5710d](https://github.com/omermorad/mockingbird/commit/cc5710ded33401cae25782bb8e87efe1355024aa)), closes [#42](https://github.com/omermorad/mockingbird/issues/42)


### Reverts

* **repo:** release packages ([7f9390d](https://github.com/omermorad/mockingbird/commit/7f9390d051f9c9c9c3eb172f4db8a9fe533b03c4))


### BREAKING CHANGES

* **mockingbird:** MockGenerator is not exported anymore, use MockFactory instead





# Change Log
# [2.0.0-alpha.0](https://github.com/omermorad/mockingbird/compare/@mockingbird/types@2.0.0...@mockingbird/types@2.0.0-alpha.0) (2021-07-22)

### Features

* **mockingbird:** add mock factory fluent/builder api ([#60](https://github.com/omermorad/mockingbird/issues/60)) ([cc5710d](https://github.com/omermorad/mockingbird/commit/cc5710ded33401cae25782bb8e87efe1355024aa)), closes [#42](https://github.com/omermorad/mockingbird/issues/42)


### Reverts

* **repo:** release packages ([7f9390d](https://github.com/omermorad/mockingbird/commit/7f9390d051f9c9c9c3eb172f4db8a9fe533b03c4))


### BREAKING CHANGES

* **mockingbird:** MockGenerator is not exported anymore, use MockFactory instead
