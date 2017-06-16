import React from 'react';

const propTypes = { };
const defaultProps = { };

class Container extends React.Component {
  constructor(props) {
    super(props);

    this.login = this.login.bind(this);
  }

  login(e) {
    e.prevnetDefault();
    console.log(this.props);
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <div>
            <form className="form-login">
              <h2 className="form-login-heading"><i className="fa fa-sign-in" /> 로그인</h2>
              <input type="text" className="form-control" placeholder="아이디" id="user_id" name="user_id" />
              <input type="password" className="form-control" placeholder="비밀번호" id="password" name="password" />
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

Container.propTypes = propTypes;
Container.defaultProps = defaultProps;

export default Container;
