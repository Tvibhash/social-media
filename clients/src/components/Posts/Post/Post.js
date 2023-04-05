import React from 'react'
import useStyle from './Style'
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from "@material-ui/core"
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from "@material-ui/icons/Delete"
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import moment from 'moment'
import { useDispatch } from 'react-redux';
import { deletePost, updateLike } from '../../../actions/postAction';


const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyle();
  let tags = post.tags
  console.log(tags)
  const user = JSON.parse(localStorage.getItem('profile'))
  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find((like) => like === (user?.result?._id) || (user?.user?.uid))
        ? (
          <><ThumbUpAltIcon fontSize='small' />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}</>
        ) : (
          <><ThumbUpAltIcon fontSize='small' />&nbsp;{post.likes.length}{post.likes.length === 1}</>
        )
    }
    return <><ThumbUpAltOutlined fontSize='small' /></>
  }



  return (
    <Card className={classes.card} raised elevation={6}>
      <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
      <div className={classes.overlay}>
        <Typography variant='h6' >
          {post.name}
        </Typography>
        <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
      </div>
      <div className={classes.overlay2}>
        {
          (user?.result?._id === post?.creator || user?.user?.uid === post?.creator) &&
          <Button style={{ color: 'white' }} size='small' onClick={() => setCurrentId(post._id)}>
            <MoreHorizIcon fontSize='medium' />
          </Button>
        }

      </div>
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">{tags.length > 1 && tags.map((tag) => (
          `#${tag} `
        ))}</Typography>
      </div>
      <Typography className={classes.title} variant='h5' >{post.title}</Typography>
      <CardContent>
        <Typography variant='body2' color='textSecondary' component='p'>{post.message}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size='small' color='primary' onClick={() => dispatch(updateLike(post._id))} disabled={!user}>
          <Likes />
        </Button>
        {
          (user?.result?._id === post?.creator || user?.user?.uid === post?.creator) &&
          <Button size='small' color='primary' onClick={() => dispatch(deletePost(post._id))}>
            <DeleteIcon fontSize='small' />
            Delete
          </Button>
        }
      </CardActions>
    </Card>
  )
}

export default Post