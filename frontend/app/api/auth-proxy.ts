import { NextApiRequest, NextApiResponse } from 'next';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { NextApiHandler } from 'next';

const proxy = createProxyMiddleware({
  target: `https://<your-project>.firebaseapp.com`,
  changeOrigin: true,
  pathRewrite: {
    '^/api/auth-proxy': '/__/auth',
  },
});

const handler: NextApiHandler = (req: NextApiRequest, res: NextApiResponse) => {
  return proxy(req, res, (result) => {
    if (result instanceof Error) {
      throw result;
    }
    return result;
  });
};

export default handler;

