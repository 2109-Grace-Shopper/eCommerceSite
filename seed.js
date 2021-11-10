const { db, models: {User, Product} } = require('./server/db');

const users = [
  {
    firstName: 'Gus',
    lastName: 'Bartender',
    email: 'gusbartender@stardewvalley.com',
    password: '12345',
    avatar: '/public/users/Gus.png',
    isAdmin: false,
  },
  {
    firstName: 'Jodi',
    lastName: 'Mom',
    email: 'jodimom@stardewvalley.com',
    password: '12345',
    avatar: '/public/users/Jodi.png',
    isAdmin: false,
  },
  {
    firstName: 'Marnie',
    lastName: 'Rancher',
    email: 'marnierancher@stardewvalley.com',
    password: '12345',
    avatar: '/public/users/Marnie.png',
    isAdmin: false,
  },
  {
    firstName: 'Shane',
    lastName: 'Stocker',
    email: 'shanestocker@stardewvalley.com',
    password: '12345',
    avatar: '/public/users/Shane.png',
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
    category:'',
    price: 100,
    description: 'A common cooking ingredient made from crushed wheat seeds.',
    imageUrl: '/public/products/Wheat_Flour.png'
  },
  {
    name:'Rice',
    category:'',
    price: 200,
    description: 'A basic grain often served under vegetables.',
    imageUrl: '/public/products/Rice.png'
  },
  {
    name:'Oil',
    category:'',
    price: 200,
    description: 'All purpose cooking oil.',
    imageUrl: '/public/products/Oil.png'
  },
  {
    name:'Vinegar',
    category:'',
    price: 200,
    description: 'An aged fermented liquid used in many cooking recipes.',
    imageUrl: '/public/products/Vinegar.png'
  },
  {
    name:'Basic Fertilizer',
    category:'',
    price: 100,
    description: 'Improves soil quality a little, increasing your chance to grow quality crops. Mix into tilled soil.',
    imageUrl: '/public/products/Basic_Fertilizer.png'
  },
  {
    name:'Quality Fertilizer',
    category:'',
    price: 150,
    description: 'Improves soil quality, increasing your chance to grow quality crops. Mix into tilled soil. (Available in year 2+)',
    imageUrl: '/public/products/Quality_Fertilizer.png'
  },
  {
    name:'Basic Retaining Soil',
    category:'',
    price: 100,
    description: 'This soil has a chance of staying watered overnight. Mix into tilled soil.',
    imageUrl: '/public/products/Basic_Retaining_Soil.png'
  },
  {
    name:'Quality Retaining Soil',
    category:'',
    price: 150,
    description: 'This soil has a good chance of staying watered overnight. Mix into tilled soil.',
    imageUrl: '/public/products/Quality_Retaining_Soil.png'
  },
  {
    name:'Speed-Gro',
    category:'',
    price: 100,
    description: 'Stimulates leaf production. Guaranteed to increase growth rate by at least 10%. Mix into tilled soil.',
    imageUrl: '/public/products/Speed-Gro.png'
  },
  {
    name:'Deluxe Speed-Gro',
    category:'',
    price: 150,
    description: 'Stimulates leaf production. Guaranteed to increase growth rate by at least 25%. Mix into tilled soil.',
    imageUrl: '/public/products/Deluxe_Speed-Gro.png'
  },
  {
    name:'Wallpaper',
    category:'',
    price: 100,
    description: 'Decorates the walls of one room',
    imageUrl: '/public/products/36px-Wallpaper_001_Icon.png'
  },
  {
    name:'Flooring',
    category:'',
    price: 100,
    description: 'Decorates the floor of one room.',
    imageUrl: '/public/products/40px-Flooring_01_Icon.png'
  },
  {
    name:'Cherry Sapling',
    category:'',
    price: 3400,
    description: 'Takes 28 days to produce a mature Cherry tree. Bears fruit in the spring. Only grows if the 8 surrounding "tiles" are empty.',
    imageUrl: '/public/products/Cherry_Sapling.png'
  },
  {
    name:'Apricot Sapling',
    category:'',
    price: 2000,
    description: 'Takes 28 days to produce a mature Apricot tree. Bears fruit in the spring. Only grows if the 8 surrounding "tiles" are empty.',
    imageUrl: '/public/products/Cherry_Sapling.png'
  },
  {
    name:'Orange Sapling',
    category:'',
    price: 100,
    description: 'Takes 28 days to produce a mature Orange tree. Bears fruit in the summer. Only grows if the 8 surrounding "tiles" are empty.',
    imageUrl: '/public/products/Orange_Sapling.png'
  },
  {
    name:'Peach Sapling',
    category:'',
    price: 100,
    description: 'Takes 28 days to produce a mature Peach tree. Bears fruit in the summer. Only grows if the 8 surrounding "tiles" are empty.',
    imageUrl: '/public/products/Peach_Sapling.png'
  },
  {
    name:'Pomegranate Sapling',
    category:'',
    price: 100,
    description: 'Takes 28 days to produce a mature Pomegranate tree. Bears fruit in the fall. Only grows if the 8 surrounding "tiles" are empty.',
    imageUrl: '/public/products/Pomegranate_Sapling.png'
  },
  {
    name:'Apple Sapling',
    category:'',
    price: 100,
    description: 'Takes 28 days to produce a mature Apple tree. Bears fruit in the fall. Only grows if the 8 surrounding "tiles" are empty.',
    imageUrl: '/public/products/Apple_Sapling.png'
  },
  {
    name:'',
    category:'',
    price: 100,
    description: '',
    imageUrl: ''
  },
  {
    name:'',
    category:'',
    price: 100,
    description: '',
    imageUrl: ''
  },
  {
    name:'',
    category:'',
    price: 100,
    description: '',
    imageUrl: ''
  },
  {
    name:'',
    category:'',
    price: 100,
    description: '',
    imageUrl: ''
  },
  {
    name:'',
    category:'',
    price: 100,
    description: '',
    imageUrl: ''
  },
  {
    name:'',
    category:'',
    price: 100,
    description: '',
    imageUrl: ''
  },
  {
    name:'',
    category:'',
    price: 100,
    description: '',
    imageUrl: ''
  },
  {
    name:'',
    category:'',
    price: 100,
    description: '',
    imageUrl: ''
  },
  {
    name:'',
    category:'',
    price: 100,
    description: '',
    imageUrl: ''
  },
  {
    name:'',
    category:'',
    price: 100,
    description: '',
    imageUrl: ''
  },
  {
    name:'',
    category:'',
    price: 100,
    description: '',
    imageUrl: ''
  },
  {
    name:'',
    category:'',
    price: 100,
    description: '',
    imageUrl: ''
  },
  {
    name:'',
    category:'',
    price: 100,
    description: '',
    imageUrl: ''
  },
  {
    name:'',
    category:'',
    price: 100,
    description: '',
    imageUrl: ''
  },
  {
    name:'',
    category:'',
    price: 100,
    description: '',
    imageUrl: ''
  },
  {
    name:'',
    category:'',
    price: 100,
    description: '',
    imageUrl: ''
  },
  {
    name:'',
    category:'',
    price: 100,
    description: '',
    imageUrl: ''
  },
  {
    name:'',
    category:'',
    price: 100,
    description: '',
    imageUrl: ''
  },
  {
    name:'',
    category:'',
    price: 100,
    description: '',
    imageUrl: ''
  },
  {
    name:'',
    category:'',
    price: 100,
    description: '',
    imageUrl: ''
  },
  {
    name:'',
    category:'',
    price: 100,
    description: '',
    imageUrl: ''
  }
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
