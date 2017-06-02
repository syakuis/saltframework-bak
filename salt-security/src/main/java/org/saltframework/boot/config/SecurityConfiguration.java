package org.saltframework.boot.config;

import org.saltframework.boot.Salt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

/**
 * @author Seok Kyun. Choi. 최석균 (Syaku)
 * @site http://syaku.tistory.com
 * @since 16. 5. 30.
*/
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled=true)
public class SecurityConfiguration {
	private final Salt salt;

	public SecurityConfiguration(@Autowired Salt salt) {
		this.salt = salt;
	}

	@Configuration
	public static class SecurityConfigurationAdapter extends WebSecurityConfigurerAdapter {
		@Override
		public void configure(WebSecurity web) throws Exception {
			web.ignoring().antMatchers("/resources/**");
		}

		@Override
		protected void configure(HttpSecurity http) throws Exception {

			http
					.sessionManagement()

					.and()
					.formLogin()
					.loginPage(salt.getString("securityLoginUrl"))
					.usernameParameter(salt.getString("securityUsernameParameter"))
					.passwordParameter(salt.getString("securityPasswordParameter"))
					.loginProcessingUrl(salt.getString("securityLoginProcessingUrl")).permitAll()
					.and()
					.logout()
					.invalidateHttpSession(true)
					.logoutUrl(salt.getString("securityLogoutUrl"))
					.logoutSuccessUrl(salt.getString("securityLogoutProcessingUrl"))
					.deleteCookies(salt.getString("securitySessionIdCookieName"))

					.and()
					.rememberMe()
					.key(salt.getString("securityRememberMeCookieName"))

					.and()
					.csrf()
					.authorizeRequests();
		}
	}

}
