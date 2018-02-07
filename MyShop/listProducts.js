var faker = require('faker');

function randomList(){
    var line ="=================================================";
    console.log(line);
    console.log("This is a Random list of 10 items with prices:");
    console.log(line);
    for (var i = 0; i < 10; i++){
        console.log((i + 1) + ". The " + faker.commerce.productName() + " has a cost of: $" + faker.commerce.price());
    };
};

randomList();