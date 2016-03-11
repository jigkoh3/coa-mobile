//
//  ServiceGetMSISDN.h
//  FungusFramework
//
//  Created by Pluem Limrattanakan on 5/3/56 BE.
//  Copyright (c) 2556 AIS. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RequestService.h"


@protocol ServiceGetMSISDNDelegate <NSObject>

- (void)callbackServiceGetMSISDNSuccessed:(NSString *)MSISDN;
- (void)callbackServiceGetMSISDNError:(ResponseStatus *)status;

@end

@interface ServiceGetMSISDN : RequestService


@property (nonatomic, strong)id<ServiceGetMSISDNDelegate> delegate;

- (void)fungusRequest;
@end
