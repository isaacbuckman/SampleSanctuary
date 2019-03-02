import { connect } from 'react-redux';
import TrackShow from './track_show';
import { fetchTracks, fetchTrack, deleteTrack, updateTrack } from '../../actions/track_actions';
import { setCurrentTrack, setPlayPause  } from '../../actions/trackplayer_actions';
import { toggleLike } from '../../actions/like_actions'; 
import { fetchUser } from '../../actions/user_actions'; 

const currentUserLikes = ({session: {currentUser}}, trackid) => {
  if (!currentUser || !currentUser.likes) return false; 
  return currentUser.likes.includes(parseInt(trackid)); 
};

const mapStateToProps = (state, ownProps) => {
  const tracks = Object.values(state.entities.tracks);
  let samplers = tracks.filter((track) => {
    if (track.sample == ownProps.match.params.id) return track;
  });

  return ({
    samplers : samplers,
    track: state.entities.tracks[ownProps.match.params.id],
    users: state.entities.users,  
    comments: state.entities.comments, 
    errors: state.errors.tracks || [],
    trackplayer: state.trackplayer || {},
    currentUser: state.session.currentUser,
    liked: currentUserLikes(state, ownProps.match.params.id) 
  });
};

const mapDispatchToProps = (dispatch) => ({
  fetchTracks: () => dispatch(fetchTracks()), //ib
  fetchTrack: (id) => dispatch(fetchTrack(id)),
  fetchUser: (id) => dispatch(fetchUser(id)), 
  setCurrentTrack: (track) => dispatch(setCurrentTrack(track)),
  setPlayPause: (boolean, trackId, progress) => dispatch(setPlayPause(boolean, trackId, progress)),
  deleteTrack: (trackId) => dispatch(deleteTrack(trackId)),
  updateTrack: (track, id) => dispatch(updateTrack(track, id)),
  toggleLike: (trackId) => dispatch(toggleLike(trackId))
});

export default connect(mapStateToProps, mapDispatchToProps)(TrackShow);
