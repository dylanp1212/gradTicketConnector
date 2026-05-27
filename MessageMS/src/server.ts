import dotenv from 'dotenv';
dotenv.config();

import app from './app';

app.listen(3004, () => {
  console.log(`Server Running on port 3004`);
  console.log('API Testing UI: http://localhost:3004/api/v0/docs/');
});
