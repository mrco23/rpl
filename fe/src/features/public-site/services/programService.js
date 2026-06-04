import ResourceService from "../../../services/resourceService.js";

class ProgramService extends ResourceService {
  constructor() {
    super("/program-unggulan/public");
  }
}

const service = new ProgramService();

export const getPublicPrograms = () => service.list();

const programService = { getPublicPrograms };
export default programService;
