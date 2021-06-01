package com.example.house.service;

import com.example.house.model.House;
import com.example.house.model.Root;

import java.util.List;

public interface RootService {
    //管理员登录
    Root rootLogin(String root_number, String root_password);

}
