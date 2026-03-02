package com.deepak.shrinkify.util;

public class Base62Encoder {
    private static final String BASE62 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    public static String encoder(long id){
        if(id == 0) return "0";

        StringBuilder sb = new StringBuilder();
        while (id > 0){
            int remainder = (int) (id % 62);
            sb.append(BASE62.charAt(remainder));
            id /= 62;
        }
        return sb.reverse().toString();
    }
    public static long decode(String shortCode){
        long id = 0;
        for(int i = 0; i < shortCode.length(); i++){
            int value = BASE62.indexOf(shortCode.charAt(i));
            id = id * 62 + value;
        }
        return id;
    }
}
