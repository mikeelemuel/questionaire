import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class FinishController extends Controller {
  @service questionnaireHelper;
  @service router;

  @action
  previousQuestion() {
    const lastQuestionId = this.questionnaireHelper.getLastQuestionId();

    if (lastQuestionId) {
      this.router.transitionToRoute('question', lastQuestionId);
    }
  }
}
