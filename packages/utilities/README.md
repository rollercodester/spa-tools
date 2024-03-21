<img alt="@spa-tools" height="150" src="../../apps/website/static/img/logo.svg?raw=true">
<div style='font-size: 2rem'>@spa-tools</div>

# Utilities

<!-- Auto-generated Badges Start -->
<span class="badge-npmversion"><a href="https://npmjs.org/package/@spa-tools/utilities" title="View this project on NPM"><img src="https://img.shields.io/npm/v/@spa-tools/utilities.svg" alt="NPM version" /></a></span>
<span class="badge-badge"><a href="https://github.com/rollercodester/spa-tools/actions/workflows/test-and-build-packages.yml" title="Test and Build"><img src="https://github.com/rollercodester/spa-tools/actions/workflows/test-and-build-packages.yml/badge.svg" alt="Test and Build" /></a></span>
<span class="badge-badge"><img src="./coverage-badge.svg" alt="Code Coverage" /></span>
<!-- Auto-generated Badges End -->

The `@spa-tools/utilities` package contains a specialized utilities, succinctly written in TypeScript with a focus on being requirements-driven.

Feature highlights include:

- Time-saving functionality
- Production-tested
- TypeScript First
- Zero Dependencies
- Tree-shakable

Categories of utilities included in this package:

- Colors
- Conditionals
- Data
- Dates
- DOM
- Errors
- Execution Control
- Numbers
- Strings
- Type Helpers
- URLs

## Installation

`npm install @spa-tools/interaction-hooks`

## Usage

#### Checkout the [@spa-tools documentation site](https://rollercodester.github.io/spa-tools/) for a complete list of features, usage scenarios, guidance, and reference.

## Docsite

View the [@spa-tools documentation site](https://rollercodester.github.io/spa-tools/) for complete reference.

## Motivation

All real-world SPAs have to deal with configuration, typcially having to manage settings that vary across mutliple environments. The defacto approach to solve this problem has been to use multiple .env files using a package such as _dotenv_, which in its own right is a fantastically proven package.

And while it's true that the static dotenv flow has been standardized for quite some time now, it typically involves maintaining build scripts in lockstep with devops pipelines to ensure that pseudo environment-variables are available to your SPA across respective environments. Let's be honest, this can become a bit of a headache and arguably, pseudo-env-vars can feel yucky in frontend code.

As such, I started using the runtime-config pattern in SPAs a few years back and have not looked back, since.


## Contributing

If you're interested in contributing to @spa-tools, please first create an issue on the [@spa-tools monorepo in GitHub](https://github.com/rollercodester/spa-tools)
or comment on an already open issue. From there we can discuss the feature or bugfix you're interested in and how best to approach it.
In terms of workflow, we use the standard approach of forking the repo, creating a PR, and merging after tesing/approval.

### Unit Test Coverage

All packages in @spa-tools require 100% unit test coverage. This is a condition for all PRs to be merged whether you're adding a new feature or fixing a bug.

The only exception is when native code is being wrapped and coverage is either not possible or redundant, which can be discussed on a case-by-case basis
during the approval process.

## License

All packages in @spa-tools are licensed under the [MIT](https://en.wikipedia.org/wiki/MIT_License) license. Copyright © 2024, Ryan Howard (rollercodester). All rights reserved.
