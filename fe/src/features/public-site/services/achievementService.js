import ResourceService from "../../../services/resourceService.js";

class AchievementService extends ResourceService {
  constructor() {
    super("/prestasi");
  }
}

const service = new AchievementService();

export const getPublicAchievements = () => service.list();

const achievementService = { getPublicAchievements };
export default achievementService;
