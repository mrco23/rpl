import { getPublicProfile } from "./profileService.js";
import { createContentService } from "./contentService.js";

// Endpoint diperbaiki menyesuaikan route backend (bahasa Indonesia)
const extracurricularService = createContentService("ekstrakurikuler");
const newsService = createContentService("berita");
const achievementService = createContentService("prestasi");
const facilityService = createContentService("fasilitas");
const announcementService = createContentService("pengumuman");
const programService = createContentService("program-unggulan");

export const getLandingData = async () => {
  const [profile, achievements, news, extracurriculars, facilities] = await Promise.all([
    getPublicProfile(),
    achievementService.getPublicList().catch(() => []),
    newsService.getPublicList().catch(() => []),
    extracurricularService.getPublicList().catch(() => []),
    facilityService.getPublicList().catch(() => []),
  ]);

  return { profile, achievements, news, extracurriculars, facilities };
};

export const extracurricularApi = extracurricularService;
export const newsApi = newsService;
export const achievementApi = achievementService;
export const facilityApi = facilityService;
export const announcementApi = announcementService;
export const programApi = programService;
