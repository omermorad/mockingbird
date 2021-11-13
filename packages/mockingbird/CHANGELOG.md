# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [3.0.0-rc.0](https://github.com/omermorad/mockingbird/compare/mockingbird-ts@2.1.1...mockingbird-ts@3.0.0-rc.0) (2021-11-13)


### Code Refactoring

* **parser:** add mock generator and remove analyzer ([#107](https://github.com/omermorad/mockingbird/issues/107)) ([32c0ff6](https://github.com/omermorad/mockingbird/commit/32c0ff62895a18d9e892e1280572aea3ad500491))


### BREAKING CHANGES

* **parser:** ClassAnalayzer has been removed and all the logic has been moved to ClassParser

* test(parser): add (move) mock generator integration test

* chore(parser): config jest and typescript to run integration test

* fix(mockingbird-ts): use mock generator differently (singleton)

Remove mock generator from mockingbird-ts and import it from @mockinbird/parser instead
mock generator acts as a singleton now

* refactor(mockingbird-ts): fix mock factory

* chore(mockingbird-ts): config jest to collect coverage properly





## [2.1.1](https://github.com/omermorad/mockingbird/compare/mockingbird-ts@2.1.0...mockingbird-ts@2.1.1) (2021-08-21)


### Bug Fixes

* fix broken packages because of 'types' (instead common) ([#94](https://github.com/omermorad/mockingbird/issues/94)) ([fca274a](https://github.com/omermorad/mockingbird/commit/fca274aca495251b9b74a51f99f4e15c6fae5a4c))





# 2.1.0 (2021-08-21)


### Bug Fixes

* **mockingbird-ts:**  add some missing documentation to mock builder and factory ([#85](https://github.com/omermorad/mockingbird/issues/85)) ([45caa62](https://github.com/omermorad/mockingbird/commit/45caa62283c2fa43c36c0ad77d59629722610edf))
* **mockingbird-ts:** change ignore term to omit (deprecation) ([#86](https://github.com/omermorad/mockingbird/issues/86)) ([f3b3ab9](https://github.com/omermorad/mockingbird/commit/f3b3ab9c53baa3c9a114775f64961ddfa59124e6))
* **mockingbird-ts:** change types package into common ([a857a66](https://github.com/omermorad/mockingbird/commit/a857a66cd72e539c5fd3b183bd324d0ab10042a2))
* **mockingbird-ts:** fix plain functionality to work with primitives ([4fb5dcc](https://github.com/omermorad/mockingbird/commit/4fb5dccf9ba37363f201cf4525cd796269b5d004))


### Features

* **mockingbird-ts:** add pick funtionality to mock builder ([9b955f3](https://github.com/omermorad/mockingbird/commit/9b955f3b2327ba0d9eab7bbf17fad304dd00ed05))


### Reverts

* Revert "chore(packages): version packages [skip ci]" ([5cbc7d6](https://github.com/omermorad/mockingbird/commit/5cbc7d67c5a62343c65fb1401e73df505cbadf52))





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





# [2.0.0-alpha.2](https://github.com/omermorad/mockingbird-ts/compare/mockingbird-ts@2.0.0-alpha.1...mockingbird-ts@2.0.0-alpha.2) (2021-07-23)

**Note:** Version bump only for package mockingbird-ts





# [2.0.0-alpha.1](https://github.com/omermorad/mockingbird-ts/compare/mockingbird-ts@2.0.0...mockingbird-ts@2.0.0-alpha.1) (2021-07-23)


### Bug Fixes

* **types:** add build to export a js file to include the faker instance (for runtime) ([#61](https://github.com/omermorad/mockingbird-ts/issues/61)) ([f4e3092](https://github.com/omermorad/mockingbird-ts/commit/f4e3092e683eb9c288d4e879113e71f74ec5038a))


### Features

* **mockingbird-ts:** add mock factory fluent/builder api ([#60](https://github.com/omermorad/mockingbird-ts/issues/60)) ([cc5710d](https://github.com/omermorad/mockingbird-ts/commit/cc5710ded33401cae25782bb8e87efe1355024aa)), closes [#42](https://github.com/omermorad/mockingbird-ts/issues/42)


### Reverts

* **repo:** release packages ([7f9390d](https://github.com/omermorad/mockingbird-ts/commit/7f9390d051f9c9c9c3eb172f4db8a9fe533b03c4))


### BREAKING CHANGES

* **mockingbird-ts:** MockGenerator is not exported anymore, use MockFactory instead





# Change Log

# [2.0.0-alpha.0](https://github.com/omermorad/mockingbird-ts/compare/mockingbird-ts@2.0.0...mockingbird-ts@2.0.0-alpha.0) (2021-07-22)


### Features

* **mockingbird-ts:** add mock factory fluent/builder api ([#60](https://github.com/omermorad/mockingbird-ts/issues/60)) ([cc5710d](https://github.com/omermorad/mockingbird-ts/commit/cc5710ded33401cae25782bb8e87efe1355024aa)), closes [#42](https://github.com/omermorad/mockingbird-ts/issues/42)

### BREAKING CHANGES

* **mockingbird-ts:** `MockFactory` is no longer a class, but a function returning a builder API


# [1.1.0](https://github.com/omermorad/mockingbird-ts/compare/v1.0.0...v1.1.0) (2021-07-08)


### Features

* add new types and sample ([acc1776](https://github.com/omermorad/mockingbird-ts/commit/acc1776b50360fe745983b266b7e9a5da1ee9f4f))
* add typeorm sample, change types ([f801a59](https://github.com/omermorad/mockingbird-ts/commit/f801a59e0811e92f72a9c28069a809bfb9624564))

# [1.1.0-next.1](https://github.com/omermorad/mockingbird-ts/compare/v1.0.0...v1.1.0-next.1) (2021-02-10)


### Features

* add new types and sample ([acc1776](https://github.com/omermorad/mockingbird-ts/commit/acc1776b50360fe745983b266b7e9a5da1ee9f4f))

# 1.0.0 (2021-02-09)


### Bug Fixes

* **signatures:** remove redundant signature for Date type overload ([e4fbbc1](https://github.com/omermorad/mockingbird-ts/commit/e4fbbc18eb710bc181ef7a2d98490132cf4771df))


### Code Refactoring

* **types:** add some new types to be more accurate ([d4eba88](https://github.com/omermorad/mockingbird-ts/commit/d4eba8866b000f3507d3f1a2cf8881d3040972fc))


### Continuous Integration

* **release:** add beta as pre-release branch ([aed0c09](https://github.com/omermorad/mockingbird-ts/commit/aed0c0906f22096f7ecabe9b75aee04d410e5cef))


### Features

* **release:** release new beta version ([bda5aa7](https://github.com/omermorad/mockingbird-ts/commit/bda5aa74b957220e90605881556dacffc538a130))
* alpha release ([#12](https://github.com/omermorad/mockingbird-ts/issues/12)) ([5682bb4](https://github.com/omermorad/mockingbird-ts/commit/5682bb4c21df4d546166c613f8ed7fff937dc3dc))
* faker.ts initial ([#6](https://github.com/omermorad/mockingbird-ts/issues/6)) ([714fc05](https://github.com/omermorad/mockingbird-ts/commit/714fc05d1fdd93e1a709ebe183776dd28d0681bf)), closes [#4](https://github.com/omermorad/mockingbird-ts/issues/4) [#7](https://github.com/omermorad/mockingbird-ts/issues/7) [#8](https://github.com/omermorad/mockingbird-ts/issues/8)


### BREAKING CHANGES

* **types:** New MockedClass type
* **release:** Add 'tslib' as dependency

# 1.0.0-rc.1 (2021-02-05)


### Bug Fixes

* **signatures:** remove redundant signature for Date type overload ([e4fbbc1](https://github.com/omermorad/mockingbird-ts/commit/e4fbbc18eb710bc181ef7a2d98490132cf4771df))


### Continuous Integration

* **release:** add beta as pre-release branch ([aed0c09](https://github.com/omermorad/mockingbird-ts/commit/aed0c0906f22096f7ecabe9b75aee04d410e5cef))


### Features

* **release:** release new beta version ([bda5aa7](https://github.com/omermorad/mockingbird-ts/commit/bda5aa74b957220e90605881556dacffc538a130))
* alpha release ([#12](https://github.com/omermorad/mockingbird-ts/issues/12)) ([5682bb4](https://github.com/omermorad/mockingbird-ts/commit/5682bb4c21df4d546166c613f8ed7fff937dc3dc))
* faker.ts initial ([#6](https://github.com/omermorad/mockingbird-ts/issues/6)) ([714fc05](https://github.com/omermorad/mockingbird-ts/commit/714fc05d1fdd93e1a709ebe183776dd28d0681bf)), closes [#4](https://github.com/omermorad/mockingbird-ts/issues/4) [#7](https://github.com/omermorad/mockingbird-ts/issues/7) [#8](https://github.com/omermorad/mockingbird-ts/issues/8)


### BREAKING CHANGES

* **release:** Add 'tslib' as dependency

# 1.0.0-alpha.1 (2021-01-28)

### Features

* Mockingbird alpha release ([#11](https://github.com/omermorad/mockingbird-ts/issues/11)) ([67511b7](https://github.com/omermorad/faker.ts/commit/67511b7bc7792e06ac54c752b0ac96ee5337fd35)), closes [#4](https://github.com/omermorad/faker.ts/issues/4) [#7](https://github.com/omermorad/faker.ts/issues/7) [#8](https://github.com/omermorad/faker.ts/issues/8)
