import express, { Request, Response } from 'express';

const app = express();
const PORT = 4040;

app.get('/api', (req: Request, res: Response) => {
  return res.send('Hello Ekene');
});

app.listen(PORT, () => console.log(`Server Started! as ${PORT} `));
