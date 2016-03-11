//
//  CustProfileData.h
//  FungusFramework
//
//  Created by Pluem Limrattanakan on 4/22/56 BE.
//  Copyright (c) 2556 AIS. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface CustProfileData : NSObject
{
    NSString *brandID;
    NSString *language;
}
@property(nonatomic, retain) NSString *brandID;
@property(nonatomic, retain) NSString *language;

@end
