package com.example.house.dao;

import com.example.house.model.House;
import com.example.house.model.Root;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface RootDao {
    //管理员登录
    Root rootLogin(@Param("root_number") String root_number, @Param("root_password") String root_password);

}
