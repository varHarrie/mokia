# 命令行交互程序

使用命令行交互程序，我们可以完全忽略服务端启动的相关逻辑，只需编写配置文件，就可以快速地创建模拟服务端程序。

具体用法：

```bash
mokia <entry-file> [options]
```

- `entry-file`：配置入口文件，支持`.js`、`.ts`。
- `options`：[可选项](#可选项)。

可以通过以下命令查阅帮助：

```bash
npx mokia --help
```

## 可选项

### --help

打印帮助信息。

### --version

打印版本号。

### --watch, -w

监听模式，文件变动后会自动重启服务器。

### --debug

调试模式，打印详细调试信息。

### --host, -h

同[服务器配置](/mokia/guide/config.html#host)。

### --port, -p

同[服务器配置](/mokia/guide/config.html#port)。

### --prefix

同[服务器配置](/mokia/guide/config.html#prefix)。

### --proxy

同[服务器配置](/mokia/guide/config.html#proxy)。

### --silent, -s

同[服务器配置](/mokia/guide/config.html#silent)。
