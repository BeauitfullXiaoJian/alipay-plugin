# ALIPAY-PLUGIN

### 说明
* 支付订单数据由后台统一生成
* ios appScheme 默认为'alipayplugin'
* example项目为cordova测试项目,当前插件在cordova-android ~7.0.0,cordova-ios~4.5.5测试成功
* 当前可用版本0.0.5（除此处列出的版本，其它任何版本都不可用！！！）

### 安装
* 默认安装 `cordova plugin add alipay-plugin`
* 指定版本安装 `cordova plugin add alipay-plugin@0.0.4`


### 参考代码
```js
window['AlipayPlugin'] && window['AlipayPlugin'].call(
    // 调用的方法名称
    'pay',
    // 支付订单数据
    ['app_id=2017091208684867&biz_content=%7B%22timeout_express%22%3A%2230m%22%2C%22product_code%22%3A%22QUICK_MSECURITY_PAY%22%2C%22total_amount%22%3A%220.01%22%2C%22subject%22%3A%22%E6%B5%8B%E8%AF%95%E9%85%8D%E7%BD%AE%22%2C%22body%22%3A%22%E6%B5%8B%E8%AF%95%E9%85%8D%E7%BD%AE%E5%86%85%E5%AE%B9%E6%98%AF%E5%90%A6%E6%AD%A3%E7%A1%AE%22%2C%22out_trade_no%22%3A%22ceshi1555060686%22%7D&charset=utf-8&method=alipay.trade.app.pay&notify_url=https%3A%2F%2Fcloud.anasit.cn%2Fnotify%2Furl1&sign_type=RSA2&timestamp=2019-04-12+17%3A18%3A07&version=1.0&sign=l%2FVTrEKiO0ynSXXghrOznQehST8C2s7PVgYyNWhwXX%2Fr%2Fb5%2F1bUEjw%2FqAnDGyUCddfWN3KWfB%2FtfvhtEoKaMqIj8PIYkfEO%2BAQd61g%2B%2FBFScDH2boN9SbGU1MZpV0PqEYVwywG0JDatosoEYo8fF1o8kVOW%2FelVy%2BSOr3CCAS1DyZ%2Bc2MI33JCI8nLMRPkC7CUEDJGBCJHYaXvOrLtEaHJsrgNqVVFp66lcpINlwg4UB8veDK5%2BV%2BSBK3g9SBMi%2FkDLqXSWLhVoUSFdTVR1ZeLSeGLYVnYZFE2fYL86D1qm2HSJtTZnfpxRwvB0SJDeQuxdLeF%2B7SocTZVO2Q3QSzw%3D%3D'],
    // 消息通知回调方法
    (result) => {
        // 打印通知参数
        // {
        //     resultStatus:'9000' // 状态码是'9000'代表成功了，其它都是失败
        //     memo:'提示内容',    
        //     result:'本次操作返回的结果数据,支付成功后，这个参数是作为同步验证的参数（类似同步回调参数）'  
        // }
        alert(JSON.stringify(result));
        if (result.resultStatus === '9000') {
            alert('支付成功');
            // 调用http接口查询订单是否真的好了。。
            // this.request(...).subscrible(...如果成功了，那么跳到支付成功页面，否则跳到支付遇到问题页面)
        } else {
            alert('支付异常:' + result.memo);
        }
    }
);
```