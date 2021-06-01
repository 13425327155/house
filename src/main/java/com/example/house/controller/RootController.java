package com.example.house.controller;

import com.example.house.model.House;
import com.example.house.model.Root;
import com.example.house.model.User;
import com.example.house.service.HouseService;
import com.example.house.service.RootService;
import com.example.house.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;

@Controller
public class RootController {
    @Autowired
    RootService rootService;

    //管理员登录
    @PostMapping("/rootLogin")
    public String rootLogin(@RequestParam("root_number") String root_number, @RequestParam("root_password") String root_password, Map<String, Object> map, HttpServletRequest request){
        Root rootcheck = rootService.rootLogin(root_number,root_password);
        HttpSession session = request.getSession();
        if (rootcheck != null){
            request.getSession().setAttribute("rootInfo", rootcheck);
            Root r = (Root)session.getAttribute("rootInfo");

            return "root_index";
        }
        else {
            map.put("message", "密码错误，请重新登录！");
            return "index";
        }
    }

    //退出登录
    @GetMapping("rootLogout")
    public String rootLogout(HttpServletRequest request){
        HttpSession session = request.getSession();
        //移除信息
        session.removeAttribute("rootInfo");
        return "index";
    }

    @Autowired
    HouseService houseService;

    //管理员根据房屋名称查找房屋
    @RequestMapping("/RootFindHouse")
    public String RootFindHouse(HttpServletRequest request, Model model){
        //获取房屋名称
        String house_name = request.getParameter("search_root");
        List<House> house = houseService.findByHouseName(house_name);
        model.addAttribute("houses",house);
        return "housesRoot";
    }

    //管理员处显示未租房屋
    @RequestMapping("/housesRoot")
    public String RootFindAllHouses(Model model){
        List<House> house = houseService.findHouses();
        model.addAttribute("houses",house);
        return "housesRoot";
    }

    //管理员处显示已租房屋
    @RequestMapping("/housesRented")
    public String RootFindRented(Model model){
        List<House> houseRented = houseService.findRented();
        model.addAttribute("housesRendted",houseRented);
        return "housesRented";
    }

    //管理员处显示申请列表
    @RequestMapping("/housesApply")
    public String findApply(Model model){
        List<House> housesApply = houseService.findApply();
        model.addAttribute("housesApplies",housesApply);
        return "housesApply";
    }

    //同意申请
    @GetMapping("/agree")
    public String agree(int id){
        houseService.agreeApply(id);
        return "redirect:/housesApply";
    }
    //拒绝申请
    @GetMapping("/refuse")
    public String refuse(int id){
        houseService.refuseApply(id);
        return "redirect:/housesApply";
    }


    //管理用户
    @Autowired
    UserService userService;

    @RequestMapping("/userManage")
    public String RootFindAllUsers(Model model){
        List<User> user = userService.findAllUsers();
        model.addAttribute("users",user);
        return "userManage";
    }

    @RequestMapping("/RootFindUser")
    public String RootFindUser(HttpServletRequest request, Model model){
        //获取用户名称
        String user_name = request.getParameter("search_user");
        List<User> user = userService.findUser(user_name);
        model.addAttribute("users",user);
        return "userManage";
    }

    @GetMapping("/deleteUser")
    public String deleteHouse(String user_number){
        userService.deleteUser(user_number);
        return "redirect:/userManage";
    }
}
