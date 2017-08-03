package org.saltframework.boot.config;

import org.saltframework.boot.Salt;
import org.saltframework.security.handlers.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.util.StringUtils;

/**
 * @author Seok Kyun. Choi. 최석균 (Syaku)
 * @site http://syaku.tistory.com
 * @since 16. 5. 30.
*/
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled=true)
public class SecurityConfiguration {

	@Configuration
	public static class SecurityConfigurationAdapter extends WebSecurityConfigurerAdapter {
		private Salt salt;

		public void setSalt(@Autowired Salt salt) {
			this.salt = salt;
		}

		@Autowired
		public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
			auth
					.inMemoryAuthentication()
					.withUser("user").password("1234").roles("USER");
		}

		@Override
		public void configure(WebSecurity web) throws Exception {
			for (String resourceHandler : StringUtils.delimitedListToStringArray(salt.getString("securityResourceHandlersIgnored"), ",")) {
				web.ignoring().antMatchers(resourceHandler);
			}
		}

		@Override
		protected void configure(HttpSecurity http) throws Exception {

			String defaultTargetUrl = salt.getString("securityDefaultTargetUrl");
			// 리다이렉트에 사용될 직접 입력한 url 값을 저장된 파라메테명.
			String targetUrlParameter = salt.getString("securityTargetUrlParameter");
			boolean alwaysUseDefaultTargetUrl = salt.getBoolean
					("securityAlwaysUseDefaultTargetUrl");
			// 헤더의 referer 값 사용여부
			boolean useReferer = salt.getBoolean("securityUseReferer");

			String errorPageUrl = salt.getString("securityErrorPageUrl");

			String loginUrl = salt.getString("securityLoginUrl");
			String usernameParameter = salt.getString("securityUsernameParameter");
			String passwordParameter = salt.getString("securityPasswordParameter");
			String loginProcessingUrl = salt.getString("securityLoginProcessingUrl");
			String logoutUrl = salt.getString("securityLogoutUrl");
			String logoutProcessingUrl = salt.getString("securityLogoutProcessingUrl");
			String[] cleanCookies = StringUtils.delimitedListToStringArray(salt.getString("securityCleanCookies"), ",");
			String rememberMeCookieName = salt.getString("securityRememberMeCookieName");

			UnauthorizedAccess unauthorizedAccessHandler = new UnauthorizedAccess(loginUrl);

			LoginSuccess loginSuccessHandler = new LoginSuccess();
			loginSuccessHandler.setTargetUrlParameter(targetUrlParameter);
			loginSuccessHandler.setAlwaysUseDefaultTargetUrl(alwaysUseDefaultTargetUrl);
			loginSuccessHandler.setDefaultTargetUrl(defaultTargetUrl);
			loginSuccessHandler.setUseReferer(useReferer);

			LogoutSuccess logoutSuccessHandler = new LogoutSuccess();
			logoutSuccessHandler.setAlwaysUseDefaultTargetUrl(alwaysUseDefaultTargetUrl);
			logoutSuccessHandler.setDefaultTargetUrl(defaultTargetUrl);
			logoutSuccessHandler.setTargetUrlParameter(targetUrlParameter);

			LoginFailure loginFailureHandler = new LoginFailure();
			loginFailureHandler.setDefaultFailureUrl(defaultTargetUrl);

			AccessFailure accessFailureHandler = new AccessFailure(loginUrl, errorPageUrl);
			accessFailureHandler.setRedirect(salt.getBoolean("securityAccessFailureRedirect"));

			http
					.sessionManagement()
					.sessionCreationPolicy(SessionCreationPolicy.valueOf(salt.getString("securitySessionCreationPolicy")))

					.and()
					.formLogin()
					.usernameParameter(usernameParameter)
					.passwordParameter(passwordParameter)
					.loginPage(loginUrl).permitAll()
					.loginProcessingUrl(loginProcessingUrl).permitAll()
					.failureHandler(loginFailureHandler)
					.successHandler(loginSuccessHandler)

					.and()
					.logout()
					// 로그아웃할때 세션을 제거한다.
					.invalidateHttpSession(salt.getBoolean("securityInvalidateHttpSession"))
					.logoutUrl(logoutUrl)
					.logoutSuccessUrl(logoutProcessingUrl)
					.logoutSuccessHandler(logoutSuccessHandler)
					.deleteCookies(cleanCookies)

					.and().exceptionHandling().authenticationEntryPoint(unauthorizedAccessHandler)
					.and().exceptionHandling().accessDeniedHandler(accessFailureHandler)

					.and()
					.rememberMe()
					.key(rememberMeCookieName)

					.and()
					.csrf()
					.csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
					.and()
					.authorizeRequests()
					.and().httpBasic();
		}
	}

}
