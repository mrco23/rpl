import ResourceService from "../../../services/resourceService.js";

class ExtracurricularService extends ResourceService {
  constructor() {
    super("/ekstrakurikuler");
  }
}

const service = new ExtracurricularService();

export const getEkstrakurikuler = () => service.list();

const extracurricularService = { getEkstrakurikuler };
export default extracurricularService;
