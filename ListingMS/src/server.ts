import dotenv from 'dotenv';
dotenv.config();

import app from './app';

app.listen(3003, () => {
  console.log(`Server Running on port 3003`);
  console.log('API Testing UI: http://localhost:3003/api/v0/docs/');
});
