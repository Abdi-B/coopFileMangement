import { 
    ADD_FILES,
    GET_FILES,
    UPDATE_FILES,
    DELETE_FILES,

    ADD_USER,
    GET_USER,
    UPDATE_USER,
    DELETE_USER
} from './actionTypes';

const initialState = {
    files: [],
    filter: 'ALL',
    search: ''

};

const todoReducer = (state = initialState, action)=> {
    switch (action.type) {
        case ADD_FILES:
           return {
            files: [...state.files, { department: action.payload.department, subDepartment: action.payload.subDepartment, filename: action.payload.filename }]
           };
        case GET_FILES: 
           return {
            files : state.files
           };
        case UPDATE_FILES:
            return {
                files: state.files.map((index, file) => 
                    file._id === action.payload.id  ) // check
            };
        case DELETE_FILES:
            return {
                files: state.files.map((file, index) => file._id !== action.payload.id) // add condition
            };
        default:
            return state;
    }
}