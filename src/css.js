const css = {
  app: {
    position: 'relative',
    height: '100vh',
  },
  screen: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paper: {
    zIndex: 10, padding: '2rem', borderRadius: '2rem', overflow: 'hidden',
  },
  keyboard: {
    backgroundColor: '#00ACF1',
    boxShadow: 'inset 0 0 0 .13rem .13rem rgba(192,245,252,.5),inset -.13rem -.13rem 0 0 rgba(0,68,92,0.4)',
    borderRadius: '.3rem',
    overflow: 'hidden',
  },
  keyboardButton: {
    backgroundColor: 'rgba(0,0,0,0)',
    boxShadow: 'inset .13rem .13rem 0 0 rgba(192,245,252,.5),inset -.13rem -.13rem 0 0 rgba(0,68,92,0.4)',
    border: '0',
    paddingLeft: 0,
    paddingRight: 0,    
  },
}
export default css;