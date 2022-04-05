import { Request, Response } from 'express';
import nodeManager from './node-manager';
import db from './posts-db';

/**
 * POST /api/connect
 */
export const connect = async (req: Request, res: Response) => {
  const { host, cert, macaroon } = req.body;
  console.log(`connect: ${host}`)
  const { token, pubkey } = await nodeManager.connect(host, cert, macaroon);
  await db.addNode({ host, cert, macaroon, token, pubkey });
  res.send({ token });
}

/**
 * GET /api/info
 */
//  export const getInfo = async (req: Request, res: Response) => {
//     const { token } = req.body;
//     if (!token) throw new Error('Your node is not connected!');
//     // find the node that's making the request
//     const node = db.getNodeByToken(token);
//     if (!node) throw new Error('Node not found with this token');
  
//     // get the node's pubkey and alias
//     const rpc = nodeManager.getRpc(node.token);
//     const { alias, identityPubkey: pubkey } = await rpc.getInfo();
//     const { balance } = await rpc.channelBalance();
//     res.send({ alias, balance, pubkey });
//   };