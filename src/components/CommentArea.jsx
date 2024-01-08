import { Component } from 'react'
import CommentList from './CommentList'
import AddComment from './AddComment'

class CommentArea extends Component {
  state = {
    comments: [],
  }

  

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.bookId !== this.props.bookId) {
      this.getComments()
    }
  }

  aggiornaCommenti = () => {
    this.getComments()
  }

  getComments = () => {
    fetch(
      'https://striveschool-api.herokuapp.com/api/comments/' +
        this.props.bookId,
      {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTliZjkxNmUwZGQxZDAwMTgyZDE3MjYiLCJpYXQiOjE3MDQ3MjA2NjMsImV4cCI6MTcwNTkzMDI2M30.tbRuYV5DHQ1DNnpmKlQFJccEY-EQ0lVPHSspBPR4Mew',
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json()
        } else {
          throw new Error('errore nel recupero dei commenti')
        }
      })
      .then((arrayOfComments) => {
        console.log(arrayOfComments)
        this.setState({
          comments: arrayOfComments,
        })
      })
      .catch((err) => {
        console.log('error', err)
      })
  }

  render() {
    return (
      <div>
        <div>
          <CommentList reviews={this.state.comments} />
        </div>
        <div>
          <AddComment bookId={this.props.bookId} aggiornaCommenti={this.aggiornaCommenti} />
        </div>
      </div>
    )
  }
}

export default CommentArea