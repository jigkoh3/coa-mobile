//
//  PrivilegeData.h
//  FungusFramework
//
//  Created by Vasin Charoensuk on 1/10/56 BE.
//  Copyright (c) 2556 AIS. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface PrivilegeData : NSObject
{
    NSString *privilegeId;
    NSString *privilegeName;
    NSString *privilegeDescription;
    NSString *privilegeCategory;
    NSString *privilegeCode;
    NSString *privilegePhoto;
}

-(NSString *)getPrivilegeId;
-(NSString *)getPrivilegeName;
-(NSString *)getPrivilegeDescription;
-(NSString *)getPrivilegeCategory;
-(NSString *)getPrivilegeCode;
-(NSString *)getPrivilegePhoto;

-(void) setPrivilegeData:(NSDictionary *)response;

@end
