import * as fs from 'fs';
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import generate from '@babel/generator';
import * as t from '@babel/types';

const code = `
import lodash from 'lodash'
let code = 'a'
`
// 第一步：将源代码转换成AST
try {
  ast = parse(code, {
    sourceType: 'module',
    errorRecovery: true,
    plugins: [
      'jsx',
      'typescript',
    ]
  });
} catch (error) {
  return error;
}

// 第二步：对AST进行增删改查
traverse(ast, {
  JSXAttribute(path) {
    //...
  },
});

// 第三步：将修改后的AST转化成新代码
const { code: newCode } = generate(ast);
console.log(newCode)