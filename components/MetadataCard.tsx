import MetadataContent from "@/components/MetadataContent";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { BlogMetadata } from "@/types/BlogMetadata";
import { ExternalLink } from "lucide-react";

type Props = {
  metadata: BlogMetadata;
  mediaType: "movie" | "tv";
};

const MetadataCard = ({ metadata, mediaType }: Props) => {
  const formattedRelease = formatDate(metadata.release_date);
  const formattedRuntime = `${metadata.runtime} minutes`;
  const formattedRating = `${metadata.rating.toFixed(1)} / 10`;
  const directors = metadata.directors?.join(", ") || "";
  const cast = metadata.cast?.join(", ") || "";
  const producers = metadata.producers?.join(", ") || "";
  const creators = metadata.creators?.join(", ") || "";
  const writers = metadata.writers?.join(", ") || "";
  const genres = metadata.genres.join(", ");
  const tmdbUrl = `https://www.themoviedb.org/${mediaType}/${metadata.external_id}`;

  return (
    <Card className="my-3">
      <CardHeader className="gap-1">
        <CardTitle>Metadata</CardTitle>
        <CardDescription>
          <a
            className="flex items-center gap-1"
            href={tmdbUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by The Movie Database (tMDB)
            <ExternalLink className="size-3" />
          </a>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <MetadataContent label="Title" value={metadata.title} />
        <MetadataContent label="Overview" value={metadata.overview} />
        <MetadataContent label="Release Date" value={formattedRelease} />
        <MetadataContent label="Runtime" value={formattedRuntime} />
        <MetadataContent label="External Rating" value={formattedRating} />
        {metadata.creators && metadata.creators.length > 0 && (
          <MetadataContent label="Creators" value={creators} />
        )}
        {metadata.directors && metadata.directors.length > 0 && (
          <MetadataContent label="Directors" value={directors} />
        )}
        {metadata.writers && metadata.writers.length > 0 && (
          <MetadataContent label="Writers" value={writers} />
        )}
        {metadata.producers && metadata.producers.length > 0 && (
          <MetadataContent label="Producers" value={producers} />
        )}
        {metadata.cast && metadata.cast.length > 0 && (
          <MetadataContent label="Cast" value={cast} />
        )}
        <MetadataContent label="Genres" value={genres} />
      </CardContent>
    </Card>
  );
};

export default MetadataCard;
