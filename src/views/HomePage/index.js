import HomePage from './HomePage';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { getAllVideo, getFiturUTConnectAction } from '../../actions/video';


const mapStateToProps = state => ({
    ...state.user,
    videoData: state.video.video.data,
    // dataFitur: state.video.video.dataFitur,
    dataFitur: console.log(JSON.stringify(state)),
});

const mapDispatchToProps = dispatch => ({
    fetchGetAllVideo: (PageNumber, PageSize) => dispatch(getAllVideo(PageNumber, PageSize)),
    fetchGetFiturUTConnect: () => dispatch(getFiturUTConnectAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);