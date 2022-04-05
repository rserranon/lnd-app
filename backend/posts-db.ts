import { EventEmitter } from 'events';
import { existsSync, promises as fs } from 'fs';
// import { Post } from '../src/shared/types';

const DB_FILE = 'db.json';

export interface LndNode {
  token: string;
  host: string;
  cert: string;
  macaroon: string;
  pubkey: string;
}

export interface DbData {
//   posts: Post[];
  nodes: LndNode[];
}

/**
 * The list of events emitted by the PostsDb
 */
export const PostEvents = {
  updated: 'post-updated',
};

/**
 * A very simple file-based DB to store the posts
 */
class PostsDb extends EventEmitter {
  // in-memory database
  private _data: DbData = {
    // posts: [],
    nodes: [],
  };

  //
  // Nodes
  //

  getAllNodes() {
    return this._data.nodes;
  }

  getNodeByPubkey(pubkey: string) {
    return this.getAllNodes().find(node => node.pubkey === pubkey);
  }

  getNodeByToken(token: string) {
    return this.getAllNodes().find(node => node.token === token);
  }

  async addNode(node: LndNode) {
    this._data.nodes = [
      // add new node
      node,
      // exclude existing nodes with the same server
      ...this._data.nodes.filter(n => n.host !== node.host),
    ];
    await this.persist();
  }

  //
  // HACK! Persist data to a JSON file to keep it when the server restarts.
  // Do not do this in a production app. This is just for convenience when
  // developing this sample app locally.
  //

  async persist() {
    await fs.writeFile(DB_FILE, JSON.stringify(this._data, null, 2));
  }

  async restore() {
    if (!existsSync(DB_FILE)) return;

    const contents = await fs.readFile(DB_FILE);
    if (contents) {
      this._data = JSON.parse(contents.toString());
      if (!this._data.nodes) this._data.nodes = [];
    //   console.log(`Loaded ${this._data.posts.length} posts`);
    }
  }
}

export default new PostsDb();
