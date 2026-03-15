import { getPublicProfile } from "./profileService.js";
import { createContentService } from "./contentService.js";

const extracurricularService = createContentService("extracurriculars");
const newsService = createContentService("news");
const achievementService = createContentService("achievements");

export const getLandingData = async () => {
  const [profile, achievements, news, extracurriculars] = await Promise.all([
    getPublicProfile(),
    achievementService.getPublicList(),
    newsService.getPublicList(),
    extracurricularService.getPublicList(),
  ]);

  return { profile, achievements, news, extracurriculars };
};

export const extracurricularApi = extracurricularService;
export const newsApi = newsService;
export const achievementApi = achievementService;
