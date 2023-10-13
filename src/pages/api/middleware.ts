
import Cors from 'cors';

const cors = Cors({
  methods: ['GET', 'HEAD', 'POST'], 
});


function initMiddleware(middleware: (arg0: any, arg1: any, arg2: (result: any) => void) => void) {
  return (req: any, res: any) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result: unknown) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });
}

export default async function useCors(req: any, res: any) {
  await initMiddleware(cors)(req, res);
}
