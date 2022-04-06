import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { isEmpty } from '@ember/utils';

export default class QuestionRoute extends Route {
  @service questionnaireHelper;

  beforeModel() {
    const questionnaire = this.modelFor('questionnaire');

    if (isEmpty(questionnaire)) {
      this.transitionTo('questionnaires');
    }
  }

  model(params) {
    const questionnaire = this.modelFor('questionnaire');
    const question = questionnaire.questions.findBy('identifier', params.id);

    if (!question) {
      this.transitionTo('questionnaires');
    }

    return question;
  }

  setupController(controller, model) {
    super.setupController(...arguments);
    let answer = null;

    controller.set(
      'isNotFirstQuestion',
      this.questionnaireHelper.getCurrentQuestionIndex(model) !== 0
    );

    if (model.question_type === 'multiple-choice') {
      const choices = model.choices;
      const asnweredChoice = choices.findBy('selected', true);
      answer = asnweredChoice ? asnweredChoice.value : null;
    }

    controller.set('answer', answer);
    controller.set('error', null);
    controller.set(
      'isMultipleChoiceQuestionType',
      model.question_type === 'multiple-choice' ? true : false
    );
    controller.set(
      'isTextQuestionType',
      model.question_type === 'text' ? true : false
    );
  }
}
