//
//  RequestCustProfile.h
//  FungusFramework
//
//  Created by Pluem Limrattanakan on 4/22/56 BE.
//  Copyright (c) 2556 AIS. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "CustProfileData.h"
#import "ResponseStatus.h"
#import "RequestService.h"

@protocol RequestCustProfileDelegate <NSObject>

- (void)callbackRequestCustProfileSuccessed:(CustProfileData *)response;
- (void)callbackRequestCustProfileError:(ResponseStatus *)status;

@end

@interface RequestCustProfile : RequestService
{
    id<RequestCustProfileDelegate> delegate;
    CustProfileData *cusProfileData;
}
@property (nonatomic, strong) id<RequestCustProfileDelegate> delegate;
@property (nonatomic, retain) NSString *MSISDN;

- (void)fungusRequest;
@end
