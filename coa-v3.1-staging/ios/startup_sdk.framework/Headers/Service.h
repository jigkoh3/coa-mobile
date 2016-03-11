//
//  Service.h
//  FungusFramework
//
//  Created by Pluem Limrattanakan on 9/4/56 BE.
//  Copyright (c) 2556 AIS. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "ConnectionProcess.h"
#import "ResponseStatus.h"

@interface Service : NSObject <ConnectProcessDelegate>
{
    ConnectionProcess *connection;
    
}

@property (nonatomic, strong)NSString *orderRef;
@property (nonatomic, strong)NSString *orderID;

- (void)callbackRespond:(NSDictionary *)response;

@end
