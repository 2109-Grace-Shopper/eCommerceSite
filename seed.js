const { db, Product, User } = require('./server/db');

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
    avatar: '',
    isAdmin: true,
  },
  {
    firstName: 'Emily',
    lastName: 'Roble',
    email: 'emilyroble@stardewvalley.com',
    password: '12345',
    avatar: '',
    isAdmin: true,
  },
  {
    firstName: 'Anshu',
    lastName: 'Patel',
    email: 'anshupatel@stardewvalley.com',
    password: '12345',
    avatar: '',
    isAdmin: true,
  },
  {
    firstName: 'Zoey',
    lastName: 'Zhang',
    email: 'zoeyzhang@stardewvalley.com',
    password: '123',
    avatar: '',
    isAdmin: true,
  },
];

const product = {};

const seed = async () => {
  try {
    await db.sync({ force: true });

    // seed your database here!
    const createdUser = await Promise.all(
      users.map((user) => {
        return User.create(user);
      })
    );

    const createdProjects = await Promise.all(
      projects.map((project) => {
        return Project.create(project);
      })
    );

    const [rosey, andrew, walle, beebo] = createdRobots;
    const [trash, dishes, car, homework] = createdProjects;

    await rosey.addProjects([dishes, homework]);
    await walle.addProject(trash);
    await andrew.addProjects([car, homework]);

    console.log('Seeding Success!');
    db.close();
  } catch (err) {
    console.log(red(err));
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
      console.log(green('Seeding success!'));
      db.close();
    })
    .catch((err) => {
      console.error(red('Oh noes! Something went wrong!'));
      console.error(err);
      db.close();
    });
}
