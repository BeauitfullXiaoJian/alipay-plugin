//
//  AlipayPlugin.m
//
//  Created by anasit on 2018/5/12.
//  Copyright © 2018年 anasit. All rights reserved.
//

#import "AlipayPlugin.h"

@interface AlipayPlugin ()
@property(nonatomic,strong) NSString *appScheme;
@property(nonatomic,strong) NSString *callbackId;
@end

@implementation AlipayPlugin

- (void)pay:(CDVInvokedUrlCommand *)command{
    _appScheme = @"alipayplugin";
    _callbackId = command.callbackId;
    NSString* orderData = [command.arguments objectAtIndex:0];
    // NOTE: 调用支付结果开始支付
    [[AlipaySDK defaultService] payOrder:orderData fromScheme:_appScheme callback:^(NSDictionary *resultDic) {
        NSLog(@"reslut = %@",resultDic);
        CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:resultDic];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
}

-(void) handleOpenURL:(NSNotification *)notification{
    NSURL* url = [notification object];
    if ([url.scheme isEqualToString:_appScheme]){
        [[AlipaySDK defaultService] processOrderWithPaymentResult:url standbyCallback:^(NSDictionary *resultDic) {
            NSLog(@"reslut = %@",resultDic);
            CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:resultDic];
            [self.commandDelegate sendPluginResult:pluginResult callbackId:_callbackId];
        }];
    }
}

@end