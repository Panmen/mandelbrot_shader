
#ifdef GL_ES
precision highp float;
#endif


#define MAX_ITERATIONS 200
#define INF 10e10
#define PI 3.14

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;



float mandelbrot(vec2 uv, int n){

    vec2 z = vec2(0.0);

    int i = 0;
    for(; i < n; i++){
        z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + uv;


        if(dot(z, z) > INF){
            break;
        }
    }

    if(i >= n) return 0.0;

    return dot(z,z);
}


vec3 color_ramp(float t){
    if(t < 0.1){
        return vec3(0.0);
    }else{

        float a = sin(0.1 * log(t / INF));
        float b = sin(0.1 * log(t / INF) + 2.0 * PI / 3.0);

        return vec3(1.0, 1.0, 0.0) * a + vec3(0.0, 1.0, 1.0) * b;
    }
}


void main(){

    vec2 uv = gl_FragCoord.xy / u_resolution;

    float scale = 3.0 / exp(12.2 * u_mouse.y / u_resolution.y);

    uv = scale * (uv - vec2(0.5));
    //uv = uv + vec2(-0.74915,  0.10005);
    //uv = uv + vec2(-0.16070135,  1.0375665);
    //uv = uv + vec2(-0.74529,  0.113075);
    uv = uv + vec2(-0.745428,   0.113009);

    vec3 col = vec3(0.0);

    col.rgb = color_ramp(mandelbrot(uv, MAX_ITERATIONS));

    //col.b = 1.0 - step(0.1, length(uv - vec2(-0.7463, 0.1102)));

    gl_FragColor = vec4(col, 1.0);
}
