# EAN-13 条形码生成器（中文说明）

一个简单易用的网页应用，用于生成 EAN-13 条形码。

## 使用方法

### 方法一：直接打开

1. 在项目文件夹中双击打开 `index.html`。
2. 应用会在默认浏览器中打开。

### 方法二：使用本地服务器（推荐）

如果直接打开遇到资源加载问题（例如 CDN），建议使用本地服务器：

#### Windows（批处理）

1. 双击 `start-server.bat` 启动服务器。
2. 在浏览器中访问 `http://localhost:8000`。

#### PowerShell

1. 右键 `start-server.ps1`，选择使用 PowerShell 运行。
2. 打开 `http://localhost:8000`。

### 方法三：Python 简易服务器

如果安装了 Python：

```bash
python -m http.server 8000
```

然后打开 `http://localhost:8000`。

## 使用说明

1. 输入 3 位前缀（例如：`690`）。
2. 点击“Generate”按钮。
3. 查看生成的 13 位 EAN 编码和条形码图片。

## 功能特点

- 自动生成产品代码
- 自动计算校验位
- 导出条形码图片（PNG）
- 简洁现代的界面
- 响应式布局

## 文件说明

- `index.html` — 主页面
- `app.js` — 程序逻辑
- `style.css` — 样式文件
- `start-server.bat` — Windows 启动脚本
- `start-server.ps1` — PowerShell 启动脚本

## 注意事项

- 本项目通过 CDN 加载 JsBarcode 等库。若需离线使用，请将这些库置于本地并修改引用路径。
- 如果直接打开 `index.html` 出现问题，请使用本地服务器启动方式。
