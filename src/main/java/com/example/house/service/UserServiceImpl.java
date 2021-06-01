package com.example.house.service;

import com.example.house.dao.UserDao;
import com.example.house.model.User;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    @Resource
    UserDao userDao;

    @Override
    public User userLogin(String user_number, String user_password) {
        User user = userDao.userLogin(user_number, user_password);
        return user;
    }

    @Override
    public void addNew(User user) {
        userDao.addNew(user);
    }

    @Override
    public User findByNum(String user_number) {
        return userDao.findByNum(user_number);
    }


    @Override
    public List<User> findAllUsers() {
        return userDao.findAllUsers();
    }

    @Override
    public List<User> findUser(String user_name) {
        return userDao.findUser(user_name);
    }

    @Override
    public void deleteUser(String user_number) {
        userDao.deleteUser(user_number);
    }
}
