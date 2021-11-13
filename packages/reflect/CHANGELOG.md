# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [3.1.0-rc.0](https://github.com/omermorad/mockingbird/compare/@mockinbird/reflect@3.0.1...@mockinbird/reflect@3.1.0-rc.0) (2021-11-13)


### Features

* **parser:** add regex functionality/handler ([#98](https://github.com/omermorad/mockingbird/issues/98)) ([ae1bac8](https://github.com/omermorad/mockingbird/commit/ae1bac8629047385741f85620a725405a3c3fa27))
* **reflect:** add regex to mock decorator value options ([055dbd9](https://github.com/omermorad/mockingbird/commit/055dbd906f8e59a796f49842d9b3003b3a95c2cb))





## [3.0.1](https://github.com/omermorad/mockingbird/compare/@mockinbird/reflect@3.0.0...@mockinbird/reflect@3.0.1) (2021-08-21)


### Bug Fixes

* fix broken packages because of 'types' (instead common) ([#94](https://github.com/omermorad/mockingbird/issues/94)) ([fca274a](https://github.com/omermorad/mockingbird/commit/fca274aca495251b9b74a51f99f4e15c6fae5a4c))





# 3.0.0 (2021-08-21)


### Reverts

* Revert "chore(packages): version packages [skip ci]" ([5cbc7d6](https://github.com/omermorad/mockingbird/commit/5cbc7d67c5a62343c65fb1401e73df505cbadf52))



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





## [1.0.1-alpha.3](https://github.com/omermorad/mockingbird-ts/compare/@mockinbird/reflect@1.0.1-alpha.2...@mockinbird/reflect@1.0.1-alpha.3) (2021-07-23)

**Note:** Version bump only for package @mockinbird/reflect





## 1.0.1-alpha.2 (2021-07-23)


### Bug Fixes

* **types:** add build to export a js file to include the faker instance (for runtime) ([#61](https://github.com/omermorad/mockingbird-ts/issues/61)) ([f4e3092](https://github.com/omermorad/mockingbird-ts/commit/f4e3092e683eb9c288d4e879113e71f74ec5038a))


### Reverts

* **repo:** release packages ([7f9390d](https://github.com/omermorad/mockingbird-ts/commit/7f9390d051f9c9c9c3eb172f4db8a9fe533b03c4))
