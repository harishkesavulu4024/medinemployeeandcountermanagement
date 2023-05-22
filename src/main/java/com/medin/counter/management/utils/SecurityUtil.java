package com.medin.counter.management.utils;

import java.util.Map;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Component
public class SecurityUtil {

    private static final Logger logger = LogManager.getLogger(SecurityUtil.class);

    public static boolean authenticationExists() {
        if (SecurityContextHolder.getContext() != null && SecurityContextHolder.getContext().getAuthentication() != null) {
            return true;
        }
        return false;
    }

    public static String getAuthenticationDetail() {
        if (authenticationExists()) {
            logger.info("SecurityUtil-getAuthenticationDetail: after authenticationExists & method call is started!");
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            if (userDetails != null && userDetails.getUsername() != null) {
                return userDetails.getUsername().toString();
            }
            logger.info("SecurityUtil-getAuthenticationDetail: method call is ended!");
        }
        return null;
    }

    public static String getUserId() {
        return getAuthenticationDetail();
    }
}
