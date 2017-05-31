package org.saltframework.validation.web;

import org.saltframework.core.handlers.StatusCode;
import org.saltframework.core.handlers.SuccessHandler;
import org.saltframework.validation.ErrorResult;
import org.saltframework.validation.ValidationException;
import org.saltframework.validation.ValidationResult;
import org.saltframework.validation.support.AppValidationMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.MessageSourceAccessor;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * @author Seok Kyun. Choi. 최석균 (Syaku)
 * @site http://syaku.tistory.com
 * @since 2017. 5. 16.
 */
@ControllerAdvice
public class ValidationControllerAdvice {
	private MessageSourceAccessor messageSource;

	@Autowired
	public void setMessageSource(MessageSourceAccessor messageSource) {
		this.messageSource = messageSource;
	}

	private SuccessHandler<List<ErrorResult>> validationSuccessHandler(BindingResult bindingResult) {
		return new SuccessHandler(
				messageSource.getMessage("org.saltframework.validation"),
				true, StatusCode.FormValidation,
				new ValidationResult(
						bindingResult,
						new AppValidationMessage(messageSource)
				).getFieldErrors());
	}

	@ExceptionHandler(MethodArgumentNotValidException.class)
	@ResponseBody
	public SuccessHandler<List<ErrorResult>> validationException(MethodArgumentNotValidException e) {
		return validationSuccessHandler(e.getBindingResult());
	}

	@ExceptionHandler(ValidationException.class)
	@ResponseBody
	public SuccessHandler<List<ErrorResult>> validationException(ValidationException e) {
		return validationSuccessHandler(e.getBindingResult());
	}
}
