import Route from '@ember/routing/route';
import { isEmpty } from '@ember/utils';

export default class FinishRoute extends Route {
  beforeModel() {
    const questionnaire = this.modelFor('questionnaire');

    if (isEmpty(questionnaire)) {
      this.transitionTo('questionnaires');
    }
  }
}
