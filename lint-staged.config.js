export default {
  "*.mdx": "pnpm run db:update",
  "*.{js,jsx,ts,tsx,md}": "eslint --fix",
};
