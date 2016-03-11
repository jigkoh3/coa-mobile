//
//  ResponseStatus.h
//  FungusFramework
//
//  Created by Vasin Charoensuk on 1/18/56 BE.
//  Copyright (c) 2556 AIS. All rights reserved.
//

#import <Foundation/Foundation.h>
@interface ResponseStatus : NSObject
{
    int statusCode;
    NSString *_description;
    NSString *orderRef;
}

-(void)initialWithResponse:(NSDictionary *)response orderRef:(NSString *)orderRef;
-(void)initial:(NSDictionary *)response;
-(void)setStatusCode:(int)code;
-(void)setDescription:(NSString *)description;

-(int)getStatusCode;
-(NSString *)getDescription;

-(BOOL)isResponseSuccess;

@end
