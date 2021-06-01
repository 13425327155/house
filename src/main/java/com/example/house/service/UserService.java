package com.example.house.service;

import com.example.house.model.User;

import java.util.List;

public interface UserService {
    //用户登录
    User userLogin(String user_number, String user_password);

    //用户注册
    void addNew(User user);

    //通过账号查找信息
    User findByNum(String user_number);

    //管理用户
    List<User> findAllUsers();

    List<User> findUser(String user_name);

    void deleteUser(String user_number);
}
