import { DEFAULT_REVALIDATE_SECONDS } from "@/constants";
import { DEFAULT_FETCH_LIMIT } from "@/constants/trpc";
import { HydrateClient, prefetch, trpc } from "@/trpc/server";
import HomeView from "@/views/HomeView";

export const revalidate = DEFAULT_REVALIDATE_SECONDS;

const Home = async () => {
  void prefetch(
    trpc.blogs.getAll.infiniteQueryOptions(
      { limit: DEFAULT_FETCH_LIMIT },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
    )
  );

  return (
    <HydrateClient>
      <HomeView />
    </HydrateClient>
  );
};

export default Home;
