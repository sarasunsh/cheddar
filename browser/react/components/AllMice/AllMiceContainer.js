import { connect } from 'react-redux';
import AllMice from './AllMice';
import { fetchMiceFromServer } from '../../ducks/allMice';


const mapStateToProps = function(state){
    return {
        mice: state.mice,
        currentMouse: state.currentMouse
    }
}

// const mapDispatchToProps = function(dispatch){
//     return {
//         loadMice: function(){
//             const thunk = fetchMiceFromServer()
//             dispatch(thunk)
//         }
//     }
// }

const AllMiceContainer = connect(mapStateToProps, null)(AllMice)

export default AllMiceContainer
