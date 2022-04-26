tsParticles.load("tsparticles",
{
  "background": {
    "color": {
      "value": "#212121"
    },
    "position": "50% 50%",
    "repeat": "no-repeat",
    "size": "cover",
    "opacity": 0
  },
  "fullScreen": {
    "zIndex": -2
  },
  "fpsLimit": 60,
  "particles": {
    "move": {
      "direction": "bottom",
      "enable": true,
      "path": {},
      "outModes": {
        "bottom": "out",
        "left": "out",
        "right": "out",
        "top": "out"
      },
      "speed": {
        "min": 0.05,
        "max": 0.4
      },
      "spin": {},
      "straight": true
    },
    "number": {
      "density": {
        "enable": true,
        "area": 1000,
        "factor": 2000
      },
      "limit": 810,
      "value": 300
    },
    "shape": {
      "options": {
        "circle": {
          "particles": {
            "color": {
              "value": "#ffffff"
            },
            "opacity": {
              "random": {
                "enable": true
              },
              "value": {
                "min": 0.1,
                "max": 0.75
              }
            },
            "size": {
              "random": {
                "enable": true,
                "minimumValue": 0.75
              },
              "value": {
                "min": 0.1,
                "max": 2
              }
            }
          }
        },
        "star": {
          "sides": 5,
          "particles": {
            "color": {
              "value": "#B79F74"
            },
            "links": {
              "distance": 200,
              "enable": true,
              "frequency": 0.8,
              "opacity": 0.1,
              "width": 2.0
            },
            "move": {
              "speed": {
                "min": 0.3,
                "max": 0.5
              }
            },
            "opacity": {
              "random": {
                "enable": false
              },
              "value": 1.0
            },
            "rotate": {
              "random": {
                "enable": true
              },
              "value": {
                "min": 0,
                "max": 360
              },
              "animation": {
                "enable": true,
                "speed": 4
              },
              "direction": "random"
            },
            "size": {
              "value": {
                "min": 2,
                "max": 3
              }
            }
          }
        }
      },
      "type": ["circle","circle","circle","circle","circle","circle","circle","circle","circle","star"]
    }
  },
  "pauseOnBlur": true,
  "pauseOnOutsideViewport": true
}
);