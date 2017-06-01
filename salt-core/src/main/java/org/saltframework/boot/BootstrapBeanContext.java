package org.saltframework.boot;

import org.saltframework.beans.factory.config.ConfigurePropertiesConfigurer;
import org.springframework.context.annotation.*;

/**
 * @author Seok Kyun. Choi. 최석균 (Syaku)
 * @site http://syaku.tistory.com
 * @since 2017. 4. 13.
 */
@Configuration
@EnableAspectJAutoProxy
@ComponentScan(
		basePackages = "org.saltframework.boot.config",
		useDefaultFilters = false,
		includeFilters = @ComponentScan.Filter(type = FilterType.ANNOTATION, classes = Configuration.class)
)
public class BootstrapBeanContext {
	@Bean
	public static ConfigurePropertiesConfigurer configurePropertiesConfigurer() {
		return new ConfigurePropertiesConfigurer();
	}
}
