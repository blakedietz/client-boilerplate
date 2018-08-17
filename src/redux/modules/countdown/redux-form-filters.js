// eslint-disable-next-line import/prefer-default-export
export const filterFormActionOnField = (reduxFormAction, formNameSpace, field) => (action) => (action.type === `@@redux-form/${reduxFormAction}`) && (action.meta.form === formNameSpace) && (action.meta.field === field);
