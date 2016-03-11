//
//  ServiceDirectCharging.h
//  FungusFramework
//
//  Created by Pluem Limrattanakan on 7/23/56 BE.
//  Copyright (c) 2556 AIS. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "ResponseStatus.h"
#import "RequestService.h"
#import "DirectChargingResponseData.h"

@protocol ServiceDirectChargingDelegate <NSObject>

- (void)serviceDirectChargingSuccess:(DirectChargingResponseData *)response;
- (void)serviceDirectChargingError:(ResponseStatus *)status;

@end

@interface ServiceDirectCharging : RequestService

@property (assign)id<ServiceDirectChargingDelegate> delegate;

- (id)initWithVolume:(NSString *)volume
                 CCT:(NSString *)CCT;

- (void)fungusRequest;

@end


