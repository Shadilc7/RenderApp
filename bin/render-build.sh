#!/usr/bin/env bash
set -o errexit

bundle install
bundle exec rails assets:precompile
bundle exec rails assets:clean

# If you use Render free plan, run migrations during build:
# bundle exec rails db:migrate
