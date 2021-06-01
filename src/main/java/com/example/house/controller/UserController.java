package com.example.house.controller;

import com.example.house.model.House;
import com.example.house.model.User;
import com.example.house.service.HouseService;
import com.example.house.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;

@Controller
public class UserController {
    @Autowired
    UserService userService;

    //用户登录
    @PostMapping("/userLogin")
    public String userLogin(@RequestParam("user_number") String user_number, @RequestParam("user_password") String user_password, Map<String, Object> map, HttpServletRequest request){
        User usercheck = userService.userLogin(user_number,user_password);
        HttpSession session = request.getSession();
        if (usercheck != null){
            request.getSession().setAttribute("userInfo", usercheck);
            User u = (User) session.getAttribute("userInfo");
            return "user_index";
        }
        else {
            map.put("message", "用户名或密码错误，请重新登录！");
            return "user_login";
        }
    }

    //退出登录
    @GetMapping("userLogout")
    public String rootLogout(HttpServletRequest request){
        HttpSession session = request.getSession();
        //移除信息
        session.removeAttribute("userInfo");
        return "user_login";
    }

    //注册
    @PostMapping("/userRegister")
    public String register(User user, Map<String, Object> map){
        if (user.getUser_number() != null) {
            userService.addNew(user);
            return "user_login";
        }
        else {
            map.put("message", "用户名已存在！");
            return "register";
        }
    }

    //通过账号查找信息
    @RequestMapping("/userInformation")
    public String findUserInfo(HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        User u = (User) session.getAttribute("userInfo");
//        System.out.println(u);
        String user_number = String.valueOf(u.getUser_number());
//        System.out.println(user_number);
        User user = userService.findByNum(user_number);
//        System.out.println(user);
        model.addAttribute("users",user);

        return "userInformation";
    }

    //修改密码
    @PostMapping("/altUserPwd")
    public String altUserPwd(String user_number, String user_password, HttpServletRequest request){
        HttpSession session = request.getSession();

        User user = userService.findByNum(user_number);
        user.setUser_password(user_password);

        return "userManage";
    }



    @Autowired
    HouseService houseService;

    //用户处根据房屋名称查找房屋
    @RequestMapping("/UserFindHouse")
    public String UserFindHouse(HttpServletRequest request, Model model){
        //获取房屋名称
        String house_name = request.getParameter("search_user");
        List<House> house = houseService.findByHouseName(house_name);
        model.addAttribute("houses",house);
        return "housesUser";
    }

    //用户处显示未租房屋
    @RequestMapping("/housesUser")
    public String UserFindAllHouses(Model model){
        List<House> house = houseService.findHouses();
        model.addAttribute("houses",house);
        return "housesUser";
    }

    //申请租房
    @GetMapping("/applyHouse")
    public String applyHouse(int id){
        houseService.applyHouse(id);
        return "redirect:/housesUser";
    }
}
