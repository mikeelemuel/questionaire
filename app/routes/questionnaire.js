import Route from '@ember/routing/route';

export default class QuestionnaireRoute extends Route {
  model(params) {
    const questionnaire = this.store.peekRecord(
      'questionnaire',
      params.questionnaire_id
    );

    if (!questionnaire) {
      this.transitionTo('questionnaires');
    }

    return questionnaire;
  }
}
