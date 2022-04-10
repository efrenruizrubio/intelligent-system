import Particles from "react-tsparticles";

const ParticlesBackground = () => {
  return (
    <Particles
      id="tsparticles"
      options={{
        background: {
          color: {
            value: "#1B847D",
          },
          position: "50% 50%",
          repeat: "no-repeat",
          size: "cover",
        },
        fullScreen: {
          zIndex: -1,
        },
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "bubble",
              parallax: {
                force: 60,
              },
            },
          },
          modes: {
            bubble: {
              distance: 400,
              duration: 2,
              opacity: 1,
              size: 40,
            },
            grab: {
              distance: 400,
            },
          },
        },
        particles: {
          color: {
            value: "#ffffff",
          },
          links: {
            color: {
              value: "#323031",
            },
            distance: 150,
            opacity: 0.4,
          },
          move: {
            attract: {
              rotate: {
                x: 600,
                y: 1200,
              },
            },
            enable: true,
            outModes: {
              default: "bounce",
              bottom: "bounce",
              left: "bounce",
              right: "bounce",
              top: "bounce",
            },
            speed: 6,
          },
          number: {
            density: {
              enable: true,
            },
            value: 50,
          },
          opacity: {
            animation: {
              speed: 1,
              minimumValue: 0.1,
            },
          },
          shape: {
            options: {
              character: {
                fill: false,
                font: "Verdana",
                style: "",
                value: "*",
                weight: "400",
              },
              char: {
                fill: false,
                font: "Verdana",
                style: "",
                value: "*",
                weight: "400",
              },
              polygon: {
                nb_sides: 5,
              },
              star: {
                nb_sides: 5,
              },
              image: {
                height: 32,
                replace_color: true,
                src: "https://particles.js.org/images/sars-cov-2.png",
                width: 32,
              },
              images: {
                height: 32,
                replace_color: true,
                src: "https://particles.js.org/images/sars-cov-2.png",
                width: 32,
              },
            },
            type: "image",
          },
          size: {
            value: 16,
            animation: {
              speed: 40,
              minimumValue: 0.1,
            },
          },
          stroke: {
            color: {
              value: "#000000",
              animation: {
                h: {
                  count: 0,
                  enable: false,
                  offset: 0,
                  speed: 1,
                  sync: true,
                },
                s: {
                  count: 0,
                  enable: false,
                  offset: 0,
                  speed: 1,
                  sync: true,
                },
                l: {
                  count: 0,
                  enable: false,
                  offset: 0,
                  speed: 1,
                  sync: true,
                },
              },
            },
          },
        },
      }}
    />
  );
};

export default ParticlesBackground;
