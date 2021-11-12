const { db, models: {User, Product} } = require('./server/db');

const users = [
  {
    firstName: 'Gus',
    lastName: 'Bartender',
    email: 'gusbartender@stardewvalley.com',
    password: '12345',
    avatar: 'https://raw.githubusercontent.com/2109-Grace-Shopper/eCommerceSite/main/public/users/Gus.png',
    isAdmin: false,
  },
  {
    firstName: 'Jodi',
    lastName: 'Mom',
    email: 'jodimom@stardewvalley.com',
    password: '12345',
    avatar: 'https://raw.githubusercontent.com/2109-Grace-Shopper/eCommerceSite/main/public/users/Jodi.png',
    isAdmin: false,
  },
  {
    firstName: 'Marnie',
    lastName: 'Rancher',
    email: 'marnierancher@stardewvalley.com',
    password: '12345',
    avatar: 'https://raw.githubusercontent.com/2109-Grace-Shopper/eCommerceSite/main/public/users/Marnie.png',
    isAdmin: false,
  },
  {
    firstName: 'Shane',
    lastName: 'Stocker',
    email: 'shanestocker@stardewvalley.com',
    password: '12345',
    avatar: 'https://raw.githubusercontent.com/2109-Grace-Shopper/eCommerceSite/main/public/users/Shane.png',
    isAdmin: false,
  },
  {
    firstName: 'Claudia',
    lastName: 'Flores',
    email: 'claudiaflores@stardewvalley.com',
    password: '12345',
    isAdmin: true,
  },
  {
    firstName: 'Emily',
    lastName: 'Roble',
    email: 'emilyroble@stardewvalley.com',
    password: '12345',
    isAdmin: true,
  },
  {
    firstName: 'Anshu',
    lastName: 'Patel',
    email: 'anshupatel@stardewvalley.com',
    password: '12345',
    isAdmin: true,
  },
  {
    firstName: 'Zoey',
    lastName: 'Zhang',
    email: 'zoeyzhang@stardewvalley.com',
    password: '12345',
    isAdmin: true,
  },
];

const products = [
  {
    name:'Grass Starter',
    category:'seeds',
    price: 100,
    description: 'Place this on your farm to start a new patch of grass.',
    imageUrl: '/public/products/Grass_Starter.png'
  },
  {
    name:'Sugar',
    category:'stock items',
    price: 100,
    description: 'Adds sweetness to pastries and candies. Too much can be unhealthy.',
    imageUrl: '/public/products/Sugar.png'
  },
  {
    name:'Wheat Flour',
    category:'stock items',
    price: 100,
    description: 'A common cooking ingredient made from crushed wheat seeds.',
    imageUrl: '/public/products/Wheat_Flour.png'
  },
  {
    name:'Rice',
    category:'stock items',
    price: 200,
    description: 'A basic grain often served under vegetables.',
    imageUrl: '/public/products/Rice.png'
  },
  {
    name:'Oil',
    category:'stock items',
    price: 200,
    description: 'All purpose cooking oil.',
    imageUrl: '/public/products/Oil.png'
  },
  {
    name:'Vinegar',
    category:'stock items',
    price: 200,
    description: 'An aged fermented liquid used in many cooking recipes.',
    imageUrl: '/public/products/Vinegar.png'
  },
  {
    name:'Basic Fertilizer',
    category:'farming utility',
    price: 100,
    description: 'Improves soil quality a little, increasing your chance to grow quality crops. Mix into tilled soil.',
    imageUrl: '/public/products/Basic_Fertilizer.png'
  },
  {
    name:'Quality Fertilizer',
    category:'farming utility',
    price: 150,
    description: 'Improves soil quality, increasing your chance to grow quality crops. Mix into tilled soil. (Available in year 2+)',
    imageUrl: '/public/products/Quality_Fertilizer.png'
  },
  {
    name:'Basic Retaining Soil',
    category:'farming utility',
    price: 100,
    description: 'This soil has a chance of staying watered overnight. Mix into tilled soil.',
    imageUrl: '/public/products/Basic_Retaining_Soil.png'
  },
  {
    name:'Quality Retaining Soil',
    category:'farming utility',
    price: 150,
    description: 'This soil has a good chance of staying watered overnight. Mix into tilled soil.',
    imageUrl: '/public/products/Quality_Retaining_Soil.png'
  },
  {
    name:'Speed-Gro',
    category:'farming utility',
    price: 100,
    description: 'Stimulates leaf production. Guaranteed to increase growth rate by at least 10%. Mix into tilled soil.',
    imageUrl: '/public/products/Speed-Gro.png'
  },
  {
    name:'Deluxe Speed-Gro',
    category:'farming utility',
    price: 150,
    description: 'Stimulates leaf production. Guaranteed to increase growth rate by at least 25%. Mix into tilled soil.',
    imageUrl: '/public/products/Deluxe_Speed-Gro.png'
  },
  {
    name:'Wallpaper',
    category:'stock items',
    price: 100,
    description: 'Decorates the walls of one room',
    imageUrl: '/public/products/36px-Wallpaper_001_Icon.png'
  },
  {
    name:'Flooring',
    category:'stock items',
    price: 100,
    description: 'Decorates the floor of one room.',
    imageUrl: '/public/products/40px-Flooring_01_Icon.png'
  },
  {
    name:'Cherry Sapling',
    category:'trees',
    price: 3400,
    description: 'Takes 28 days to produce a mature Cherry tree. Bears fruit in the spring. Only grows if the 8 surrounding "tiles" are empty.',
    imageUrl: '/public/products/Cherry_Sapling.png'
  },
  {
    name:'Apricot Sapling',
    category:'trees',
    price: 2000,
    description: 'Takes 28 days to produce a mature Apricot tree. Bears fruit in the spring. Only grows if the 8 surrounding "tiles" are empty.',
    imageUrl: '/public/products/Apricot_Sapling.png'
  },
  {
    name:'Orange Sapling',
    category:'trees',
    price: 4000,
    description: 'Takes 28 days to produce a mature Orange tree. Bears fruit in the summer. Only grows if the 8 surrounding "tiles" are empty.',
    imageUrl: '/public/products/Orange_Sapling.png'
  },
  {
    name:'Peach Sapling',
    category:'trees',
    price: 6000,
    description: 'Takes 28 days to produce a mature Peach tree. Bears fruit in the summer. Only grows if the 8 surrounding "tiles" are empty.',
    imageUrl: '/public/products/Peach_Sapling.png'
  },
  {
    name:'Pomegranate Sapling',
    category:'trees',
    price: 6000,
    description: 'Takes 28 days to produce a mature Pomegranate tree. Bears fruit in the fall. Only grows if the 8 surrounding "tiles" are empty.',
    imageUrl: '/public/products/Pomegranate_Sapling.png'
  },
  {
    name:'Apple Sapling',
    category:'trees',
    price: 4000,
    description: 'Takes 28 days to produce a mature Apple tree. Bears fruit in the fall. Only grows if the 8 surrounding "tiles" are empty.',
    imageUrl: '/public/products/Apple_Sapling.png'
  },
  {
    name:'Catalogue',
    category:'stock items',
    price: 30000,
    description: 'Provides unlimited access to all wallpapers and floors... from the convenience of your home!',
    imageUrl: '/public/products/32px-Catalogue.png'
  },
  {
    name:'Bouquet',
    category:'stock items',
    price: 200,
    description: 'A gift that shows your romantic interest.',
    imageUrl: '/public/products/Bouquet.png'
  },
  {
    name:'Large Pack',
    category:'stock items',
    price: 2000,
    description: 'A larger pack that you can fit more things into.',
    imageUrl: '/public/products/Backpack.png'
  },
  {
    name:'Deluxe Pack',
    category:'stock items',
    price: 10000,
    description: 'An even larger pack. I bet you could fit a few chickens in there.',
    imageUrl: '/public/products/Lg_Backpack.png'
  },
  {
    name:'Eggplant Seeds',
    category:'seeds',
    price: 20,
    description: 'Plant these in the fall. Takes 5 days to mature, and continues to produce after first harvest.',
    imageUrl: '/public/products/Eggplant_Seeds.png'
  },
  {
    name:'Corn Seeds',
    category:'seeds',
    price: 150,
    description: 'Plant these in the summer or fall. Takes 14 days to mature, and continues to produce after first harvest.',
    imageUrl: '/public/products/Corn_Seeds.png'
  },
  {
    name:'Pumpkin Seeds',
    category:'seeds',
    price: 100,
    description: 'Plant these in the fall. Takes 13 days to mature.',
    imageUrl: '/public/products/Pumpkin_Seeds.png'
  },
  {
    name:'Bok Choy Seeds',
    category:'seeds',
    price: 50,
    description: 'Plant these in the fall. Takes 4 days to mature.',
    imageUrl: '/public/products/Bok_Choy_Seeds.png'
  },
  {
    name:'Yam Seeds',
    category:'seeds',
    price: 60,
    description: 'Plant these in the fall. Takes 10 days to mature.',
    imageUrl: '/public/products/Yam_Seeds.png'
  },
  {
    name:'Cranberry Seeds',
    category:'seeds',
    price: 240,
    description: 'Plant these in the fall. Takes 7 days to mature, and continues to produce after first harvest.',
    imageUrl: '/public/products/Cranberry_Seeds.png'
  },
  {
    name:'Sunflower Seeds',
    category:'seeds',
    price: 200,
    description: 'Plant in summer or fall. Takes 8 days to produce a large sunflower. Yields more seeds at harvest.',
    imageUrl: '/public/products/36px-Sunflower_Seeds.png'
  },
  {
    name:'Fairy Seeds',
    category:'seeds',
    price: 200,
    description: 'Plant in fall. Takes 12 days to produce a mysterious flower. Assorted Colors.',
    imageUrl: '/public/products/Fairy_Seeds.png'
  },
  {
    name:'Amaranth Seeds',
    category:'seeds',
    price: 70,
    description: 'Plant these in the fall. Takes 7 days to grow. Harvest with the scythe.',
    imageUrl: '/public/products/Amaranth_Seeds.png'
  },
  {
    name:'Grape Starter',
    category:'seeds',
    price: 60,
    description: 'Plant these in the fall. Takes 10 days to grow, but keeps producing after that. Grows on a trellis.',
    imageUrl: '/public/products/Grape_Starter.png'
  },
  {
    name:'Wheat Seeds',
    category:'seeds',
    price: 10,
    description: 'Plant these in the summer or fall. Takes 4 days to mature. Harvest with the scythe.',
    imageUrl: '/public/products/Wheat_Seeds.png'
  },
  {
    name:'Artichoke Seeds',
    category:'seeds',
    price: 30,
    description: 'Plant these in the fall. Takes 8 days to mature.',
    imageUrl: '/public/products/Artichoke_Seeds.png'
  },
  {
    name:'Jack-O-Lantern',
    category:'seasonal decor',
    price: 750,
    description: 'A whimsical fall decoration.',
    imageUrl: '/public/products/Jack-O-Lantern.png'
  },
  {
    name:'Rarecrow 2',
    category:'seasonal decor',
    price: 5000,
    description: 'One of 8 special scarecrows. Collect them all!',
    imageUrl: '/public/products/36px-Rarecrow_2.png'
  },
  {
    name:'Grave Stone',
    category:'seasonal decor',
    price: 350,
    description: 'A decorative piece for your farm.',
    imageUrl: '/public/products/36px-Grave_Stone.png'
  },
  {
    name:'Funky Rug',
    category:'seasonal decor',
    price: 4000,
    description: 'Can be placed inside your house.',
    imageUrl: '/public/products/70px-Funky_Rug.png'
  },
];

const seed = async () => {
  try {
    await db.sync({ force: true });

    // seed your database here!
    const createdUsers = await Promise.all(
      users.map((user) => {
        return User.create(user);
      })
    );

    //updated for products:
    const createdProducts = await Promise.all(
      products.map((product) => {
        return Product.create(product);
      })
    );


    // const [rosey, andrew, walle, beebo] = createdRobots;
    // const [trash, dishes, car, homework] = createdProjects;

    // //use magic method to give each user a cart
    // await rosey.addProjects([dishes, homework]);
    // await walle.addProject(trash);
    // await andrew.addProjects([car, homework]);

    console.log('Seeding Success!');
    db.close();
  } catch (err) {
    console.log(err);
    console.log('Something went wrong!');
    db.close();
  }
};

module.exports = seed;
// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)
if (require.main === module) {
  seed()
    .then(() => {
      console.log('Seeding success!');
      db.close();
    })
    .catch((err) => {
      console.error('Oh noes! Something went wrong!');
      console.error(err);
      db.close();
    });
}
