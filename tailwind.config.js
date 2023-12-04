/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./public/index.html"],
  theme: {
    extend: {
      backgroundColor:{
        'main-100':'#E7ECEC',
        'main-200':'#DDE4E4',
        'main-300':'#CED9D9',
        'main-400':'#C0D8D8',
        'main-500':'#0E8080',
        'overlay-30': 'rgba(0,0,0,0.3)'
      },
      colors:{
        'main-100':'#E7ECEC',
        'main-200':'#DDE4E4',
        'main-300':'#CED9D9',
        'main-400':'#C0D8D8',
        'main-500':'#0E8080',
      },


      keyframes: {
        'slide-right': {
          '0%': {
            '-webkit-transform': 'translateX(-500px)',
            transform: 'translateX(-500px)'
          },
          '100%': {
            '-webkit-transform': 'translateX(0)',
            transform: 'translateX(0)'
          }
        },
        'slide-left': {
          '0%': {
            '-webkit-transform': 'translateX(500px)',
            transform: 'translateX(500px)'
          },
          '100%': {
            '-webkit-transform': 'translateX(0)',
            transform: 'translateX(0)'
          }
        },
        'slide-left2': {
          '0%': {
            '-webkit-transform': 'translateX(500px)',
            transform: 'translateX(500px)'
          },
          '100%': {
            '-webkit-transform': 'translateX(0)',
            transform: 'translateX(0)'
          }
        },

        'rotate-center': {
          '0%': {
            '-webkit-transform': 'rotate(0)',
            transform: 'rotate(0)'
          },
          '100%': {
            '-webkit-transform': 'rotate(360deg)',
            transform: 'rotate(360deg)'
          }
        },
        'rotate-center-pause': {
          '0%': {
            '-webkit-transform': 'rotate(360deg)',
            transform: 'rotate(360deg)',
            'border-radius': '99999px'
          },
          '100%': {
            '-webkit-transform': 'rotate(0)',
            transform: 'rotate(0)'
          }
        },

      },
      animation: {
        'slide-right': 'slide-right 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both',
        'slide-left': 'slide-left 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both',
        'slide-left2': 'slide-left2 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both',
        'rotate-center': 'rotate-center 9s linear infinite',
        'rotate-center-pause': 'rotate-center-pause 0.5 linear 2 both'
      },
      flex:{
        '4':'4 4 0%',
        '6':'6 6 0%',
        '3':'3 3 0%',
        '7':'7 7 0%',
      }
    },
    screens:{
      '1600':"1600px"
    }
  },
  plugins: [],
};
