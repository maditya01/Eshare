import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getPosts} from '../actions/posts.js'
import {Pagination, PaginationItem} from '@material-ui/lab'
import {Link} from 'react-router-dom'
import useStyles from './styles.js'

const Paginate = ({page}) => {
    const dispatch = useDispatch()
    const {totalNumberofPages}=useSelector(state=>state.getReducerPosts)
 //Any time when page changes we want to dispatch posts
 useEffect(() => {
  if(page) dispatch(getPosts(page))
 }, [page,dispatch])
 const classes = useStyles()
 return <Pagination classes={{ul: classes.ul}} count={totalNumberofPages} page={Number(page) || 1} variant="outlined" color="primary" renderItem={(item) => <PaginationItem {...item} component={Link} to={`/memories?page=${item.page}`} />} />
}

export default Paginate
