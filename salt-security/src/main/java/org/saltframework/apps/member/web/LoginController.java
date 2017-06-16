package org.saltframework.apps.member.web;

import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.security.Principal;

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

	@GetMapping("/mypage")
	@Secured({"ROLE_USER","ROLE_ADMIN"})
	public String dispMypage() {
		return "member/login/mypage";
	}

	@GetMapping("/user")
	@Secured({"ROLE_USER", "ROLE_ADMIN"})
	@ResponseBody
	public Principal getUser(Principal principal) {
		return principal;
	}
}
