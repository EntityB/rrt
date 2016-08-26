var fs = require("fs");
var soap = require('soap-eet');


// var url = 'https://pg.eet.cz/eet/services/EETServiceSOAP/v3';
var url = 'http://www.etrzby.cz/assets/cs/prilohy/EETServiceSOAP.wsdl';
var location = "https://pg.eet.cz:443/eet/services/EETServiceSOAP/v3"
var priKeyFile = "./data-test/private.key";
var pubKeyFile = "./data-test/public.key";
var password = 'eet'; // optional password 


var privateKey = fs.readFileSync(priKeyFile);
var publicKey = fs.readFileSync(pubKeyFile);


// <Hlavicka dat_odesl="2016-09-19T19:06:37+02:00" prvni_zaslani="false" uuid_zpravy="f5ce1350-e688-4247-b1af-3d2bc592b83c"/>
// <Data celk_trzba="34113.00" cerp_zuct="679.00" cest_sluz="5460.00" dan1="-172.39" dan2="-530.73" dan3="975.65" dat_trzby="2016-08-05T00:30:12+02:00" dic_popl="CZ1212121218" id_pokl="/5546/RO24" id_provoz="273" porad_cis="0/6460/ZQ42" pouzit_zboz1="784.00" pouzit_zboz2="967.00" pouzit_zboz3="189.00" rezim="0" urceno_cerp_zuct="324.00" zakl_dan1="-820.92" zakl_dan2="-3538.20" zakl_dan3="9756.46" zakl_nepodl_dph="3036.00"/>
// <KontrolniKody>
// <pkp cipher="RSA2048" digest="SHA256" encoding="base64">
// D84gY6RlfUi8dWdhL1zn0LE0s+aqLohtIxY0y88GoG5Ak8pBEH3/Ff2aFW7H6fvRxDMKsvM/VIYtUQxoDEctVGMSU/JDf9Vd0eQwgfLm683p316Sa4BUnVrIsHzwMyYkjpn66I072G2AvOUP4X5UiIYtHTwyMVyp+N/zzay3D7Q619ylDb6puN2iIlLsu+GNSB9DvsQbiLXPH6iK0R9FpR15v2y+0Uhh8NNJKl7O8Us9jbgokrA9gze+erQbhmwTm2nn2+7JGrPDqhyhwWZNLUziGSbC99wJpkEnIs0das/4hFNE3DnLvv4MsXwWCLOUZty6t6DAijlCzQj7KFKw0g==
// </pkp>
// <bkp digest="SHA1" encoding="base16">8F8ABFEB-B76E7064-343A1460-6C6E6D86-B0F99C24</bkp>
// </KontrolniKody>

var args = {
    "Hlavicka": {
        attributes: {
            dat_odesl: "2016-09-19T19:06:37+02:00",
            prvni_zaslani: "false",
            uuid_zpravy: "f5ce1350-e688-4247-b1af-3d2bc592b83c"
        }
    },
    "Data": {
        attributes: {
            celk_trzba: "3411300.00",
            cerp_zuct: "679.00",
            cest_sluz: "5460.00",
            dan1: "-172.39",
            dan2: "-530.73",
            dan3: "975.65",
            dat_trzby: "2016-08-05T00:30:12+02:00",
            dic_popl: "CZ1212121218",
            id_pokl: "/5546/RO24",
            id_provoz: "273",
            porad_cis: "0/6460/ZQ42",
            pouzit_zboz1: "784.00",
            pouzit_zboz2: "967.00",
            pouzit_zboz3: "189.00",
            rezim: "0",
            urceno_cerp_zuct: "324.00",
            zakl_dan1: "-820.92",
            zakl_dan2: "-3538.20",
            zakl_dan3: "9756.46",
            zakl_nepodl_dph: "3036.00"
        }
    },
    "KontrolniKody": {
        "pkp": {
            attributes: {
                cipher: "RSA2048",
                digest: "SHA256",
                encoding: "base64"
            },
            $value: "D84gY6RlfUi8dWdhL1zn0LE0s+aqLohtIxY0y88GoG5Ak8pBEH3/Ff2aFW7H6fvRxDMKsvM/VIYtUQxoDEctVGMSU/JDf9Vd0eQwgfLm683p316Sa4BUnVrIsHzwMyYkjpn66I072G2AvOUP4X5UiIYtHTwyMVyp+N/zzay3D7Q619ylDb6puN2iIlLsu+GNSB9DvsQbiLXPH6iK0R9FpR15v2y+0Uhh8NNJKl7O8Us9jbgokrA9gze+erQbhmwTm2nn2+7JGrPDqhyhwWZNLUziGSbC99wJpkEnIs0das/4hFNE3DnLvv4MsXwWCLOUZty6t6DAijlCzQj7KFKw0g=="
        },
        "bkp": {
            attributes: {
                digest: "SHA1",
                encoding: "base16"
            },
            $value: "8F8ABFEB-B76E7064-343A1460-6C6E6D86-B0F99C24"
        }
    }
};

soap.createClient(url, function (err, client) {
    var wsSecurity = new soap.WSSecurityCertEET(privateKey, publicKey, password, 'utf8');
    client.setSecurity(wsSecurity);

    client.addBodyAttribute('xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd"');
    client.EETService.EETServiceSOAP.OdeslaniTrzby(args, function (err, result, raw, soapHeader) {
        console.log(result);
    });
});
