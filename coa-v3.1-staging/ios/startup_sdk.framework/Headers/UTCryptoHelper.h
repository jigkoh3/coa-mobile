//
//  UTCryptoHelper.h
//  Cocoa Mofidied
//
//  Created by Cocoa Mofidied Corp. on 4/29/09.
//  Copyright 2009 Cocoa Mofidied Corp. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <CommonCrypto/CommonCryptor.h>
#import <CommonCrypto/CommonDigest.h>
#import <Security/Security.h>

@interface UTCryptoHelper : NSObject
{
}

// 1. encrypt or decrypt the data
+ (NSData *)encrypt:(NSData *)data key:(NSData *)symmetricKey padding:(CCOptions *)pkcs7;
+ (NSData *)decrypt:(NSData *)cipher key:(NSData *)symmetricKey padding:(CCOptions *)pkcs7;

// 2. encode or decode the data from/to base64, this allow smoother transfer between network
+ (NSString *)base64EncodeData:(NSData *)data;
+ (NSData *)base64DecodeString:(NSString *)string;
+ (NSData *)dataWithNullTerminated:(NSData *)data;

// 2.5 one-stop for decoding result
+ (NSData *)fullEncrypt:(NSData *)data key:(NSData *)symmetricKey padding:(CCOptions *)pkcs7;
+ (NSData *)fullDecrypt:(NSData *)base64cipher key:(NSData *)symmetricKey padding:(CCOptions *)pkcs7;

// x. low level cipher command, may not needed
+ (NSData *)doCipher:(NSData *)data key:(NSData *)symmetricKey context:(CCOperation)encryptOrDecrypt padding:(CCOptions *)pkcs7;
+ (NSData *)doCipher:(NSData *)data key:(NSData *)symmetricKey iv:(NSData *)initialVector context:(CCOperation)encryptOrDecrypt padding:(CCOptions *)pkcs7;

// xx. test this library
+ (void)testSymmetricEncryption;

@end
