#!/usr/bin/env bash

git diff --name-only HEAD | grep ".*\.js" | xargs prettier --write

