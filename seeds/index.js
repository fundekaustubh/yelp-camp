const mongoose = require('mongoose');
const cities = require('./cities');
const Campground = require('../models/campground');
const { places, descriptors } = require('./seedHelpers');
mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const locationIndex = Math.floor(Math.random() * 1000) + 1;
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: "6104d09c7af8cd3d880415c5",
            location: `${cities[locationIndex].city}, ${cities[locationIndex].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                    url: 'https://res.cloudinary.com/duo707rhn/image/upload/v1635588912/YelpCamp/elpszqfn2qm9fy9cqomh.jpg',
                    filename: 'YelpCamp/elpszqfn2qm9fy9cqomh'
                },
                {
                    url: 'https://res.cloudinary.com/duo707rhn/image/upload/v1635588912/YelpCamp/klohhz4ec59w9mcbdkip.jpg',
                    filename: 'YelpCamp/klohhz4ec59w9mcbdkip'
                }
            ],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque autem hic quam nostrum quod distinctio reprehenderit perferendis mollitia eaque nihil nisi, accusamus, suscipit sit numquam? Officia facere perspiciatis architecto eligendi?',
            price: price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});