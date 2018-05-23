package com.mis.user.commom;

import com.mis.user.login.controller.UserLogin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.thymeleaf.util.StringUtils;

import javax.servlet.http.HttpSession;

@Controller
public class ViewDefault {

    @Autowired
    UserLogin userLogin;

    @GetMapping("/back-stage_management.html")
    private String checkLogin(String redirectUrl , HttpSession session , Model model){
        //判断是否存在全局会话
        String token = (String) session.getAttribute("token");
        if(StringUtils.isEmpty(token)){
            //表示不存在全局会话，跳转至登陆界面
            model.addAttribute("redirectUrl",redirectUrl);
            System.out.println("不存在全局会话");
            return "login";
        }
        else{
            //存在全局会话
            System.out.println("存在全局会话");
            return "back-stage_management";
        }
    }

    @GetMapping("/viewUsers.html")
    private String viewUsers(String redirectUrl , HttpSession session , Model model){
        //判断是否存在全局会话
        String token = (String) session.getAttribute("token");
        if(StringUtils.isEmpty(token)){
            //表示不存在全局会话，跳转至登陆界面
            model.addAttribute("redirectUrl",redirectUrl);
            System.out.println("不存在全局会话");
            return "login";
        }
        else {
            //存在全局会话
            System.out.println("存在全局会话");
            return "viewUsers";
        }
    }

    @GetMapping("/login.html")
    private String login(){
        return "login";
    }

    @GetMapping("/register.html")
    private String register(){
        return "register";
    }

    @GetMapping("/showValue.html")
    private String showValue(String redirectUrl , HttpSession session , Model model) {
        //判断是否存在全局会话
        String token = (String) session.getAttribute("token");
        if (StringUtils.isEmpty(token)) {
            //表示不存在全局会话，跳转至登陆界面
            model.addAttribute("redirectUrl", redirectUrl);
            System.out.println("不存在全局会话");
            return "login";
        } else {
            //存在全局会话
            System.out.println("存在全局会话");
            return "showValue";
        }
    }
}
