import { 
    ADD_FILES,
    GET_FILES,
    UPDATE_FILES,
    DELETE_FILES,

    ADD_USER,
    GET_USER,
    UPDATE_USER,
    DELETE_USER,

    FILTER_TERM,
    SEARCH_TERM

    
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
            files: [...state.files, 
                {   department: action.payload.department, 
                    subDepartment: action.payload.subDepartment, 
                    filename: action.payload.filename 
                }],
            filter: state.filter,
            search: state.search

           };
        case GET_FILES: 
           return {
            files : state.files,
            search: state.search,
            filter: state.filter
           };
        case UPDATE_FILES:
            return {
                files: state.files.map((index, file) => 
                    file._id === action.payload.id ? {...file, department: action.payload.department} : file ), // check
                filter: state.filter,
                search: state.search
            };
        case DELETE_FILES:
            return {
                files: state.files.filter((file, index) => file._id !== action.payload.id), // add condition
                filter: state.filter,
                search: state.search
            };
        case FILTER_TERM:
            return {
                files: state.files,
                filter: action.payload.id,
                search: state.search
            };
        case SEARCH_TERM: 
            return {
                files: state.files,
                filter: state.filter,
                search: action.payload.text
            }
        default:
            return state;
    }
}