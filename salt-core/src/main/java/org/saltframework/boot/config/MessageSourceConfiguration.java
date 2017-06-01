package org.saltframework.boot.config;

import org.saltframework.boot.Salt;
import org.saltframework.boot.config.support.MessageSourceMatchingPattern;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.DependsOn;
import org.springframework.context.support.MessageSourceAccessor;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.util.StringUtils;

import java.io.IOException;
import java.util.Arrays;

/**
 * @author Seok Kyun. Choi. 최석균 (Syaku)
 * @site http://syaku.tistory.com
 * @since 2017. 3. 31.
 */
@Configuration
public class MessageSourceConfiguration {
	private static final Logger logger = LoggerFactory.getLogger(MessageSourceConfiguration.class);
	private MessageSourceMatchingPattern messageSourceMatchingPattern = new MessageSourceMatchingPattern();
	private MessageSource messageSource;

	private String parentBasename =
			"classpath*:org/hibernate/validator/message.properties," +
			"classpath*:org/saltframework/i18n/message.properties," +
			"classpath*:org/saltframework/**/i18n/message.properties";

	private Salt salt;

	@Autowired
	public void setSalt(Salt salt) {
		this.salt = salt;
	}

	private ResourceBundleMessageSource getResourceBundleMessageSource(String basename, MessageSource parentMessageSource) {
		String[] basenames = StringUtils.commaDelimitedListToStringArray(basename);

		ResourceBundleMessageSource messageSource = new ResourceBundleMessageSource();
		messageSource.setCacheSeconds(salt.getInt("messageSourceCacheSeconds"));
		messageSource.setDefaultEncoding(salt.getCharset());
		if (parentMessageSource != null) {
			messageSource.setParentMessageSource(parentMessageSource);
		}
		try {
			String[] properties = messageSourceMatchingPattern.getResources(basenames);
			messageSource.setBasenames(properties);
			if (logger.isDebugEnabled()) {
				logger.debug(">< >< {}", Arrays.asList(properties));
			}
		} catch (IOException e) {
			logger.error(e.getMessage(), e);
		}

		return messageSource;
	}

	private ReloadableResourceBundleMessageSource getReloadableResourceBundleMessageSource(String basename, MessageSource parentMessageSource) {
		String[] basenames = StringUtils.commaDelimitedListToStringArray(basename);

		ReloadableResourceBundleMessageSource messageSource = new ReloadableResourceBundleMessageSource();
		messageSource.setCacheSeconds(salt.getInt("messageSourceCacheSeconds"));
		messageSource.setDefaultEncoding(salt.getCharset());
		messageSource.setConcurrentRefresh(salt.getBoolean("messageSourceConcurrentRefresh"));
		if (parentMessageSource != null) {
			messageSource.setParentMessageSource(parentMessageSource);
		}
		try {
			String[] properties = messageSourceMatchingPattern.getResources(basenames);
			messageSource.setBasenames(properties);
			if (logger.isDebugEnabled()) {
				logger.debug(">< >< {}", Arrays.asList(properties));
			}
		} catch (IOException e) {
			logger.error(e.getMessage(), e);
		}

		return messageSource;
	}

	private MessageSource getMessageSource() {
		if (salt.getBoolean("messageSourceReloadable")) {
			return getReloadableResourceBundleMessageSource(parentBasename,
					getReloadableResourceBundleMessageSource(salt.getString("messageSourceBasename"), null));
		}

		return getResourceBundleMessageSource(parentBasename,
				getResourceBundleMessageSource(salt.getString("messageSourceBasename"),null));
	}

	@Bean
	public MessageSource messageSource() {
		this.messageSource = getMessageSource();
		return this.messageSource;
	}

	@Bean
	@DependsOn("messageSource")
	public MessageSourceAccessor messageSourceAccessor() {
		return new MessageSourceAccessor(this.messageSource);
	}
}
