package itmo.olya.lab4.service;

import itmo.olya.lab4.repository.UserRepository;
import itmo.olya.lab4.repository.entity.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<UserEntity> optionalUser = userRepository.findById(username);
        if (optionalUser.isEmpty()) {
            throw new UsernameNotFoundException("User not found: " + username);
        }
        UserEntity user = optionalUser.get();
        return User.builder()
                .username(user.getLogin())
                .password(user.getPassword())
                .build();
    }

    public void registerUser(String login, String password) {
        UserEntity entity = new UserEntity();
        entity.setLogin(login);
        entity.setPassword(password);
        userRepository.save(entity);
    }
}
