// サンプルデータ。実在の人物ではない。
import type { Artist } from "@/types/catalog";

export const artists: Artist[] = [
  {
    id: "aoi-kurata",
    name: "Aoi Kurata",
    nameJa: "倉田葵",
    basedIn: "Tokyo",
    bio: "Aoi Kurata is a photographer based in Tokyo, working mainly in black and white street photography. Her self-published zines focus on quiet, overlooked corners of the city. She has been self-publishing since 2019.",
    website: "https://aoikurata.example.com",
    instagram: "aoi.kurata.photo",
  },
  {
    id: "ren-hoshino",
    name: "Ren Hoshino",
    nameJa: "星野蓮",
    basedIn: "Osaka",
    bio: "Ren Hoshino documents harbor towns and night life across western Japan. Working mostly with medium format film, Hoshino's photobooks and zines have a slow, observational quality. Based in Osaka since 2015.",
    instagram: "ren.hoshino",
  },
  {
    id: "mio-takase",
    name: "Mio Takase",
    nameJa: "高瀬美緒",
    basedIn: "Fukuoka",
    bio: "Mio Takase is a photographer and bookmaker based in Fukuoka, focused on everyday life and portraiture. Her zines are hand-assembled in small batches and have been shown in independent bookstores across Japan.",
    website: "https://miotakase.example.com",
  },
];

export function getArtistById(id: string): Artist | undefined {
  return artists.find((a) => a.id === id);
}
