package com.example.house.controller;

import com.example.house.model.House;
import com.example.house.service.HouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
public class HouseController {
    @Autowired
    HouseService houseService;

    //添加房屋
    @PostMapping("/addHouse")
    public String addHouse(House house){
        houseService.addHouse(house);
        return "redirect:/houseAdd";
    }

    //
    @GetMapping("/findThisHouse")
    public String findThisHouse(int id, HttpServletRequest request){
        House thisHouse = houseService.findThisHouse(id);
        HttpSession session = request.getSession();
        request.getSession().setAttribute("thisHouse", thisHouse);
        House h = (House)session.getAttribute("thisHouse");
        return "houseAlt";
    }

    //修改房屋信息
    @PostMapping("/altHouse")
    public String altHouse(String house_name, String house_area, String location, String house_type,
                           String rent, String house_state, String tel, HttpServletRequest request){
        HttpSession session = request.getSession();
        House h = (House)session.getAttribute("thisHouse");
        h.setHouse_name(house_name);
        h.setHouse_area(house_area);
        h.setLocation(location);
        h.setHouse_type(house_type);
        h.setRent(rent);
        h.setHouse_state(house_state);
        h.setTel(tel);
        houseService.altHouse(h,h.getId());
        return "redirect:/housesRoot";
    }


    //删除房屋
    @GetMapping("/deleteHouse")
    public String deleteHouse(int id){
        houseService.deleteHouse(id);
        return "redirect:/housesRoot";
    }




}
