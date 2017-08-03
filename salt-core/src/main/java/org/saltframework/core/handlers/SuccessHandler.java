package org.saltframework.core.handlers;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

/**
 * Controller 처리가 완료되었을 때 응답하기 위한 클래스
 *
 * @author Seok Kyun. Choi. 최석균 (Syaku)
 * @site http://syaku.tistory.com
 * @since 2016. 12. 16.
 */
@AllArgsConstructor
public class SuccessHandler<T> {
	@Getter
	private final String message;
	@Getter
	private final boolean error;
	@Getter
	private final Date date;
	@Getter
	private final StatusCode statusCode;
	@Getter @Setter
	private T content;

	public SuccessHandler() {
		this(null, false, StatusCode.OK);
	}

	public SuccessHandler(String message) {
		this(message, false, StatusCode.OK);
	}

	public SuccessHandler(boolean error) {
		this(null, error, StatusCode.OK);
	}

	public SuccessHandler(String message, boolean error) {
		this(message, error, StatusCode.OK);
	}

	public SuccessHandler(String message, boolean error, StatusCode statusCode) {
		this(message, error, statusCode, null);
	}

	public SuccessHandler(String message, boolean error, StatusCode statusCode, T content) {
		this.message = message;
		this.error = error;
		this.statusCode = statusCode;
		this.content = content;
		this.date = new Date();
	}

	public int getCode() {
		return statusCode.getCode();
	}
}