## [2.1.2](https://github.com/omermorad/mockingbird/compare/mockingbird@2.1.2...mockingbird@2.1.2) (2021-11-17)


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



## 2.1.1 (2021-08-21)


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



