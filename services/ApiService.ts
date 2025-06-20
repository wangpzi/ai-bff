import { IApi } from '@interfaces/IApi';
import { IData } from '@interfaces/IData';


class ApiService implements IApi {
  getInfo() {
    return new Promise<IData>((resolve) => {
      resolve({
        item: '返回成功',
        result: [
          {
            name: "JavaScript",
            level: "三颗星"
          },
          ,
          {
            name: "react",
            level: "四颗星"
          },
          {
            name: "node",
            level: "五颗星"
          }
        ]
      });
    });
  }
}

export default ApiService;