package org.saltframework.core.boot.servlet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.validation.Validator;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;

/**
 * @author Seok Kyun. Choi. 최석균 (Syaku)
 * @site http://syaku.tistory.com
 * @since 2017. 4. 13.
 */
@Configuration
@EnableWebMvc
public class ValidationServletConfiguration extends ServletConfiguration {
	private Validator validator;

	@Autowired
	public void setValidator(Validator validator) {
		this.validator = validator;
	}

	/**
	 <mvc:annotation-driven validator="validator"/>
	 * @return
	 */
	@Override
	public Validator getValidator() {
		return validator;
	}

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry.addResourceHandler("/resources/**").addResourceLocations("/resources/").setCachePeriod(0);
	}
}
