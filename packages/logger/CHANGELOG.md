# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-rc.0 (2021-12-13)


### chore

* release packages ([#114](https://github.com/omermorad/mockingbird/issues/114)) ([c6f521f](https://github.com/omermorad/mockingbird/commit/c6f521f42dbb12c9e3a4e0441484ce5aa6a4c4e6)), closes [#96](https://github.com/omermorad/mockingbird/issues/96) [#98](https://github.com/omermorad/mockingbird/issues/98) [#104](https://github.com/omermorad/mockingbird/issues/104) [#105](https://github.com/omermorad/mockingbird/issues/105) [#106](https://github.com/omermorad/mockingbird/issues/106) [#107](https://github.com/omermorad/mockingbird/issues/107) [#110](https://github.com/omermorad/mockingbird/issues/110) [#111](https://github.com/omermorad/mockingbird/issues/111) [#116](https://github.com/omermorad/mockingbird/issues/116) [#117](https://github.com/omermorad/mockingbird/issues/117) [#118](https://github.com/omermorad/mockingbird/issues/118) [#119](https://github.com/omermorad/mockingbird/issues/119) [#2](https://github.com/omermorad/mockingbird/issues/2)


### BREAKING CHANGES

* ClassAnalayzer has been removed and all the logic has been moved to ClassParser

* test(parser): add (move) mock generator integration test

* chore(parser): config jest and typescript to run integration test

* fix(mockingbird-ts): use mock generator differently (singleton)

Remove mock generator from mockingbird-ts and import it from @mockinbird/parser instead
mock generator acts as a singleton now

* refactor(mockingbird-ts): fix mock factory

* chore(mockingbird-ts): config jest to collect coverage properly

* revert: revert commit 3bcde461 fixtures package





## [0.0.1](https://github.com/omermorad/mockingbird/compare/@mockingbird/logger@0.0.1-rc.1...@mockingbird/logger@0.0.1) (2021-12-08)

**Note:** Version bump only for package @mockingbird/logger





## 0.0.1-rc.1 (2021-11-17)


### Features

* **logger:** add initial working module ([#104](https://github.com/omermorad/mockingbird/issues/104)) ([6b6e69d](https://github.com/omermorad/mockingbird/commit/6b6e69d9169268d6d2468b4871dbefcc158d0539))





## 0.0.1-rc.0 (2021-11-13)

**Note:** Version bump only for package @mockingbird/logger
