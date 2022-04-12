import React from 'react'
import {Grid} from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import {Link} from 'react-router-dom'
import useStyles from './styles.js'
const Index = ({img, text, btnText, path}) => {
 const classes = useStyles()
 return (
  <Card className={classes.card}>
   <CardMedia className={classes.media} image={img} />
   <CardContent className={classes.details}>
    <Typography>{text}</Typography>
   </CardContent>
   <CardActions classes={classes.cardActions}>
    <Button variant="contained" color="success" component={Link} to={path} size="medium">
     {btnText}
    </Button>
   </CardActions>
  </Card>
 )
}
export default Index
