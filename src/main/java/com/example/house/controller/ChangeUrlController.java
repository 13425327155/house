package com.example.house.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class ChangeUrlController {
    //返回页面

    @RequestMapping("/index")
    public ModelAndView index() {
        return new ModelAndView("index");
    }

    @RequestMapping("/user_login")
    public ModelAndView user_login() {
        return new ModelAndView("user_login");
    }

    @RequestMapping("/register")
    public ModelAndView register() {
        return new ModelAndView("register");
    }

    @RequestMapping("/root_index")
    public ModelAndView root_index() {
        return new ModelAndView("root_index");
    }

    @RequestMapping("/user_index")
    public ModelAndView user_index() {
        return new ModelAndView("user_index");
    }

    @RequestMapping("/houseAdd")
    public ModelAndView houseAdd() {
        return new ModelAndView("houseAdd");
    }

//    @RequestMapping("/userInformation")
//    public ModelAndView userInformation() {
//        return new ModelAndView("userInformation");
//    }

//    @RequestMapping("/housesRoot")
//    public ModelAndView housesRoot() {
//        return new ModelAndView("housesRoot");
//    }

//    @RequestMapping("/housesUser")
//    public ModelAndView housesUser() {
//        return new ModelAndView("housesUser");
//    }

    @RequestMapping("/about")
    public ModelAndView about() {
        return new ModelAndView("about");
    }

    @RequestMapping("/home")
    public ModelAndView home() {
        return new ModelAndView("home");
    }
}
