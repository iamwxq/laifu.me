### Features

- [ ] 关于页
- [ ] 归档页
- [ ] 响应式布局
- [x] 脚本更新文件
  - ~~根据文件 hash 来更新文件元数据数据库~~
  - ~~修改 Schema 以支持帖文删除功能~~
  - ~~添加删除贴文和恢复贴文脚本~~
- [ ] 优化更多 mdx 渲染后的标签样式
  - ~~p~~
  - ~~h1, h2, h3, h4, h5, h6~~
  - ~~blockquote~~
  - ~~pre, code~~
  - ~~ul, ol, li~~
- [ ] 更多的 mdx 自定义组件
  - ~~链接~~
  - ~~插图~~
  - 表格
  - 注脚
- [x] 为项目添加工程化工具
  - ~~husky~~
  - ~~lint-staged~~

### Bugs

- [x] 主题切换按钮渲染错误
  - 没有缓存的情况下，hydration 时会存在两端不一致性问题
    - 对于 SSR，`theme` 为 `null`
    - 对于 CSR，`theme` 为系统默认主题色 `window.matchMedia("(prefers-color-scheme: dark)")`
  - 删除了条件渲染的代码，转而使用 TailwindCSS 中的 `dark:` 媒体查询作为条件渲染的替代
