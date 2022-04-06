import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class QuestionnaireController extends Controller {
  @service questionnaireHelper;
  @service router;

  @action
  startQuestionnaire(questionnaire) {
    const firstQuestionId =
      this.questionnaireHelper.startAndReceiveFirstQuestionId(questionnaire);

    if (firstQuestionId) {
      this.router.transitionTo('question', firstQuestionId);
    }
  }

  @action
  backToQuestionnaires() {
    this.router.transitionTo('questionnaires');
  }
}
