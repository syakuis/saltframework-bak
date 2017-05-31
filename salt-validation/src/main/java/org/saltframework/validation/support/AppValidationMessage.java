package org.saltframework.validation.support;

import org.saltframework.validation.ValidationMessage;
import org.springframework.context.support.MessageSourceAccessor;
import org.springframework.validation.FieldError;

/**
 * 프로젝트에 맞는 메세지를 출력하기 위해 {@link ValidationMessage} 의 구현체를 작성한다.
 *
 * @author Seok Kyun. Choi. 최석균 (Syaku)
 * @site http://syaku.tistory.com
 * @since 2017. 5. 16.
 */
	public class AppValidationMessage implements ValidationMessage {
	private final MessageSourceAccessor messageSourceAccessor;

	public AppValidationMessage(MessageSourceAccessor messageSourceAccessor) {
		this.messageSourceAccessor = messageSourceAccessor;
	}

	@Override
	public String getFieldName(FieldError fieldError) {
		return messageSourceAccessor.getMessage("text.field." + fieldError.getField(), fieldError.getField());
	}

	@Override
	public String getBindingFailure(FieldError fieldError) {
		return messageSourceAccessor.getMessage("text.valid.Invalid", fieldError.getDefaultMessage());
	}
}
