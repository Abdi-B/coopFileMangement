import { 
    ADD_FILES,
    GET_FILES,
    UPDATE_FILES,
    DELETE_FILES,

    ADD_USER,
    GET_USER,
    UPDATE_USER,
    DELETE_USER
} from './actionTypes'

export const addFile = (department, subDepartment, filename) => ({
    type: ADD_FILES,
    payload: { department, subDepartment, filename }
});

export const getFiles = () => ({
    type: GET_FILES,
     
});

export const updateFile = (id) => ({ 
    type: UPDATE_FILES,
    payload: { id }
 });

 export const deleteFile = ( id ) => ({
    type: DELETE_FILES,
    payload: { id }
 });


 // USER RELATED ISSUE

 export const addUser = (firstName, email, password, confirmPassword) => ({
    type: ADD_USER,
    payload: {firstName, email, password, confirmPassword}
 });



export const getUsers = () => ({
 type: GET_USER
});


export const updateUser = ( id ) => ({
  type: UPDATE_FILES,
  payload: { id }
});

export const deleteUser = ( id ) => ({
    type: DELETE_USER,
    payload: { id }
})

