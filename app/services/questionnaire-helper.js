import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class ShoppingCartService extends Service {
  @tracked questionnaireId = null;
  @tracked currentQuestionIndex = null;
  @tracked questions = null;
  @tracked numberOfQuestions = null;

  startAndReceiveFirstQuestionId(questionnaire) {
    const questions = questionnaire.get('questions').toArray();
    const firstQuestionId = questions[0].identifier;

    this.questionnaireId = questionnaire.id;
    this.questions = questions;
    this.currentQuestionIndex = 0;
    this.numberOfQuestions = questions.length;

    return firstQuestionId;
  }
  getCurrentQuestionIndex(question) {
    const currentQuestionIndex = this.questions.indexOf(question);
    this.currentQuestionIndex = currentQuestionIndex;
    return currentQuestionIndex;
  }
  getNextQuestionId() {
    if (this.currentQuestionIndex === this.numberOfQuestions - 1) {
      return;
    }

    this.currentQuestionIndex = this.currentQuestionIndex + 1;

    return this.questions[this.currentQuestionIndex].identifier;
  }
  getPreviousQuestionId() {
    if (!this.currentQuestionIndex > 0) {
      return;
    }

    this.currentQuestionIndex = this.currentQuestionIndex - 1;

    return this.questions[this.currentQuestionIndex].identifier;
  }
  getLastQuestionId() {
    return this.questions[this.numberOfQuestions - 1].identifier;
  }
  getQuestionnaireId() {
    return this.questionnaireId;
  }
}