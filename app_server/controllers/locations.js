let sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.locationsStudy = function(req, res) {
    let locations = [
        {
            id: "597957c5be1e354ef8f4621e",
            name: "IPH Xuân Thủy",
            type: "study",
            address: "123 Xuân Thủy, Cầu Giấy, Hà Nội",
            rating: 5,
            keywords: [
                "Premium wifi", "Food", "Drinks"
            ],
            coords: [
                12.42434, 8.329042
            ],
            opening_time: [
                {
                    "days": "Monday - Friday",
                    "opening": "7:00AM",
                    "closing": "8:00PM",
                    "closed": false
                }, {
                    "days": "Saturday",
                    "opening": "8:00am",
                    "closing": "5:00pm",
                    "closed": false
                }, {
                    "days": "Sunday",
                    "closed": true
                }
            ],
            reviews: [
                {
                    "author": "Simon Holmes",
                    "id": "59795a49cb3d518515c57abc",
                    "rating": 5.0,
                    "createdOn": "2013-07-15T17:00:00.000Z",
                    "reviewText": "What a great place. I can't say enough goodthings about it."
                }, {
                    "author": "Bui Manh Thang",
                    "id": "59795bf7cb3d518515c57abe",
                    "rating": 3.0,
                    "createdOn": "2015-07-10T17:00:00.000Z",
                    "reviewText": "I don't really love it, but anyway, it is okay."
                }, {
                    "author": "thangbm",
                    "rating": 5,
                    "reviewText": "Xong rồi. Hay lắm",
                    "id": "5980cb1480c6253730f42fac",
                    "createdOn": "2017-08-01T18:40:20.672Z"
                }, {
                    "author": "thang bui manh",
                    "rating": 5,
                    "reviewText": "hello",
                    "id": "59af8b29885c470384e0812c",
                    "createdOn": "2017-09-06T05:44:09.929Z"
                }
            ],
            discount: "32%"
        }, {
            "id": "59795b91cb3d518515c57abd",
            "name": "Cafe Hero",
            "type": "study",
            "address": "126 Tran Thai Tong, Cau Giay, Ha Noi",
            "rating": 3,
            "keywords": [
                "Silence", "Outdoor", "Overnight"
            ],
            "coords": [
                105.782684, 21.038019
            ],
            "openingTimes": [
                {
                    "days": "Monday - Friday",
                    "opening": "7:00am",
                    "closing": "9:00pm",
                    "closed": false
                }, {
                    "days": "Saturday",
                    "opening": "6:00am",
                    "closing": "5:00pm",
                    "closed": false
                }, {
                    "days": "Sunday",
                    "closed": true
                }
            ],
            "reviews": [
                {
                    "author": "Michael Jackson",
                    "id": "59795c78cb3d518515c57abf",
                    "rating": 4.0,
                    "createdOn": "2015-07-07T17:00:00.000Z",
                    "reviewText": "Thanks to Cafe Hero, I met my best friend again, Bui Manh Thang...:))"
                }, {
                    "author": "Bui Manh Thang",
                    "rating": 5,
                    "reviewText": "Hello Thang",
                    "id": "597e9127957b4a26c4d7804c",
                    "createdOn": "2017-07-31T02:08:39.839Z"
                }, {
                    "author": "Bui Manh Thang",
                    "rating": 4,
                    "reviewText": "Hello World",
                    "id": "597f832519d05a3b68cb93ab",
                    "createdOn": "2017-07-31T19:21:09.051Z"
                }, {
                    "author": "Bui Manh Thang",
                    "rating": 3,
                    "reviewText": "Try",
                    "id": "597f83773fd8630644e84c10",
                    "createdOn": "2017-07-31T19:22:31.557Z"
                }, {
                    "author": "Hello",
                    "rating": 4,
                    "reviewText": "Try again",
                    "id": "597f843a2a238a34b0dcc466",
                    "createdOn": "2017-07-31T19:25:46.704Z"
                }, {
                    "author": "thang",
                    "rating": 1,
                    "reviewText": "again again",
                    "id": "597f847c08ba7127fceb22d3",
                    "createdOn": "2017-07-31T19:26:52.341Z"
                }, {
                    "author": "Lalaland",
                    "rating": 4,
                    "reviewText": "Hay lam",
                    "id": "597f85d64de6642764015eb9",
                    "createdOn": "2017-07-31T19:32:38.156Z"
                }, {
                    "author": "Lalaland",
                    "rating": 4,
                    "reviewText": "Hay lam",
                    "id": "597f85d84de6642764015eba",
                    "createdOn": "2017-07-31T19:32:40.084Z"
                }, {
                    "author": "Lalaland",
                    "rating": 4,
                    "reviewText": "Hay lam",
                    "id": "597f85d94de6642764015ebb",
                    "createdOn": "2017-07-31T19:32:41.608Z"
                }, {
                    "author": "Lalaland",
                    "rating": 3,
                    "reviewText": "hay lam",
                    "id": "597f865ce6634f1668b91587",
                    "createdOn": "2017-07-31T19:34:52.716Z"
                }, {
                    "author": "Thang",
                    "rating": 4,
                    "reviewText": "Bay gio thi duoc chua",
                    "id": "597f869127ae2527042ce6e7",
                    "createdOn": "2017-07-31T19:35:45.185Z"
                }
            ],
            discount: "50%"
        },
        {
            id: "597957c5be1e354ef8f4621e2t",
            name: "Trà đá vỉa hè Chiến Thắng",
            type: "study",
            address: "123 Hai Bà Trưng, Hoàn Kiếm, Hà Nội",
            rating: 2,
            keywords: [
                "Outdoor", "Gaming Room", "Drinks"
            ],
            coords: [
                19.42434, 28.329042
            ],
            opening_time: [
                {
                    "days": "Monday - Thurday",
                    "opening": "7:00AM",
                    "closing": "11:00PM",
                    "closed": false
                }, {
                    "days": "Friday",
                    "opening": "8:00am",
                    "closing": "5:00pm",
                    "closed": false
                }, {
                    "days": "Saturday - Sunday",
                    "closed": true
                }
            ],
            reviews: [
                {
                    "author": "Simon Holmes",
                    "id": "59795a49cb3d518515c57abc",
                    "rating": 5.0,
                    "createdOn": "2013-07-15T17:00:00.000Z",
                    "reviewText": "What a great place. I can't say enough goodthings about it."
                }, {
                    "author": "Bui Manh Thang",
                    "id": "59795bf7cb3d518515c57abe",
                    "rating": 3.0,
                    "createdOn": "2015-07-10T17:00:00.000Z",
                    "reviewText": "I don't really love it, but anyway, it is okay."
                }, {
                    "author": "thangbm",
                    "rating": 5,
                    "reviewText": "Xong rồi. Hay lắm",
                    "id": "5980cb1480c6253730f42fac",
                    "createdOn": "2017-08-01T18:40:20.672Z"
                }, {
                    "author": "thang bui manh",
                    "rating": 5,
                    "reviewText": "hello",
                    "id": "59af8b29885c470384e0812c",
                    "createdOn": "2017-09-06T05:44:09.929Z"
                }
            ],
            discount: "NO"
        },
        {
            id: "597957c5be1e354ef8f4621efw",
            name: "Hồ Hoàn Kiếm",
            type: "study",
            address: "Quận Hoàn Kiếm, Hà Nội",
            rating: 4,
            keywords: [
                "Outdoor", "Premium wifi", "Drinks"
            ],
            coords: [
                32.42434, 18.329042
            ],
            opening_time: [
                {
                    "days": "Monday - Saturday",
                    "opening": "7:00AM",
                    "closing": "8:00PM",
                    "closed": false
                }, {
                    "days": "Sunday",
                    "closed": true
                }
            ],
            reviews: [
                {
                    "author": "Simon Holmes",
                    "id": "59795a49cb3d518515c57abc",
                    "rating": 5.0,
                    "createdOn": "2013-07-15T17:00:00.000Z",
                    "reviewText": "What a great place. I can't say enough goodthings about it."
                }, {
                    "author": "Bui Manh Thang",
                    "id": "59795bf7cb3d518515c57abe",
                    "rating": 3.0,
                    "createdOn": "2015-07-10T17:00:00.000Z",
                    "reviewText": "I don't really love it, but anyway, it is okay."
                }, {
                    "author": "thangbm",
                    "rating": 5,
                    "reviewText": "Xong rồi. Hay lắm",
                    "id": "5980cb1480c6253730f42fac",
                    "createdOn": "2017-08-01T18:40:20.672Z"
                }, {
                    "author": "thang bui manh",
                    "rating": 5,
                    "reviewText": "hello",
                    "id": "59af8b29885c470384e0812c",
                    "createdOn": "2017-09-06T05:44:09.929Z"
                }
            ],
            discount: "32%"
        }
    ]
    sendJsonResponse(res, 200, locations);
}
