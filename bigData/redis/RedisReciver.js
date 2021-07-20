var express = require('express');
var app = require('express')();
var server = require('http').Server(app);
var redis = require('redis');
var redisClient = redis.createClient();
var sub = redis.createClient()
var allMap = new Map();
var car_number = 0;
var cards = []
var brands=[]
var section_1 = 0, section_2 = 0, section_3 = 0, section_4 = 0, section_5 = 0;
var Audi = 0, BMW = 0, Ford = 0, Honda = 0, Reno = 0, Toyota = 0, Lamborghini = 0, Maserati = 0;
var car = 0, bus = 0, truck = 0, motocycle = 0;
var car_section1 = [], car_section2 = [], car_section3 = [], car_section4 = [], car_section5 = [];

redisClient.subscribe('message'); 

app.get('/', (req, res) => res.send('Hello World!'))

exports.getcars = (req, res, next) => {
    getbrands();
    getCarType();
    carsSections();

    var all_section = section_1 + section_2 + section_3 + section_4 + section_5;

    var cards=[
        {section: "section 1", Number_of_cars: section_1 , Precent_of_cars: (section_1/all_section)*100, car_section: car_section1},
        {section: "section 2", Number_of_cars: section_2 , Precent_of_cars: (section_2/all_section)*100, car_section: car_section2},
        {section: "section 3", Number_of_cars: section_3 , Precent_of_cars: (section_3/all_section)*100, car_section: car_section3},
        {section: "section 4", Number_of_cars: section_4 , Precent_of_cars: (section_4/all_section)*100, car_section: car_section4},
        {section: "section 5", Number_of_cars: section_5 , Precent_of_cars: (section_5/all_section)*100, car_section: car_section5}];

    var all_brands = Audi + BMW + Ford + Honda + Reno + Toyota + Lamborghini + Maserati;
    var brands=[
        {brand: "Audi", Number_of_cars: Audi , Precent_of_cars: (Audi/all_brands)*100 },
        {brand: "BMW", Number_of_cars: BMW , Precent_of_cars: (BMW/all_brands)*100 },
        {brand: "Ford", Number_of_cars: Ford , Precent_of_cars: (Ford/all_brands)*100 },
        {brand: "Honda", Number_of_cars: Honda , Precent_of_cars: (Honda/all_brands)*100 },
        {brand: "Reno", Number_of_cars: Reno , Precent_of_cars: (Reno/all_brands)*100 },
        {brand: "Toyota", Number_of_cars: Toyota , Precent_of_cars: (Toyota/all_brands)*100 },
        {brand: "Lamborghini", Number_of_cars: Lamborghini , Precent_of_cars: (Lamborghini/all_brands)*100 },
        {brand: "Maserati", Number_of_cars: Maserati , Precent_of_cars: (Maserati/all_brands)*100 }];

    var all = {cards, brands};
    res.render('./pages/index', {all: all}); 

}
function carsSections(){
    section_1 = 0, section_2 = 0, section_3 = 0, section_4 = 0, section_5 = 0;

    allMap.forEach(car => {
        var nowSection = car.get("now_section");

        if(nowSection == 1) section_1++;
        else if(nowSection == 2) section_2++;
        else if(nowSection == 3) section_3++;
        else if(nowSection == 4) section_4++;
        else section_5++; 
    });

    allMap.forEach((car, key) => {
        var nowSection = car.get("now_section");
        var inSection = car.get("in_section");
        var outSection = car.get("out_section");
        if(nowSection < outSection){
            nowSection++;
            car.set("now_section", nowSection);
        }
        else if(nowSection > outSection){
            nowSection--;
            car.set("now_section", nowSection);
        }
        else{
            allMap.delete(key);
            console.log(allMap.size);
        } 
    });
}
function getbrands(){
    Audi = 0, BMW = 0, Ford = 0, Honda = 0, Reno = 0, Toyota = 0, Lamborghini = 0, Maserati = 0;
    allMap.forEach(car => {
        var brand = car.get("brand");
        if(brand == "Audi") Audi++;
        else if(brand == "BMW") BMW++;
        else if(brand == "Ford") Ford++;
        else if(brand == "Honda") Honda++;
        else if(brand == "Reno") Reno++;
        else if(brand == "Toyota") Toyota++;
        else if(brand == "Lamborghini") Lamborghini++;
        else Maserati++; 
    });
}
function getCarType(){
    
        car_section1 = [];
        car_section2 = [];
        car_section3 = [];
        car_section4 = [];
        car_section5 = [];
        
            allMap.forEach(car => {
                var sec = car.get("now_section");
                var brand = car.get("brand");
                var color = car.get("color");
                var type = car.get("car_type");
                if (sec == 1) {
                    
                    car_section1.push({brand: brand , color: color , type: type});
                }
                else if(sec == 2){
                    car_section2.push({brand: brand , color: color , type: type});
                }
                else if(sec == 3){
                    car_section3.push({brand: brand , color:color , type:type});
                }
                else if(sec == 4){
                    car_section4.push({brand: brand , color:color , type:type});
                }
                else {
                    car_section5.push({brand: brand , color:color , type:type});
                }
            });
}
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

redisClient.on("message", function (channel, data) {
    var values = new Map();

    let jsonObject = JSON.parse(data);
    values.set("brand", jsonObject.brand);
    values.set("color", jsonObject.color);
    values.set("car_type", jsonObject.car_type);
    values.set("in_section", jsonObject.in_section);
    values.set("out_section", jsonObject.out_section);
    values.set("now_section", jsonObject.now_section);
    values.set("week_day", jsonObject.week_day);
    values.set("special_day", jsonObject.special_day);
    values.set("date", jsonObject.date);
    values.set("hour_in", jsonObject.hour_in);
    values.set("hour_out", jsonObject.hour_out);

    car_number++;

    allMap.set(car_number, values);

    // console.log(allMap.get(1).get("brand"));
});

redisClient.on('connect', function() {
    console.log('Reciver connected to Redis');
});


server.listen(6061, function() {
    console.log('reciver is running on port 6061');
});

