import axios from "axios";
import { courseLevel } from "@/constants/course";

const API_KEY = "AIzaSyBrLWexQkfQX18t-T1Xio_1CvKjc0PQ1Ag";
// const PLAYLIST_ID = "PL4cUxeGkcC9i9Ae2D9Ee1RvylH38dKuET";
const MAX_RESULTS = 50;

// Type definitions
interface YouTubeVideo {
  //   id: number;
  //   level: (typeof courseLevel)[keyof typeof courseLevel];
  //   content: {
  title: string;
  description: string;
  link: string;
}
// }

interface YouTubeApiResponse {
  items: Array<{
    snippet: {
      title: string;
      description?: string;
      resourceId: { videoId: string };
    };
  }>;
  nextPageToken?: string;
}

async function fetchPlaylistItems(
  playlistId: string,
  pageToken = ""
): Promise<YouTubeApiResponse | null> {
  const url = "https://www.googleapis.com/youtube/v3/playlistItems";
  const params = {
    part: "snippet",
    playlistId,
    maxResults: MAX_RESULTS,
    pageToken,
    key: API_KEY,
  };

  try {
    const response = await axios.get<YouTubeApiResponse>(url, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching playlist items:", error);
    return null;
  }
}

async function getAllPlaylistVideos(
  PLAYLIST_ID: string
): Promise<YouTubeVideo[]> {
  let videos: YouTubeVideo[] = [];
  let pageToken = "";
  console.log({ PLAYLIST_ID });

  do {
    const data = await fetchPlaylistItems(PLAYLIST_ID, pageToken);
    if (data && data.items) {
      const formattedVideos: YouTubeVideo[] = data.items
        // .slice(0, 4)
        .map((item, index) => ({
          // id: videos.length + index, // Ensure unique IDs across pages
          // level: courseLevel.BEGINNER,
          // content: {
          title: item.snippet.title,
          description:
            item.snippet.description?.split(".")[0] || "No Description",
          link: `${item.snippet.resourceId.videoId}`,
          // },
        }));
      videos = [...videos, ...formattedVideos];
      pageToken = data.nextPageToken || "";
    } else {
      break;
    }
  } while (pageToken);

  return videos;
}

// Usage
// getAllPlaylistVideos().then((videos) => {
//   console.log(JSON.stringify(videos, null, 2));
// });
export { getAllPlaylistVideos };
