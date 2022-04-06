import Route from '@ember/routing/route';

export default class QuestionnairesRoute extends Route {
  model() {
    return this.store.findAll('questionnaire');
  }
}
