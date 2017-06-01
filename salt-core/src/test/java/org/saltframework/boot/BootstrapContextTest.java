package org.saltframework.boot;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import java.lang.reflect.Field;
import java.util.Iterator;
import java.util.Properties;

/**
 * @author Seok Kyun. Choi. 최석균 (Syaku)
 * @site http://syaku.tistory.com
 * @since 2017. 6. 1.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@ContextConfiguration(classes = BootstrapBeanContext.class)
public class BootstrapContextTest {
	private static final Logger logger = LoggerFactory.getLogger(BootstrapContextTest.class);

	private Salt salt;

	@Autowired
	public void setSalt(Salt salt) {
		this.salt = salt;
	}

	@Test
	public void test() throws Exception {
		Class<?> clazz = salt.getClass();

		Field[] fields = clazz.getDeclaredFields();

		for (Field field : fields) {
			field.setAccessible(true);
			logger.debug(">< >< Salt : {} = {}", field.getName(), field.get(salt));
		}

		Properties properties = salt.getProperties();

		Iterator<String> iterator = properties.stringPropertyNames().iterator();
		while (iterator.hasNext()) {
			String name = iterator.next();
			logger.debug(">< >< properties : {} = {}", name, properties.getProperty(name));
		}
	}
}