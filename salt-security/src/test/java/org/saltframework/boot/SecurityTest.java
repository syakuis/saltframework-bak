package org.saltframework.boot;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.saltframework.boot.servlet.ServletApplicationContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestBuilders;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import javax.servlet.Filter;

import static org.springframework.security.test.web.servlet.response.SecurityMockMvcResultMatchers.unauthenticated;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.redirectedUrl;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * @author Seok Kyun. Choi. 최석균 (Syaku)
 * @site http://syaku.tistory.com
 * @since 2017. 6. 5.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@ContextConfiguration(classes = {
		BootstrapBeanContext.class,
		ServletApplicationContext.class
})
public class SecurityTest {
	private static final String USERNAME = "user";
	private static final String PASSWORD = "1234";

	private MockMvc mockMvc;

	@Autowired
	private WebApplicationContext wac;

	@Autowired
	private Salt salt;

	@Autowired
	private Filter springSecurityFilterChain;

	@Before
	public void setUp() {
		mockMvc = MockMvcBuilders.webAppContextSetup(wac)
				.addFilters(springSecurityFilterChain)
				.build();
	}

	@Test
	public void authenticationFailed() throws Exception {
		mockMvc
				.perform(SecurityMockMvcRequestBuilders
						.formLogin(salt.getString("securityLoginProcessingUrl"))
						.userParameter(USERNAME)
						.passwordParam(PASSWORD)
						.user("notfound")
						.password("invalid")
				)
				.andExpect(status().isFound())
				.andExpect(redirectedUrl("/authenticate?error"))
				.andExpect(unauthenticated());
	}
}
