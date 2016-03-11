(function (global) {
    app = global.app = global.app || {};

    app.configService = {

        //defaultImage_url: 'https://dev-cpe.ais.co.th/coa/usr/user_image/', //@AIS
        //imageUrl: 'https://dev-cpe.ais.co.th/coa', //@AIS
        //serviceUrl: 'https://dev-cpe.ais.co.th/coa/', //@AIS
        //fileServiceUrl: 'https://cpe.ais.co.th/coa/', //@AIS

        //defaultImage_url: 'https://test-cpe.ais.co.th/coa/usr/', //@AIS
        //imageUrl: 'https://test-cpe.ais.co.th/coa', //@AIS
        //serviceUrl: 'https://test-cpe.ais.co.th/coa/', //@AIS
        //fileServiceUrl: 'https://test-cpe.ais.co.th/coa/', //@AIS
        //authenUrl: 'http://test-cpe.ais.co.th/coa/', //@AIS

        defaultImage_url: 'https://staging-cpe.ais.co.th/coa/usr/', //@AIS
        imageUrl: 'https://staging-cpe.ais.co.th/coa', //@AIS
        serviceUrl: 'https://staging-cpe.ais.co.th/coa/', //@AIS
        fileServiceUrl: 'https://staging-cpe.ais.co.th/coa/', //@AIS
        authenUrl: 'http://staging-cpe.ais.co.th/coa/', //@AIS


        //defaultImage_url: 'https://cpe.ais.co.th/coa/usr/user_image/', //@AIS
        //imageUrl: 'https://cpe.ais.co.th/coa', //@AIS
        //serviceUrl: 'https://cpe.ais.co.th/coa/', //@AIS
        //fileServiceUrl: 'https://cpe.ais.co.th/coa/', //@AIS
        //authenUrl: 'http://cpe.ais.co.th/coa/', //@AIS



        //fingerprint: 'E5 32 A9 68 C6 E2 51 54 3B 6A E9 5D 1C 34 22 8D 51 DD 56 B3',//dev
        //fingerprint: 'E5 32 A9 68 C6 E2 51 54 3B 6A E9 5D 1C 34 22 8D 51 DD 56 B3', //test
        fingerprint: 'E5 32 A9 68 C6 E2 51 54 3B 6A E9 5D 1C 34 22 8D 51 DD 56 B3', //staging
        //fingerprint: '4c e9 58 42 0f 63 c7 e0 b1 ed 8d 50 f3 c9 c0 aa d6 14 08 b4', //production

        pageSize: 20,


        version: "3.1"
    };
})(window);


function callbackMessage(message) {
    console.log('callbackMessage :: ' + message)
    //alert(message);

}
