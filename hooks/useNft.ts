import useSWR from "swr";
import { fetcher } from "lib/fetch";
import type { NFT } from "types/rarible";

const useNft = (assetId: string) => {
  const { data, error } = useSWR<NFT>(
    `https://api.rarible.org/v0.1/items/${assetId}`,
    fetcher
  );

  return {
    nft: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useNft;