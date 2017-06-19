package org.saltframework.security.handlers;

import org.saltframework.core.handlers.StatusCode;
import org.saltframework.core.handlers.SuccessHandler;
import org.saltframework.util.http.RequestResult;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 로그인 실패할 경우 호출되는 헨들러
 * @author Seok Kyun. Choi. 최석균 (Syaku)
 * @site http://syaku.tistory.com
 * @since 16. 5. 30.
 *
 */
public class LoginFailureHandler extends SimpleUrlAuthenticationFailureHandler {
	public LoginFailureHandler() {}

	public LoginFailureHandler(String defaultFailureUrl) {
		super(defaultFailureUrl);
	}

	@Override
	public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {

		if(RequestResult.isAjax(request)) {
			new ResponseContent(response, new SuccessHandler(exception.getMessage(), true, StatusCode.LoginFailure));
		} else {
			super.onAuthenticationFailure(request, response, exception);
		}
	}
}