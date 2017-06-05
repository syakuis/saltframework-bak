package org.saltframework.apps.member.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author Seok Kyun. Choi. 최석균 (Syaku)
 * @site http://syaku.tistory.com
 * @since 2017. 6. 5.
 */
@Controller
@RequestMapping("/member")
public class LoginController {

	@GetMapping("/login")
	public String dispLoginForm() {
		return "member/login/form";
	}
}
