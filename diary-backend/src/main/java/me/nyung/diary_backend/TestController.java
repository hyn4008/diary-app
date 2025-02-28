package me.nyung.diary_backend;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("user")
    @ResponseBody
    public String getUser() {
        return "{\"name\":\"Yuna\",\"age\":25}";
    }
}
