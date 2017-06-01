package org.saltframework.apps.validation;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.saltframework.boot.BootstrapBeanContext;
import org.saltframework.boot.servlet.ServletApplicationContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.support.MessageSourceAccessor;
import org.springframework.core.env.Environment;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

/**
 * @author Seok Kyun. Choi. 최석균 (Syaku)
 * @site http://syaku.tistory.com
 * @since 2017. 6. 1.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@ContextConfiguration(classes = {
		BootstrapBeanContext.class,
		ServletApplicationContext.class
})
@PropertySource("classpath:org/saltframework/apps/validation/i18n/message.properties")
public class ValidationMessageSourceTest {
	@Autowired
	private MessageSourceAccessor messageSourceAccessor;

	@Autowired
	private Environment environment;

	@Test
	public void test() {
		System.out.println(messageSourceAccessor.getMessage("org.saltframework.validation"));
		System.out.println(environment.getProperty("org.saltframework.validation"));
	}
}
