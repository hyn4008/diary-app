package me.nyung.diary_backend.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;
import javax.xml.bind.DatatypeConverter;
import java.util.Date;

@Component
public class JwtTokenProvider {

   private static final String SECRET_KEY = "hodu-luv-kong";
   private static final long EXPIRATION_TIME = 86400000; // 1 day

   // 토큰 생성
   public String generateToken(Integer userId, String username) {
       return Jwts.builder()
               .setSubject(userId.toString())
               .claim("username", username)
               .setIssuedAt(new Date())
               .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
               .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
               .compact();
   }

   // 토큰에서 claims 추출
   public Claims getClaimsFromToken(String token) {
       return Jwts.parser()
               .setSigningKey(DatatypeConverter.parseBase64Binary(SECRET_KEY))
               .parseClaimsJws(token)
               .getBody();
   }

    // 토큰에서 userid 추출
    public Integer getUserIdFromToken(String token) {
        return Integer.parseInt(getClaimsFromToken(token).getSubject()); // subject에서 userid 추출
    }

    // 토큰에서 username 추출
    public String getUsernameFromToken(String token) {
        return getClaimsFromToken(token).get("username", String.class); // claim에서 username 추출
    }

   // 토큰 유효성 검사
   public boolean validateToken(String token) {
       try {
           Claims claims = getClaimsFromToken(token);
           return !isTokenExpired(claims);
       } catch (Exception e) {
           return false;
       }
   }

   // 토큰 만료 여부 확인
   private boolean isTokenExpired(Claims claims) {
       return claims.getExpiration().before(new Date());
   }
}