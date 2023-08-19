import React, { useState } from 'react'
import { Container, Grow, Grid, Paper, AppBar, TextField, Button, Box } from '@material-ui/core'
import Posts from '../Posts/Posts.js'
import Form from '../Form/Form.js'
import { useDispatch } from 'react-redux'
import NavBar from '../NavBar/NavBar'
import ChipInput from 'material-ui-chip-input'
import { getPostsBySearch } from '../../actions/posts.js'
import Paginate from '../Pagination.jsx'
import { useLocation, useNavigate } from 'react-router-dom'
import useStyles from './styles.js'

/* 
This is the root component for Share Memories app.
In this component we have total 5 Sections.
 1.NavBar
 2.Showing all the Posts
 3.Search functionality
 4.Form For submitting Memories
 5.Pagination Feature
*/



/* This is a custome hook Important to understand*/
function useQuery() {
    return new URLSearchParams(useLocation().search)
}


const Memories = () => {
    // console.log("Memories 2");
    /*
    The useStyles function is a React hook that can be used 
    to generate CSS stylesheets and inject to custom 
    components. It returns an object containing: 
    classes : A map containing the generated classes, 
    to be used as className of your components. css : 
    The emotion's css function which is used to generate 
    the classes.
    */
    const classes = useStyles()

    /*This state is used to set id of a unique post*/
    const [currentId, setCurrentId] = useState(null)
    /*The useQuery custom hook. */
    const query = useQuery()

    /*It is useful when navigating programmatically in your React project. 
    The useNavigate hook returns an imperative method that you can use for changing location
    */
    const navigate = useNavigate()

    /*  */
    const page = query.get('page') || 1
    const searchQuery = query.get('searchQuery')
    /*The useDispatch hook is used to update the state of the component and return a new state.
    */
    const dispatch = useDispatch()

    /* */
    const [search, setSearch] = useState('')

    /* */
    const [tags, setTags] = useState([])

    /*Understand fully this concept */
    const searchPost = () => {
        if (search.trim() || tags) {
            // we can not pass an array from frontend [europe asia]->as an string 'europe,asia'
            const res = getPostsBySearch({ search, tags: tags.join(',') })
            dispatch(res);
            navigate(`/memories/search?searchQuery=${search || 'none'}&searchTags=${tags.join(',')}`)
        } else {
            navigate('/')
        }
    }

    /* */
    const handleAdd = (tag) => {
        setTags([...tags, tag])
    }

    /* */
    const handleKeyPress = (e) => {
        //After Text Field ke liye hai pressing Enter khuch cross ke sath ban jata hai text Field me
        if (e.keyCode === 13) {
            searchPost()
        }
    }

    /* */
    const handleDelete = (tagtoDelete) => setTags(tags.filter((tag) => tag !== tagtoDelete))
    /* Understanding the grid concept in material UI
      xtra small device ke full width 12 small ke liye 7
    */
    return (
        <>
            {/*Section- 1*/}
            <NavBar text="MEMORIES" />
            <Grow in>
                <Container maxWidth={'xl'}>
                    <Grid container spacing={3} className={classes.gridContainer} justifyContent="space-between" alignItems="stretch">

                        {/*Section- 2 */}
                        <Grid item xs={12} sm={6} md={9}>
                            <Posts setCurrentId={setCurrentId} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>

                            {/*Section- 3*/}
                            <AppBar elevation={-2} className={classes.appBarSearch} position="static" color="inherit">
                                <TextField name="search" variant="outlined" label="Search Memories" fullWidth value={search} onKeyDown={handleKeyPress} onChange={(e) => { setSearch(e.target.value) }} />
                                <ChipInput style={{ margin: '10px 0' }} value={tags} onAdd={(tag) => handleAdd(tag)} onDelete={(tag) => handleDelete(tag)} label="Search Tags" variant="outlined" />
                                <Button onClick={searchPost} variant="contained" color="primary">Search</Button>
                            </AppBar>

                            {/*Section- 4*/}
                            <Form currentId={currentId} setCurrentId={setCurrentId} />

                            {/*Section- 5*/}
                            {(!searchQuery && !tags.length) && (<Box mt={2}>
                                <Paper elevation={6}>
                                    <Paginate page={page} className={classes.pagination} />
                                </Paper>
                            </Box>)
                            }
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </>
    )
}

export default Memories
