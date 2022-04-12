import {makeStyles} from '@material-ui/core/styles'

export default makeStyles({
 main: {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'center',
 },
 media: {
  width: '100%',
  height: '50px',
  paddingTop: '56.25%',
  backgroundColor: 'rgba(10, 0, 10, 0.5)',
  backgroundBlendMode: 'darken',
 },
 border: {
  border: 'solid',
 },
 fullHeightCard: {
  height: '100%',
 },
 card: {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  borderRadius: '15px',
  minWidth: '40px',
  maxWidth: '260px',
  '&:hover': {
   borderRadius: '35px',
  },
  //   maxHeight: '240px',
  //   position: 'relative',
 },
 overlay: {
  position: 'absolute',
  top: '20px',
  left: '20px',
  color: 'white',
 },
 overlay2: {
  position: 'absolute',
  top: '20px',
  right: '20px',
  color: 'white',
 },

 grid: {
     display: 'flex',
     flexDirection: 'column',
  justifyContent: 'space-between',
 },
 details: {
  display: 'flex',
  justifyContent: 'space-between',
  //   margin: '20px',
 },
 title: {
  padding: '0 16px',
 },
 cardActions: {
  padding: '0 16px 8px 16px',
  //   display: 'flex',
  justifyContent: 'space-between',
 },
})
