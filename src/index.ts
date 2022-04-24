import app from './app';
import { mongooseConnection } from './utils/mongooseConnection';

const PORT: string | number = process.env.PORT || 4000;

export const tokenSecret = process.env.TOKEN_SECRET as string;

(async () => {
  try {
    await mongooseConnection();
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
  } catch (error) {
    throw error;
  }
})();
