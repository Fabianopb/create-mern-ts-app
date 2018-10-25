const MongoClient = require('mongodb').MongoClient;
const crypto = require('crypto');
const chalk = require('chalk');

const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/test_database';
const dbName = url.split('/')[url.split('/').length - 1];

(async() => {
  let client;
  try {
    client = await MongoClient.connect(url, { useNewUrlParser: true });
    const db = client.db(dbName);
    console.log(chalk.yellow('Connected to the database'));
    const usersCollection = db.collection('users');
    const itemsCollection = db.collection('items');
    const countUsers = await usersCollection.countDocuments({});
    const countItems = await itemsCollection.countDocuments({});
    if (countUsers === 0 && countItems === 0) {
      console.log(chalk.yellow('No users or items in the database, creating sample data...'));
      const email = 'testuser@email.com';
      const password = 'my-password';
      const salt = crypto.randomBytes(16).toString('hex');
      const hash = crypto.pbkdf2Sync(password, salt, 100000, 512, 'sha512').toString('hex');
      await usersCollection.save({ email, hash, salt });
      console.log(chalk.green('Sample user successfuly created!'));
      const items = [
        { name: 'Paper clip', value: 0.1 },
        { name: 'Colorful pen', value: 1.2 },
        { name: 'Notebook', value: 2.5 },
        { name: 'Soft eraser', value: 0.5 },
        { name: 'Table lamp', value: 5.1 }
      ];
      await itemsCollection.insertMany(items);
      console.log(chalk.green(`${items.length} item(s) successfuly created!`));
    } else {
      console.log(chalk.yellow('Database already initiated, skipping populating script'));
    }
  } catch (error) {
    console.log(chalk.red(error));
  } finally {
    client.close();
    console.log(chalk.yellow('Disconnected from the database'));
  }
})();
