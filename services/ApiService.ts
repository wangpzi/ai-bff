import { IApi } from '@interfaces/IApi';
import { IData } from '@interfaces/IData';


class ApiService implements IApi {
  getInfo() {
    return new Promise<IData>((resolve) => {
      resolve({
        item: 'test',
        result: [1, 2, 3, 'a', 'b', 'c']
      });
    });
  }
}

export default ApiService;