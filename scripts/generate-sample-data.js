const axios = require('axios');
const chalk = require('chalk');

const apiUrl = 'http://localhost:9000/api';
const sampleUser = { email: 'testuser@email.com', password: 'my-password' };
const sampleItems = [
  { name: "Paper clip", value: 0.1 },
  { name: "Colorful pen", value: 1.2 },
  { name: "Notebook", value: 2.5 },
  { name: "Soft eraser", value: 0.5 },
  { name: "Table lamp", value: 5.1 }
];

const postSampleUser = async () => {
  try {
    const response = await axios.post(`${apiUrl}/users/register`, sampleUser);
    console.log(chalk.green('Sample user successfuly created'));
    return response.data.token;
  } catch (error) {
    console.log(chalk.red(error.response.data.message));
    process.exit(1);
  }
}

const postSampleItems = async (token) => {
  const options = { headers: { Authorization: `Bearer ${token}` } };
  try {
    const postItemRequests = sampleItems.map(item => axios.post(`${apiUrl}/items`, item, options));
    const response = await axios.all(postItemRequests);
    console.log(chalk.green(`${response.length} item(s) successfuly created`));
  } catch (error) {
    console.log(chalk.red(error.response.data.message));
    process.exit(1);
  }
}

const generateSampleData = async () => {
  const token = await postSampleUser();
  await postSampleItems(token);
  console.log(chalk.green('Operation successfuly completed'));
  process.exit(0);
}

generateSampleData();
