import ApplicationSerializer from './application';

export default class QuestionnaireSerializer extends ApplicationSerializer {
  normalizeFindAllResponse(store, primaryModelClass, payload, id, requestType) {
    payload.data = payload.questionnaires.map((questionnaire) => {
      return {
        id: questionnaire.id,
        attributes: {
          name: questionnaire.name,
          description: questionnaire.description,
          questions: questionnaire.questions,
        },
        type: 'questionnaires',
      };
    });

    delete payload.questionnaires;

    return super.normalizeFindAllResponse(
      store,
      primaryModelClass,
      payload,
      id,
      requestType
    );
  }
}
