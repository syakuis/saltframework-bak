package org.saltframework.security.handlers;


import org.saltframework.core.handlers.SuccessHandler;
import org.saltframework.util.http.RequestResult;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.security.web.savedrequest.HttpSessionRequestCache;
import org.springframework.security.web.savedrequest.SavedRequest;
import org.springframework.util.StringUtils;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 * @author Seok Kyun. Choi. 최석균 (Syaku)
 * @site http://syaku.tistory.com
 * @since 2016. 9. 21.
 */
public class LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
	private String getRedirectUrl(HttpServletRequest request, HttpServletResponse response) {
		HttpSessionRequestCache requestCache = new HttpSessionRequestCache();
		SavedRequest savedRequest = requestCache.getRequest(request, response);

		if (savedRequest == null) {
			return determineTargetUrl(request, response);
		}

		String targetUrlParameter = getTargetUrlParameter();
		if (isAlwaysUseDefaultTargetUrl() || (targetUrlParameter != null && StringUtils.hasText(request.getParameter(targetUrlParameter)))) {
			requestCache.removeRequest(request, response);

			return determineTargetUrl(request, response);
		}

		clearAuthenticationAttributes(request);
		return savedRequest.getRedirectUrl();
	}

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
		if(RequestResult.isAjax(request)) {
			String targetUrlParameter = getTargetUrlParameter();
			String redirectUrl = getRedirectUrl(request, response);

			SuccessHandler<Map<String, Object>> success = new SuccessHandler();

			Map<String, Object> data = new HashMap<>();
			data.put("principal", authentication.getPrincipal());
			if (targetUrlParameter != null) {
				data.put(getTargetUrlParameter(), redirectUrl);
			}
			success.setContent(data);

			new ResponseContent<>(response, success);
		} else {
			super.onAuthenticationSuccess(request, response, authentication);
		}
	}
}