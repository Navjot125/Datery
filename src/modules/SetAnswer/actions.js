import {ANSWER_FAIL, ANSWER_REQUESTED, ANSWER_SUCCESS, SET_ANSWER, REMOVE_ANSWER, AGE, GENDER, SEXUALORIENTATION, USERID, 
  RELATIONSHIPSTATUS, CURRENTRELATIONSHIPLENGTH, LONGESTRELATIONSHIPLENGTH, HOWMANYDATES, BUDGET, TYPEOFDATES, TOPIC,
   DATINGCOACH, KIDS, CITY, ANNIVERSARY, PARTNERBIRTHDAY } from './types';

export const setAnswer = () => {
  return {
    type: SET_ANSWER,
    // payload: item
    // data,
    // navigation,
  };
};
export const removeAnswer = () => {
  return {
    type: REMOVE_ANSWER,
    // payload: item
    // data,
    // all
    // navigation,
  };
};

export const setUserId = (data) => {
  return {
    type: USERID,
    data,
  };
};
export const setAge = (data) => {
  return {
    type: AGE,
    data,
  };
};
export const setGender = (data) => {
  return {
    type: GENDER,
    data,
  };
};
export const setSexualOrientation = (data) => {
  return {
    type: SEXUALORIENTATION,
    data,
  };
};
export const setRelationshipStatus = (data) => {
  return {
    type: RELATIONSHIPSTATUS,
    data,
  };
};
export const setCurrentRelationshipLength = (data) => {
  return {
    type: CURRENTRELATIONSHIPLENGTH,
    data,
  };
};
export const setLongestRelationshipLength = (data) => {
  return {
    type: LONGESTRELATIONSHIPLENGTH,
    data,
  };
};
export const setHowManyDates = (data) => {
  return {
    type: HOWMANYDATES,
    data,
  };
};
export const setBudget = (data) => {
  return {
    type: BUDGET,
    data,
  };
};
export const setTypeOfDates = (data) => {
  return {
    type: TYPEOFDATES,
    data,
  };
};
export const setTopic = (data) => {
  return {
    type: TOPIC,
    data,
  };
};
export const setDatingCoach = (data) => {
  return {
    type: DATINGCOACH,
    data,
  };
};
export const setKids = (data) => {
  return {
    type: KIDS,
    data,
  };
};
export const setCity = (data) => {
  return {
    type: CITY,
    data,
  };
};
export const setAnniversary = (data) => {
  return {
    type: ANNIVERSARY,
    data,
  };
};
export const setPartnerBirthday = (data) => {
  return {
    type: PARTNERBIRTHDAY,
    data,
  };
};

export const answerRequest = (data) => {
  return {
    type: ANSWER_REQUESTED,
    data,
  };
};

export const answerSuccess = data => ({
  type: ANSWER_SUCCESS,
  data,
});

export const answerFail = () => ({
  type: ANSWER_FAIL,
});
