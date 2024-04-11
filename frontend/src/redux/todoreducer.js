import { TODO_REDUCERES } from "./constant";

// Define initial state
const initialState = {
  isForm: false,
  todos: [],
  copy_todos: [],
  todoData: {},
};

const todoreducer = (state = initialState, action) => {
  switch (action.type) {
    case TODO_REDUCERES.IS_FORM:
      return {
        ...state,
        isForm: !state.isForm,
      };

    case TODO_REDUCERES.TODOS:
      return {
        ...state,
        todos: action.payload,
        copy_todos:action.payload
      };

    case TODO_REDUCERES.TODO_DATA:
      return {
        ...state,
        todoData: action.payload,
      };

    case TODO_REDUCERES.TODO_FILTER:

    if (action.payload == 'all'){
      return {
        ...state, todos: state.copy_todos
      }
    }
    else {
      const filteredTodos = state.copy_todos.filter(todo => todo.status === action.payload);
      
      return {
        ...state,
        todos: filteredTodos
      };
    }    

    default:
      return state;
  }
};

export default todoreducer;
