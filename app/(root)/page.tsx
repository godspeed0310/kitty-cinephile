import { DEFAULT_FETCH_LIMIT } from "@/constants/trpc";
import { HydrateClient, prefetch, trpc } from "@/trpc/server";
import HomeView from "@/views/HomeView";

export const revalidate = 3600;

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
