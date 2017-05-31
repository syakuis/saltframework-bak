package org.saltframework.validation.constraints;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.*;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

/**
 * @author Seok Kyun. Choi. 최석균 (Syaku)
 * @site http://syaku.tistory.com
 * @since 2017. 5. 15.
 */
@Target( { METHOD, FIELD, ANNOTATION_TYPE })
@Retention(RUNTIME)
@Constraint(validatedBy = BetweenValidator.class)
@Documented
public @interface Between {
	String message() default "{org.saltframework.validation.constraints.Between}";

	Class<?>[] groups() default {};

	Class<? extends Payload>[] payload() default {};

	String[] values() default {};

	ValueSet valueSet() default ValueSet.NONE;

	enum ValueSet {
		YN, ZERO_ONE, NONE
	}
}
