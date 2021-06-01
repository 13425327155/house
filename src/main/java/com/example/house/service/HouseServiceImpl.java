package com.example.house.service;

import com.example.house.dao.HouseDao;
import com.example.house.model.House;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class HouseServiceImpl implements HouseService {
    @Resource
    HouseDao houseDao;

    @Override
    public void addHouse(House house) {
        houseDao.addHouse(house);
    }

    @Override
    public List<House> findHouses() {
        return houseDao.findHouses();
    }

    @Override
    public List<House> findRented() {
        return houseDao.findRented();
    }

    @Override
    public List<House> findApply() {
        return houseDao.findApply();
    }

    @Override
    public List<House> findByHouseName(String house_name) {
        return houseDao.findByHouseName(house_name);
    }

    @Override
    public House findThisHouse(int id) {
        House house = houseDao.findThisHouse(id);
        return house;
    }

    @Override
    public void altHouse(House house, int id) {
        houseDao.altHouse(house,id);
    }

    @Override
    public void applyHouse(int id) {
        houseDao.applyHouse(id);
    }

    @Override
    public void agreeApply(int id) {
        houseDao.agreeApply(id);
    }

    @Override
    public void refuseApply(int id) {
        houseDao.refuseApply(id);
    }

    @Override
    public void deleteHouse(int id) {
        houseDao.deleteHouse(id);
    }


}
