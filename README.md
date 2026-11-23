# Sauce Demo – Playwright E2E & API Tests

End-to-end and API test suite written in Playwright with TypeScript.

## What's covered
- Login: valid user, locked-out user, wrong password
- Cart and full checkout flow, plus form validation
- API tests: GET, POST and 404 handling (JSONPlaceholder)

## How to run
npm install
npx playwright install
npx playwright test

## CI
Tests run on every push with GitHub Actions; reports and traces are saved as artifacts.
