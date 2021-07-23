# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

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
