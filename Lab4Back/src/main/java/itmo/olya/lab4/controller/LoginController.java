package itmo.olya.lab4.controller;


import itmo.olya.lab4.controller.model.HttpEmpty;
import itmo.olya.lab4.service.UserService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/auth")
@RestController
@Validated
public class LoginController {
    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public LoginController(AuthenticationManager authenticationManager, UserService userService, PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public HttpEmpty login(@NotEmpty String login, @NotEmpty String password) {
        Authentication auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(login, password));
        SecurityContextHolder.getContext().setAuthentication(auth);
        return new HttpEmpty();
    }

    @PostMapping("/register")
    public HttpEmpty register(@NotEmpty String login, @NotEmpty String password) {
        System.out.println("Received login: " + login);
        System.out.println("Received password: " + password);
        // Регистрируем пользователя с логином и зашифрованным паролем
        userService.registerUser(login, passwordEncoder.encode(password));
        Authentication auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(login, password));
        SecurityContextHolder.getContext().setAuthentication(auth);
        return new HttpEmpty();
    }

    @PostMapping("/logout")
    public HttpEmpty logout() {
        SecurityContextHolder.clearContext();
        return new HttpEmpty();
    }
}

