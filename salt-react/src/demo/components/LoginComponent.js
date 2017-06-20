import React from 'react';
import Cookie from 'js-cookie';
import Toastr from 'modern-toastr';
import Ajax from 'Utils/ajax';

const propTypes = { };
const defaultProps = { };

class LoginComponent extends React.Component {
  constructor(props) {
    super(props);

    this.ajax = Ajax.instance();

    this.update = this.update.bind(this);
    this.login = this.login.bind(this);

    this.state = {
      userId: null,
      password: null,
    };
  }

  update(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }

  login(e) {
    e.preventDefault();

    this.ajax({
      method: 'post',
      url: '/member/signin',
      params: this.state,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then((response) => {
      const { message, error } = response.data;
      if (error) {
        Toastr.error(message);
      } else {
        const hash = btoa(`${this.state.userId}:${this.state.password}`);
        Cookie.set('Authorization', `Basic ${hash}`);
        Cookie.set('isAuthentication', true);
      }
    });
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <div>
            <form className="form-login">
              <h2 className="form-login-heading"><i className="fa fa-sign-in" /> 로그인</h2>
              <input type="text" className="form-control" placeholder="아이디" name="userId" onChange={this.update} defaultValue={this.state.userId} />
              <input type="password" className="form-control" placeholder="비밀번호" name="password" onChange={this.update} defaultValue={this.state.password} />
              <div className="checkbox">
                <label htmlFor="remember_user_id" className="checkbox-inline">
                  <input type="checkbox" id="remember_user_id" value="Y" /> 아이디 저장
                </label>
                <label htmlFor="is_email" className="checkbox-inline">
                  <input type="checkbox" id="is_email" name="is_email" value="Y" /> 자동 로그인
                </label>
              </div>
              <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.login}>로그인</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

LoginComponent.propTypes = propTypes;
LoginComponent.defaultProps = defaultProps;

export default LoginComponent;
