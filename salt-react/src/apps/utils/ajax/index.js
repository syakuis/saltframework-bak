/**
 * @date 2017-02-08 15:35:40
 * @author Seok Kyun. Choi. 최석균 (Syaku)
 * @site http://syaku.tistory.com
 */
import axios from 'axios';
import Qs from 'qs';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const ajaxProps = {
  config: {
    baseURL: API_SERVER_PATH,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      // Authorization: `Basic ${btoa('admin:1234')}`,
    },
    paramsSerializer: params => Qs.stringify(params, { arrayFormat: 'repeat' }),
  },
};

let count = 0;

class AjaxInstance {
  constructor(config) {
    this.config = config ? Object.assign({ ...ajaxProps.config }, config) : ajaxProps.config;
    this.instance = axios.create(this.config);

    this.instance.interceptors.request.use((c) => {
      if (count === 0) {
        NProgress.start();
      }
      count += 1;
      return c;
    });

    this.instance.interceptors.response.use((c) => {
      count -= 1;
      if (count === 0) {
        NProgress.done();
      }
      return c;
    });
  }

  getInstance() {
    return this.instance;
  }
}

const ajax = {
  setDefaultConfig: (config) => {
    ajaxProps.config = Object.assign({}, ajaxProps.config, config);
  },
  instance: config => new AjaxInstance(config).getInstance(),
};

export default ajax;
