//
//  PrivilegeResponseData.h
//  FungusFramework
//
//  Created by Vasin Charoensuk on 1/10/56 BE.
//  Copyright (c) 2556 AIS. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface PrivilegeResponseData : NSObject
{
    int pageRequest;
    int resultPerPage;
    int totalResultReturned;
    int totalResultAvailable;
    NSMutableArray *poiList;
}

-(int) getPageRequest;
-(int) getResultPerPage;
-(int) getTotalResultReturned;
-(int) getTotalResultAvailable;
-(NSMutableArray *) getPoiItems;

-(void) setResponseData:(NSDictionary *) response;

@end
