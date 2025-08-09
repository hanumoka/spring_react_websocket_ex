package com.example.springchatbe.member.controller;


import com.example.springchatbe.common.auth.JwtTokenProvider;
import com.example.springchatbe.member.domain.Member;
import com.example.springchatbe.member.dto.MemberListResDto;
import com.example.springchatbe.member.dto.MemberLoginReqDto;
import com.example.springchatbe.member.dto.MemberSaveReqDto;
import com.example.springchatbe.member.service.MemberService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/members")
public class MemberController {

    private final MemberService memberService;
    private final JwtTokenProvider jwtTokenProvider;

    public MemberController(MemberService memberService, JwtTokenProvider jwtTokenProvider) {
        this.memberService = memberService;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @PostMapping("/create")
    public ResponseEntity<?> createMember(@RequestBody MemberSaveReqDto memberSaveReqDto) {
        Member member = memberService.create(memberSaveReqDto);
        return new ResponseEntity<>(member.getId(), HttpStatus.CREATED);
    }

    @PostMapping("/doLogin")
    public ResponseEntity<?> doLogin(@RequestBody MemberLoginReqDto memberSaveReqDto) {
        //이메일 페스워드 검증
        Member member = memberService.login(memberSaveReqDto);

        // JWT 토큰 생성 로직 (예시로 간단히 member ID를 반환)
        String token = jwtTokenProvider.createToken(member.getEmail(), member.getRole().name());

        Map<String, Object> loginInfo = new HashMap<>();
        loginInfo.put("id", member.getId());
        loginInfo.put("token", token);

        return new ResponseEntity<>(loginInfo, HttpStatus.OK);
    }

    @GetMapping("/list")
    public ResponseEntity<?> getMemberList() {
        List<MemberListResDto> dtos = memberService.findAll();
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }


}
