<img alt="@spa-tools" height="150" src="./website/static/img/logo.svg?raw=true">

# @spa-tools


## Introduction

_@spa-tools_ is a collection of packages aimed at helping engineers to _better-build_ Single-Page Applications.
It came about from years of shipping real-world, business-focused SPAs and taking a handful of the resulting wants+learnings
and distilling them into a set of packages that can be used in any modern Web project.

### Motivation

Aside from the earnest intent of giving back to the community, the other is to offer frontend developers simple and efficient alternatives to other webapp tools.

## Docsite

View the [@spa-tools documentation site](https://rollercodester.github.io/spa-tools/) for complete reference.

## Contributing

If you're interested in contributing to @spa-tools, please search and see if there's already an  [existing issue for the feature/bug](https://github.com/rollercodester/spa-tools/issues).

If you find an existing issue for what you'd like contribute, please addd acomment on the respective issue. If you can't find an existing issue or you'e short on time, please go ahead and
[create a new issue](https://github.com/rollercodester/spa-tools/issues/new/choose).

From there we can discuss the feature or bugfix you're interested in and how best to approach it.
In terms of workflow, we use the standard approach of forking the repo, creating a PR, and merging after tesing/approval. If you have questions regarding contributing in general, please take a gander at the [Contributions Board](https://github.com/rollercodester/spa-tools/discussions/categories/contributing).

### Unit Test Coverage

All packages in @spa-tools require 100% unit test coverage. This is a condition for all PRs to be merged whether you're adding a new feature or fixing a bug.

The only exception is when native code is being wrapped and coverage is either not possible or redundant, which can be discussed on a case-by-case basis
during the approval process.

#### To run CI/CD tests for all packages

```bash
pnpm test:cicd
```

#### To run CI/CD tests for a single package

```bash
pnpm test:cicd --filter=api-client
```

#### To run DEV tests locally in watch mode with test UI

```bash
pnpm test:dev
```

#### To run DEV tests locally for a single package

```bash
pnpm test:dev --filter=api-client
```

## Bugs

Found a bug? We'd super appreciate you reporting it by [creating a new bug report](https://github.com/rollercodester/spa-tools/issues/new?assignees=&labels=&projects=&template=bug_report.md&title=).

## Feature/Package Ideas

Do you have ideas for tools/features to add but don't have time to contribute? No worries, we still want to capture your idea for discussion: please create a post under the [Ideas Board](https://github.com/rollercodester/spa-tools/discussions/categories/ideas).

## Got Questions?

Post your question on the [Q/A Board](https://github.com/rollercodester/spa-tools/discussions/categories/q-a).

## License

All packages in @spa-tools are licensed under the [MIT](https://en.wikipedia.org/wiki/MIT_License) license. Copyright © 2024, Ryan Howard (rollercodester). All rights reserved.
