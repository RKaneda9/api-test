let https = require('https'),
    http  = require('http');

function request(props) {
    return new Promise((resolve, reject) => {

        var options = {
            host: 'localhost',
            port: 3700,
            path: '/api/users/590b7024ba2d512bc1b0e850',
            method: "PUT",
            "headers": { 
                "Content-Type" : "application/json",
            }
        };

        var body = {
            "_id": "5908e4abcce0b1416dfcd0c6",
            "email": "raidenkaneda@gmail.com",
            "userName": "rkaneda",
            "firstName": "raiden",
            "lastName": "kaneda",
            "alternateEmails": [],
            "dateOfBirth": 19910425,
            "status": "active",
            "address": {
                "street": "1524 South Lyons Court",
                "city": "Oviedo",
                "region": "Florida",
                "zip": "32765",
                "country": "United States"
            },
            "phoneNumber": {
                "value": "321-304-1234",
                "type": "mobile"
            },
            "alternatePhoneNumbers": [
                {
                  "value": "321-321-3210",
                  "type": "home"
                }
            ],
            "role": "admin"
        };

        var cb = res => {

            let body = '';

            res.on('data', chunk => body += chunk);
            res.on('end', () => { resolve(body); });

        };

        var err = e => {
            reject(e, {
                message: "Error in http request."
            });
        };

        http.request(options, cb).on('error', err).end(JSON.stringify(body));

        // let content = JSON.stringify({
        //     "_id": "5908e4abcce0b1416dfcd0c6",
        //     "email": "raidenkaneda@gmail.com",
        //     "userName": "rkaneda",
        //     "firstName": "raiden",
        //     "lastName": "kaneda",
        //     "alternateEmails": [],
        //     "dateOfBirth": 19910425,
        //     "status": "active",
        //     "address": {
        //         "street": "1524 South Lyons Court",
        //         "city": "Oviedo",
        //         "region": "Florida",
        //         "zip": "32765",
        //         "country": "United States"
        //     },
        //     "phoneNumber": {
        //         "value": "321-304-1234",
        //         "type": "mobile"
        //     },
        //     "alternatePhoneNumbers": [
        //         {
        //           "value": "321-321-3210",
        //           "type": "home"
        //         }
        //     ],
        //     "role": "admin"
        // });

        // req.write(content);

        // req.end(content);
    });
}

// function send(method, url, cb) {
//     var xhr, now, diff;

//     now = new Date();
//     xhr = new XMLHttpRequest();
//     xhr.open(method.toUpperCase(), url, true);
//     xhr.setRequestHeader("Accept", "*/*");

//     xhr.onreadystatechange = function () {
//         if (xhr.readyState === 4) {

//             if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {

//                 diff = new Date() - now;
//                 cb(diff);
//             }
//             else { cb(-1); }
//         }
//     };
     
//     xhr.send(null);
// }

function send (options, callback) {
    var now = new Date();

    request(options)
        .then(() => { callback(new Date() - now); })
        .catch((e, params) => { /*console.error(e);*/ callback(-1); });
}

function test (options, length, parallel) {
    var requests = [], func, received = 0;

    func = function (diff) {

        if (diff >= 0) {
            requests.push(diff);
        }

        if (++received >= length) {
            var avg = 0;

            requests.forEach(function (v) { avg += v; });

            avg /= requests.length;

            console.log(requests.length + " requests took an average of " + avg + " ms");
        }
        else if (!parallel) { send(options, func); }
    }

    if (parallel) {
        for (var i = 0; i < length; i++) {
            send(options, func);
        }
    }
    else { send(options, func); }
}

// localhost:3700/api/users/590b7024ba2d512bc1b0e850
/* {
{
    "_id": "5908e4abcce0b1416dfcd0c6",
    "email": "raidenkaneda@gmail.com",
    "userName": "rkaneda",
    "firstName": "raiden",
    "lastName": "kaneda",
    "alternateEmails": [],
    "dateOfBirth": 19910425,
    "status": "active",
    "address": {
        "street": "1524 South Lyons Court",
        "city": "Oviedo",
        "region": "Florida",
        "zip": "32765",
        "country": "United States"
    },
    "phoneNumber": {
        "value": "321-304-1234",
        "type": "mobile"
    },
    "alternatePhoneNumbers": [
        {
          "value": "321-321-3210",
          "type": "home"
        }
    ],
    "role": "admin"
} 

} */

test({
    

}, 5, true);