import React from 'react'
import {Container, Grow, Grid, Paper, AppBar, TextField, Button, Box} from '@material-ui/core'
//importing all the posts avialable  into the project
import Posts from '../Posts/Posts.js'
// importing form details
import Form from '../Form/Form.js'
import {useState} from 'react'
//Due to React Hooks Much Simpler to use Redux.
import {useDispatch} from 'react-redux'
//
import NavBar from '../NavBar/NavBar'
import ChipInput from 'material-ui-chip-input'
import {getPostsBySearch} from '../../actions/posts.js'
import Paginate from '../Pagination.jsx'
import {useLocation, useNavigate} from 'react-router-dom'
import useStyles from './styles.js'
function useQuery() {
 return new URLSearchParams(useLocation().search)
}

// We have 5 Section in to MemoryHomePage
// 1.NavBar
// 2.Showing All the Posts
// 3.Search functionality
// 4.Form For submitting Memories
// 5.Pagination Feature

const Memories = () => {
 const classes = useStyles()

 const [currentId, setCurrentId] = useState(null)

 const query = useQuery()

 const navigate = useNavigate()

 const page = query.get('page') || 1

 // What does useDispatch
 const dispatch = useDispatch()

 const [search, setSearch] = useState('')

 const [tags, setTags] = useState([])

 //Why useEffect

 //Functionality of Searching The Posts
 const searchPost = () => {
  //console.log('inside search Post')
  //console.log(search)
  // const knowtag = tags
  // console.log(knowtag.join(','))

  if (search.trim() || tags) {
   // we can not pass an array from frontend [europe asia]->as an string 'europe,asia'
   const res = getPostsBySearch({search, tags: tags.join(',')})
   console.log('res of return of getPostsBySearch')
   console.log(res)
   console.log(dispatch(res))
   navigate(`/memories/search?searchMemories=${search || 'none'}&searchTags=${tags.join(',')}`)
   //dispatch--->fetch serch Post
  } else {
   navigate('/')
  }
 }

 const handleAdd = (tag) => {
  setTags([...tags, tag])
 }

 const handleKeyPress = (e) => {
  //After Text Field ke liye hai pressing Enter khuch cross ke sath ban jata hai text Field me
  if (e.keyCode === 13) {
   //search Post
   searchPost()
  }
 }

 const handleDelete = (tagtoDelete) => setTags(tags.filter((tag) => tag !== tagtoDelete))

 return (
  <>
   {/* Section-1 */}
   <NavBar text="MEMORIES" />

   <Grow in>
    <Container maxWidth={'xl'}>
     {/* xtra small device ke full width 12 small keliey 7 */}
     <Grid container spacing={3} className={classes.gridContainer} justify="space-between" alignItems="stretch">
      {/* Grid Item-1*/}
      <Grid item xs={12} sm={6} md={9}>
       {/* Section-2 Putting All the Posts on Screen */}
       <Posts setCurrentId={setCurrentId} />
      </Grid>

      {/* Grid Item-2*/}

      <Grid item xs={12} sm={6} md={3}>
       {/* Section -3*/}
       <AppBar elevation={-2} className={classes.appBarSearch} position="static" color="inherit">
        <TextField
         name="search"
         variant="outlined"
         label="Search Memories"
         fullWidth
         value={search}
         onKeyDown={handleKeyPress}
         onChange={(e) => {
          setSearch(e.target.value)
         }}
        />
        <ChipInput style={{margin: '10px 0'}} value={tags} onAdd={(tag) => handleAdd(tag)} onDelete={(tag) => handleDelete(tag)} label="Search Tags" variant="outlined" />
        <Button onClick={searchPost} variant="contained" color="primary">
         Search
        </Button>
       </AppBar>

       {/*Section-4*/}
       <Form currentId={currentId} setCurrentId={setCurrentId} />

       {/* Section-5*/}
       <Box mt={2}>
        <Paper elevation={6}>
         <Paginate page={page} className={classes.pagination} />
        </Paper>
       </Box>
      </Grid>
     </Grid>
    </Container>
   </Grow>
  </>
 )
}

export default Memories
