package org.saltframework.security.handlers;

import org.saltframework.core.handlers.StatusCode;
import org.saltframework.core.handlers.SuccessHandler;
import org.saltframework.security.SecurityUtils;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 인증(Consumer)된 사용자가 허가되지 않은 페이지에 접근할때 호출되는 헨들러.
 * @author Seok Kyun. Choi. 최석균 (Syaku)
 * @site http://syaku.tistory.com
 * @since 16. 5. 30.
 */
public class AccessFailure implements AccessDeniedHandler {
	private final String loginFormUrl;
	private final String errorPage;
	private boolean redirect = true;

	public AccessFailure(String loginFormUrl, String errorPage) {
		this.loginFormUrl = loginFormUrl;
		this.errorPage = errorPage;
	}

	/**
	 * 접근 실패시 리다이렉트로 오류 페이지 처리.
	 * @param redirect
	 */
	public void setRedirect(boolean redirect) {
		this.redirect = redirect;
	}

	@Override
	public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException exception) throws IOException, ServletException {
		if(SecurityUtils.isRequestAjax(request)) {
			new ResponseBody(response, new SuccessHandler<String>(exception.getMessage(), true, StatusCode.AccessDenied));
		} else {
			if (redirect) {
				response.sendRedirect(request.getContextPath() + errorPage);
			} else {
				request.setAttribute("loginFormUrl", loginFormUrl);
				request.getRequestDispatcher(request.getContextPath() + errorPage).forward(request, response);
			}
		}
	}
}
