import fs from "node:fs";
import path from "node:path";
import { compile, evaluate } from "@mdx-js/mdx";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";

const __dirname = import.meta.dirname;
const filepath = path.join(__dirname, "../app/routes/blog.getting-started-with-javascript/route.mdx");

async function main() {
  const f = fs.readFileSync(filepath);

  const { value } = await compile(f, {
    jsx: true,
    remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
  });

  console.log(value);
}

main();
