import Model, { attr } from '@ember-data/model';

export default class QuestionnaireModel extends Model {
  @attr name;
  @attr description;
  @attr questions;

  get numberOfQuestions() {
    return this.questions.length;
  }
}
