let sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.locationsStudy = function(req, res) {
    // let locations = [
    //     {
    //         name: "IPH Xuân Thủy",
    //         type: "work",
    //         address: "123 Xuân Thủy, Cầu Giấy, Hà Nội",
    //         rating: 5,
    //         keywords: ["Premium wifi", "Food", "Drinks"],
    //         coords: {
    //             long: 12.42434,
    //             lat: 8.329042
    //         }
    //         opening_time: [
    //             {
    //                 days: "Monday - Friday",
    //             }
    //         ]
    //     }
    // ]
    // sendJsonResponse(res, 200, {'status': 'ok men'});
}
