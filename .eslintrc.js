module.exports = {
  root: true,
  env: {
    node: true,
  },
  // 声明全局变量 防止在单文件组件内无法找到
  globals: {
    "Recordable": true,
    "EventListener": true
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-essential",
    "plugin:@typescript-eslint/recommended",
  ],
  overrides: [],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["vue", "@typescript-eslint"],
  rules: {
    // 使用 2 个空格缩进
    "indent": ["error", 2],
    // 忽略文件名多个字符串
    "vue/multi-word-component-names": "off",
  },
};
