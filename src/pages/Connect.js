import React, { useCallback, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../store/Provider';

function Connect  () {
  const store = useStore();

  const [host, setHost] = useState('127.0.0.1:10005');
  const [cert, setCert] = useState('2d2d2d2d2d424547494e2043455254494649434154452d2d2d2d2d0a4d4949422f54434341614f674177494241674951516b39776b35524455474b46586f553866526653486a414b42676771686b6a4f50515144416a41764d5238770a485159445651514b45785a73626d5167595856306232646c626d56795958526c5a43426a5a584a304d517777436759445651514445774e69623249774868634e0a4d6a49774d7a417a4d4441784e7a4d335768634e4d6a4d774e4449344d4441784e7a4d33576a41764d523877485159445651514b45785a73626d5167595856300a6232646c626d56795958526c5a43426a5a584a304d517777436759445651514445774e69623249775754415442676371686b6a4f5051494242676771686b6a4f0a50514d4242774e43414151586c6e476f62486f712b312b5366437148424b553536636c714a34412b3955424171775a622f66744575674850364453714c554d6c0a2b506a50334272624d333779702b743155797472726a6b325574542f793743706f3447674d4947644d41344741315564447745422f77514541774943704441540a42674e56485355454444414b4267677242674546425163444154415042674e5648524d4241663845425441444151482f4d47554741315564455152654d4679430a41324a76596f494a6247396a5957786f62334e3067674e6962324b4344484276624746794c57347a4c574a76596f4945645735706549494b64573570654842680a5932746c64494948596e566d59323975626f63456677414141596351414141414141414141414141414141414141414141596345724249414244414b426767710a686b6a4f5051514441674e4941444246416945416a6b4132676756594c4f7233625a79554478786733756c74744b325556552f7458412b382f714159424463430a49475532726c666861386a69687a495a384b78644962425a796e632f4a377a327256524a386a68506d6d73520a2d2d2d2d2d454e442043455254494649434154452d2d2d2d2d0a');
  const [macaroon, setMacaroon] = useState('0201036c6e640267030a1086ec0ac3ba1570e9b844492b4700f63a1201301a0c0a04696e666f1204726561641a170a08696e766f69636573120472656164120577726974651a160a076d657373616765120472656164120577726974651a100a086f6666636861696e12047265616400000620d1aff9e52658bca415118f89dca9a70065027f351d92b94515e5ed4cd0ad50c4');

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      store.connectToLnd(host, cert, macaroon);
    },
    [host, cert, macaroon, store],
  )

  const onCancel = (event) => {
    event.preventDefault()
    alert("Do you really want to cancel an go to Home?")
    store.gotoHome()
  }

  return (
    <form onSubmit={handleSubmit}>
        <h2>Connect Node</h2>
          <div className='contact-form'>
            <label>LND Host</label>
            <input
              className='inputs'
              type="text"
              required
              value={host}
              placeholder="127.0.0.1:10001"
              onChange={e => setHost(e.target.value)}
            />
            <label>TLS Certificate</label>
            <textarea
              className='inputs'
              required
              rows={9}
              name="certificate"
              value={cert}
              placeholder="HEX encoded. Ex: 4942416749514259476c4c7a577a6e6f4550564158..."
              onChange={e => setCert(e.target.value)}
            />
            <label>Macaroon</label>
            <textarea
              className='inputs'
              required
              rows={3}
              name="macaroon"
              value={macaroon}
              placeholder="HEX encoded. Ex: 0201036c6e64024f030a10e9366194c29d06acac69..."
              onChange={e => setMacaroon(e.target.value)}
            />
            <p className="text-muted">
              Open a Terminal and enter{' '}
              <code className='code'>
                lncli bakemacaroon info:read offchain:read invoices:read invoices:write
                message:read message:write
              </code>{' '}
              to bake a macaroon with only limited access to get node info, create
              invoices, and sign/verify messages.
            </p>
            <div className='buttons'>
              <button className="button-cancel" onClick={event => onCancel(event)}>
                Cancel
              </button>
              <button className="button-submit" type="submit">
                Submit
              </button>
            </div>
          </div>    
    </form>
  );
};

export default observer(Connect);
