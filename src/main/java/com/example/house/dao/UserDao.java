package com.example.house.dao;

import com.example.house.model.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface UserDao {
    //用户登录
    User userLogin(@Param("user_number") String user_number, @Param("user_password") String user_password);

    //用户注册
    void addNew(User user);

    //通过账号查找信息
    User findByNum(@Param("user_number") String user_number);

    //管理用户
    List<User> findAllUsers();

    List<User> findUser(@Param("user_name") String user_name);

    void deleteUser(@Param("user_number") String user_number);


}
