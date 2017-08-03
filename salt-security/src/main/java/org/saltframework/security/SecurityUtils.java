package org.saltframework.security;

import javax.servlet.http.HttpServletRequest;

/**
 * @author Seok Kyun. Choi. 최석균 (Syaku)
 * @site http://syaku.tistory.com
 * @since 2017. 8. 3.
 */
public class SecurityUtils {

	/**
	 * ajax 의한 요청인지 Request Header 로 판단한다.
	 * @param request
	 * @return
	 */
	public static boolean isRequestAjax(HttpServletRequest request) {
		return (request != null && "XMLHttpRequest".equals(request.getHeader("X-Requested-With")));
	}
}
