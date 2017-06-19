package org.saltframework.security.handlers;

import org.saltframework.core.handlers.StatusCode;
import org.saltframework.core.handlers.SuccessHandler;
import org.saltframework.util.http.RequestResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AbstractAuthenticationTargetUrlRequestHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 로그아웃 성공 후 호출되는 헨들러
 * @author Seok Kyun. Choi. 최석균 (Syaku)
 * @site http://syaku.tistory.com
 * @since 16. 5. 30.
 */
public class LogoutSuccessHandler extends AbstractAuthenticationTargetUrlRequestHandler implements org.springframework.security.web.authentication.logout.LogoutSuccessHandler {
	private static final Logger logger = LoggerFactory.getLogger(LogoutSuccessHandler.class);

	@Override
	public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

		if(RequestResult.isAjax(request)) {
			String targetUrl = determineTargetUrl(request, response);

			if (logger.isDebugEnabled()) {
				logger.debug("targetUrl: " + targetUrl);
				logger.debug("targetUrlParameter name: " + getTargetUrlParameter());
				logger.debug("targetUrlParameter value: " + request.getParameter(getTargetUrlParameter()));
			}

			new ResponseContent<>(response, new SuccessHandler<>(null, false, StatusCode
					.OK, targetUrl));
		} else {
			super.handle(request, response, authentication);
		}

	}
}