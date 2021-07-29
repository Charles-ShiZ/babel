const result = 1 + 2 + 3 + 4 + 5;
↓
const result = 15;

Babel原理：

Babel将代码转化为AST(抽象语法树)，插件修改AST，AST再转化为代码
source code → AST → target code
               ↑
              插件