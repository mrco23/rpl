import ResourceService from "../../../services/resourceService.js";

class FasilitasService extends ResourceService {
  constructor() {
    super("/fasilitas");
  }
}

const service = new FasilitasService();

export const getFasilitas = () => service.list();

const fasilitasService = { getFasilitas };
export default fasilitasService;
