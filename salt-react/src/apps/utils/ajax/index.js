/**
 * @date 2017-02-08 15:35:40
 * @author Seok Kyun. Choi. 최석균 (Syaku)
 * @site http://syaku.tistory.com
 */
import axios from 'axios';
import Qs from 'qs';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import Toast from 'modern-toastr';

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

class AjaxInstance {
  constructor(config) {
    this.config = config ? Object.assign({ ...ajaxProps.config }, config) : ajaxProps.config;
    this.instance = axios.create(this.config);

    this.count = 0;

    this.instance.interceptors.request.use((request) => {
      this.progress(true);
      return request;
    }, (error) => {
      this.progress(true);
      return Promise.reject(error);
    });

    this.instance.interceptors.response.use((response) => {
      this.progress(false);
      return response;
    }, (error) => {
      this.progress(false);
      return Promise.reject(error);
    });
  }

  getInstance() {
    return this.instance;
  }

  progress(go) {
    if (go) {
      if (this.count === 0) {
        NProgress.start();
      }
      this.count += 1;
    } else {
      this.count -= 1;
      if (this.count === 0) {
        NProgress.done();
      }
    }
  }
}

const ajax = {
  setDefaultConfig: (config) => {
    ajaxProps.config = Object.assign({}, ajaxProps.config, config);
  },
  instance: config => new AjaxInstance(config).getInstance(),

  responseErrorHandler(response, after, before) {
    const result = response.data;

    if (!result.error) return result;

    if (typeof before === 'function') {
      before(result);
    }

    const promise = new Promise((resolve) => {
      Toast.error(result.message);
      resolve();
    });

    promise.then(() => {
      if (typeof after === 'function') {
        after(result);
      }
    });

    return result;
  },
};

export default ajax;
