import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { apolloClient } from "lib/apollo";
import { SNAPSHOT_GET_PROPOSALS } from "lib/queries";
import { Proposals } from "types/snapshot";
import Vote from "screens/Vote";
import type { VoteProps } from "screens/Vote";
import { ParsedUrlQuery } from "querystring";
import { WHITELISTED_STOREFRONTS } from "utils/storefront";

const VotePage: NextPage<VoteProps> = (props) => {
  return <Vote proposals={props.proposals} />;
};

interface Params extends ParsedUrlQuery {
  uid: string;
}

export const getStaticProps: GetStaticProps<VoteProps, Params> = async (
  context
) => {
  const { uid } = context.params!;

  const { data: activeProposals } = await apolloClient.query<
    { proposals: Proposals[] | [] },
    { spaceIn: string; state: string }
  >({
    query: SNAPSHOT_GET_PROPOSALS,
    variables: {
      spaceIn: uid,
      state: "active",
    },
  });

  return {
    props: {
      proposals: activeProposals.proposals,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = WHITELISTED_STOREFRONTS.map((uid) => {
    return { params: { uid } };
  });

  return {
    paths,
    fallback: false,
  };
};

export default VotePage;