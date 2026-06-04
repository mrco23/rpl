import ResourceService from "../../../services/resourceService.js";

class NewsService extends ResourceService {
  constructor() {
    super("/berita");
  }
}

const service = new NewsService();

export const getAllNews = (params) => service.list(params);
export const getNewsDetail = (id) => service.detail(id);

const newsService = { getAllNews, getNewsDetail };
export default newsService;
