import type { NextApiRequest, NextApiResponse } from "next";
import { CosmWasmClient } from "@cosmjs/cosmwasm-stargate";

/**
 * Fetches the asset details from the Osmosis Market module
 * @param denom The asset denom
 * @param client The CosmWasmClient instance
 * @param contractAddress The Osmosis Market module contract address
 * @returns The asset details
 * */
const fetchAssetDetails = async (
  denom: string,
  client: any,
  contractAddress: string
) => {
  return await client.queryContractSmart(contractAddress, {
    market: {
      denom: `${denom}`,
    },
  });
};

/** The API handler */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const CONTRACT_ADDRESS =
    "osmo1t0dl6r27phqetfu0geaxrng0u9zn8qgrdwztapt5xr32adtwptaq6vwg36";

  const RPC_ENDPOINT =
    "https://testnet-osmosis-node.marsprotocol.io/XF32UOOU55CX/osmosis-rpc-front/";

  try {
    const client = await CosmWasmClient.connect(RPC_ENDPOINT);

    const assets = [
      "uosmo",
      "ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2",
      "ibc/46B44899322F3CD854D2D46DEEF881958467CDD4B3B10086DA49296BBED94BED",
    ];

    const resp = await Promise.all(
      assets.map(
        async (asset) =>
          await fetchAssetDetails(asset, client, CONTRACT_ADDRESS)
      )
    );

    res.status(200).json(resp);
  } catch (error) {
    res.status(500).json({ error });
  }
}
