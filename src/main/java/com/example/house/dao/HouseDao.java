package com.example.house.dao;

import com.example.house.model.House;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;


@Mapper
public interface HouseDao {

    //添加房源
    void addHouse(House house);

    //根据房屋名称查找房屋
    List<House> findByHouseName(@Param("house_name") String house_name);

    //未租房屋
    List<House> findHouses();
    //已租房屋
    List<House> findRented();
    //申请列表
    List<House> findApply();

    //修改房屋信息
    House findThisHouse(@Param("id") int id);

    void altHouse(House house, @Param("id") int id);

    void applyHouse(@Param("id") int id);

    //处理申请
    void agreeApply(@Param("id") int id);
    void refuseApply(@Param("id") int id);

    //删除房屋
    void deleteHouse(@Param("id") int id);

}
