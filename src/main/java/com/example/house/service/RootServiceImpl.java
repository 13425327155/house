package com.example.house.service;

import com.example.house.dao.RootDao;
import com.example.house.model.Root;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class RootServiceImpl implements RootService {
    @Resource
    RootDao rootDao;

    @Override
    public Root rootLogin(String root_number, String root_password) {
        Root root = rootDao.rootLogin(root_number,root_password);
        return root;
    }

}
