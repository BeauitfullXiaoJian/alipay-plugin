//
//  AlipayPlugin.m
//
//  Created by anasit on 2018/5/12.
//  Copyright © 2018年 anasit. All rights reserved.
//

#import "AlipayPlugin.h"

@interface AlipayPlugin ()

@end

@implementation AlipayPlugin

- (void)pay:(CDVInvokedUrlCommand *)command{
    NSString* orderData = [command.arguments objectAtIndex:0];
    NSString *appScheme = @"alipayplugin";
    // NOTE: 调用支付结果开始支付
    [[AlipaySDK defaultService] payOrder:orderData fromScheme:appScheme callback:^(NSDictionary *resultDic) {
        NSLog(@"reslut = %@",resultDic);
    }];
}


@end
