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


        pageSize: 20,


        version: "3.1"
    };
})(window);


function callbackMessage(message) {
    console.log('callbackMessage :: ' + message)
    //alert(message);

}
