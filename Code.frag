void main () {
// ================ set up ======================
 vec2 st = uv();
 vec2 stN = uvN();
 float theta = atan(st.x, st.y)/PI2+.5;
 float phi = log(length(st))* .5;
 vec3 c = black;
 
 vec3 my_blue =  vec3(0.08,0.22,0.33);
 vec3 my_purple =  vec3(0.27,0.2,0.47);
 vec3 my_yellow =  vec3(0.91,0.77,0.18);
 vec3 my_red =  vec3(0.72,0.17,0.08);
 
 // =============================================

//background
  for (int i = 0; i < 50; i++) {
     float tt = float(i) * PI;
     float x = fract(tt) * 4. - 2.;
     float y = rand(floor(tt * time * .01)) * 2. - 1.;
     vec2 s = vec2 (phi, st.y);
     
     vec2 back_position =  vec2(x, y);
     vec2 back_scale = vec2(.001, .001)* 1.5 * bands.x;
     
     s = rotate(s, vec2(sin(time)), time * 1.);
     c += box(s-back_position, back_scale, .0001 + .01 * bands.y, .1) * my_yellow;
 }
 
 //stars
 for(int i = 0; i <50; i++){
     float tt = float(i) * PI;
     float x = fract(tt) * 4. - 2.;
     float y = rand(floor(tt * time * .01)) * 2. - 1.;
     
     float radius = .1 + .01 * bands.y;
     
     c += circle(x-1.,y, radius, .01) * my_yellow;
 }
 
 //Light box
 for (int i = 0; i<10; i++){
    float tt = float(i) * PI;
    float x = fract(tt) * 4. - 2.;
    float y = rand(floor(tt * time * .01)) * 2. - 1.;
    
    vec2 position =  vec2(x, y);
    vec2 scale = vec2(.1, .2)*bands.x;
    
    c += box(uv() - position, scale, 0.001, 0.001) * my_blue;

}


    c = c * sin(c * black + time*10.) * bands.x;
   vec3 bb =  texture2D(backbuffer, stN).rgb;
   c = mix(c, bb, .9) + c * .1;
   gl_FragColor = vec4(c, 1.);
    
}
