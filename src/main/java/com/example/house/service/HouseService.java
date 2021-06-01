package com.example.house.service;

import com.example.house.model.House;

import java.util.List;

public interface HouseService {

    //添加房源
    void addHouse(House house);

    //根据房屋名称查找房屋
    List<House> findByHouseName(String house_name);

    //显示房屋
    List<House> findHouses();
    //已租房屋
    List<House> findRented();
    //申请列表
    List<House> findApply();

    //修改房屋信息
    House findThisHouse(int id);

    void altHouse(House house, int id);

    void applyHouse(int id);

    //处理申请
    void agreeApply(int id);
    void refuseApply(int id);

    //删除房屋
    void deleteHouse(int id);

}
