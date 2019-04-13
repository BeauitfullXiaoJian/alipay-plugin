/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
function pay() {
    window['AlipayPlugin'] && window['AlipayPlugin'].call(
        // 调用的方法名称
        'pay',
        // 支付订单数据
        ['app_id=2017091208684867&biz_content=%7B%22timeout_express%22%3A%2230m%22%2C%22product_code%22%3A%22QUICK_MSECURITY_PAY%22%2C%22total_amount%22%3A%220.01%22%2C%22subject%22%3A%22%E6%B5%8B%E8%AF%95%E9%85%8D%E7%BD%AE%22%2C%22body%22%3A%22%E6%B5%8B%E8%AF%95%E9%85%8D%E7%BD%AE%E5%86%85%E5%AE%B9%E6%98%AF%E5%90%A6%E6%AD%A3%E7%A1%AE%22%2C%22out_trade_no%22%3A%22ceshi1555120316%22%7D&charset=utf-8&method=alipay.trade.app.pay&notify_url=https%3A%2F%2Fcloud.anasit.cn%2Fnotify%2Furl1&sign_type=RSA2&timestamp=2019-04-13+09%3A51%3A57&version=1.0&sign=YOROTmzWPdSdoL8OaVcQXbmUwYFg3c3%2FiF9KLESedrZinFVyrbOnTLM3OkExfKV4gt6mxnAHJdAHA5R3pdXmqbFTnD%2FRk19rOttF71o8ZbBp5fJMWTujpgUz5x6Y4B73BSVUAtuRr%2BqKbMbId2kofHxyH8fwCR12OT%2Bgg7OHTDKkQ0D93Q%2BREabBHEjYTfu0sFPLID6RiR0lgjH%2BGFjG0SYPzz4RIFKhKk96OiRYFKEbQYtRomIf8jSwnjhOkqy7cFu2aaMVX7VjBTTVP9h3jmh1coRtJS5DZp2MvRRJDni1oIFuwkZYsB8yqpCCtfNLVoc0KMSWs1fEMcLU3%2FB0uQ%3D%3D'],
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
}