package com.example.springchatbe.member.service;

import com.example.springchatbe.member.domain.Member;
import com.example.springchatbe.member.domain.ROLE;
import com.example.springchatbe.member.dto.MemberLoginReqDto;
import com.example.springchatbe.member.dto.MemberSaveReqDto;
import com.example.springchatbe.member.repository.MemberRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    public MemberService(MemberRepository memberRepository, PasswordEncoder passwordEncoder) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Member create(MemberSaveReqDto memberSaveReqDto) {

        // 이미 존재하는 이메일인지 확인
        if (memberRepository.findByEmail(memberSaveReqDto.getEmail()).isPresent()) {
            throw new IllegalArgumentException("이미 존재하는 이메일입니다.");
        }

        Member member = Member.builder()
                .name(memberSaveReqDto.getName())
                .email(memberSaveReqDto.getEmail())
                .password(passwordEncoder.encode(memberSaveReqDto.getPassword()))
                .role(ROLE.USER) // Default role is USER
                .build();

        return memberRepository.save(member);
    }

    public Member login(MemberLoginReqDto memberSaveReqDto) {
        // 이메일과 비밀번호로 회원 조회
        Member member = memberRepository.findByEmail(memberSaveReqDto.getEmail())
                .orElseThrow(() -> new EntityNotFoundException("존재하지 않는 회원입니다."));

        // 비밀번호 검증
        if (!passwordEncoder.matches(memberSaveReqDto.getPassword(), member.getPassword())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }

        // 로그인 성공 시, JWT 토큰 생성 로직 추가 필요
        // 현재는 단순히 Member 객체를 반환
        return member;
    }
}
