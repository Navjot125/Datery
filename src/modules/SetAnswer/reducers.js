import {
  SET_ANSWER, ANSWER_FAIL, ANSWER_REQUESTED, ANSWER_SUCCESS, REMOVE_ANSWER, AGE, SEXUALORIENTATION, GENDER, USERID,
  RELATIONSHIPSTATUS, CURRENTRELATIONSHIPLENGTH, LONGESTRELATIONSHIPLENGTH, HOWMANYDATES, BUDGET, TYPEOFDATES, TOPIC,
  DATINGCOACH, KIDS, CITY, ANNIVERSARY, PARTNERBIRTHDAY
} from './types';

const INITIAL_STATE = {
  demo: [],
  role: null,
  answers: [],
  userId: null,
  deviceToken: null,
  age: null,
  gender: null,
  SexualOrientation: null,
  relationshipStatus: null,
  CurrentRelationshipLength: null,
  longestRealtionshipLength: null,
  howManyDates: null,
  budget: null,
  typeOfDates: [],
  topic: [],
  datingCoach: null,
  kids: null,
  city: null,
  anniversary: null,
  PartnerBirthday: null,
};

// {user: 'Guest', id: 1}
// {user: 'Login User', id: 2}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_ANSWER:
      // const key =action.key;
      // console.log(action, 'answer log action', state, 'state at reducer -----------------------------------------------');
      return {
        ...state,
        answers: [
          // ...state.answers,
          state?.age,
          state?.gender,
          state?.SexualOrientation,
          state?.relationshipStatus,
          state?.CurrentRelationshipLength,
          state?.longestRealtionshipLength,
          state?.howManyDates,
          state?.budget,
          state?.typeOfDates,
          state?.topic,
          state?.datingCoach,
          state?.kids,
          state?.city,
          state?.anniversary,
          state?.PartnerBirthday,
          state?.userId,
        ],
        // filteredArray : state?.answers?.filter(item => item !== undefined && !Array.isArray(item)),
        // mergedObject : Object.assign({}, ...state?.filteredArray)
      };
    case REMOVE_ANSWER:
      // console.log(state, 'state remove answer state.answers action', action);
      return {
        ...state,
        answers: [],
        userId: null,
        deviceToken: null,
        age: null,
        gender: null,
        SexualOrientation: null,
        relationshipStatus: null,
        CurrentRelationshipLength: null,
        longestRealtionshipLength: null,
        howManyDates: null,
        budget: null,
        typeOfDates: [],
        topic: [],
        datingCoach: null,
        kids: null,
        city: null,
        anniversary: null,
        PartnerBirthday: null,
      };
    case USERID:
      // console.log(state, 'STATE USERID REDUCER ACTION', action);
      return {
        ...state,
        userId: action.data
      };
    case AGE:
      // console.log(state, 'state age reducer action', action);
      return {
        ...state,
        age: action.data
      };
    case GENDER:
      // console.log(state, 'GENDER REDUCER SCREEN', action);
      return {
        ...state,
        gender: action.data
      };
    case SEXUALORIENTATION:
      // console.log(state, 'STATE SEXUALORIENTATION REDUCER ACTION', action);
      return {
        ...state,
        SexualOrientation: action.data
      };
    case RELATIONSHIPSTATUS:
      // console.log(state, 'STATE RELATIONSHIPSTATUS REDUCER ACTION', action);
      return {
        ...state,
        relationshipStatus: action.data
      };
    case CURRENTRELATIONSHIPLENGTH:
      // console.log(state, 'STATE CURRENTRELATIONSHIPLENGTH REDUCER ACTION', action);
      return {
        ...state,
        CurrentRelationshipLength: action.data
      };
    case LONGESTRELATIONSHIPLENGTH:
      // console.log(state, 'STATE LONGESTRELATIONSHIPLENGTH REDUCER ACTION', action);
      return {
        ...state,
        longestRealtionshipLength: action.data
      };
    case HOWMANYDATES:
      // console.log(state, 'STATE HOWMANYDATES REDUCER ACTION', action);
      return {
        ...state,
        howManyDates: action.data
      };
    case BUDGET:
      // console.log(state, 'STATE BUDGET REDUCER ACTION', action);
      return {
        ...state,
        budget: action.data
      };
    case TYPEOFDATES:
      // console.log(state, 'STATE TYPEOFDATES REDUCER ACTION', action);
      return {
        ...state,
        typeOfDates: action.data
      };
    case TOPIC:
      // console.log(state, 'STATE TOPIC REDUCER ACTION', action);
      return {
        ...state,
        topic: action.data
      };
    case DATINGCOACH:
      // console.log(state, 'STATE DATINGCOACH REDUCER ACTION', action);
      return {
        ...state,
        datingCoach: action.data
      };
    case KIDS:
      // console.log(state, 'STATE KIDS REDUCER ACTION', action);
      return {
        ...state,
        kids: action.data
      };
    case CITY:
      // console.log(state, 'STATE CITY REDUCER ACTION', action);
      return {
        ...state,
        city: action.data
      };
    case ANNIVERSARY:
      // console.log(state, 'STATE ANNIVERSARY REDUCER ACTION', action);
      return {
        ...state,
        anniversary: action.data
      };
    case PARTNERBIRTHDAY:
      // console.log(state, 'STATE PARTNERBIRTHDAY REDUCER ACTION', action);
      return {
        ...state,
        PartnerBirthday: action.data
      };
    case ANSWER_REQUESTED:
      return {
        ...state,
      };
    case ANSWER_SUCCESS:
      return {
        ...state,
        // loginData: action.data,
      };

    case ANSWER_FAIL:
      return {
        ...state,
      };

    default:
      return state;
  }
};
