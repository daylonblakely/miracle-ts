import app from './app';

const port = 5000;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
